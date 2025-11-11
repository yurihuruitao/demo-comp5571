# coding=utf-8
"""
Web 实时语音合成模块 - 使用 WebSocket 流式传输音频到浏览器
适用于 Flask Web 应用
"""

import dashscope
from dashscope.audio.tts_v2 import *
import os
import base64
from typing import Callable


class WebRealtimeTTSCallback(ResultCallback):
    """
    Web 实时语音合成回调类
    将音频数据通过回调函数传递给 WebSocket 或其他传输层
    """
    
    def __init__(self, on_audio_chunk: Callable[[bytes], None]):
        """
        初始化回调
        
        Args:
            on_audio_chunk: 接收音频数据块的回调函数
        """
        super().__init__()
        self.on_audio_chunk = on_audio_chunk
        self.total_bytes = 0

    def on_open(self):
        """WebSocket 连接打开"""
        print("🔊 [TTS] WebSocket 连接已建立")

    def on_complete(self):
        """语音合成完成"""
        print(f"✅ [TTS] 合成完成,总计 {self.total_bytes} 字节")

    def on_error(self, message: str):
        """处理错误"""
        print(f"❌ [TTS] 合成失败: {message}")

    def on_close(self):
        """关闭连接"""
        print("🔌 [TTS] WebSocket 连接已关闭")

    def on_event(self, message):
        """接收事件消息"""
        print(f"📩 [TTS] 事件: {message}")

    def on_data(self, data: bytes) -> None:
        """
        接收音频数据并通过回调传递
        """
        self.total_bytes += len(data)
        print(f"🎵 [TTS] 音频块: {len(data)} 字节 (累计: {self.total_bytes})")
        # 调用传入的回调函数处理音频数据
        if self.on_audio_chunk:
            self.on_audio_chunk(data)


class RealtimeTTSGenerator:
    """实时语音合成生成器 - 用于 Web 应用"""
    
    def __init__(self, model="cosyvoice-v2", voice="longxiaochun_v2"):
        """
        初始化生成器
        
        Args:
            model: TTS 模型名称
            voice: 音色名称
        """
        self.model = model
        self.voice = voice
        
    def synthesize_stream(self, text: str, on_audio_chunk: Callable[[bytes], None]):
        """
        流式合成语音并通过回调返回音频块
        
        Args:
            text: 要合成的文本
            on_audio_chunk: 接收音频块的回调函数 callback(audio_bytes)
            
        Returns:
            请求ID
        """
        print(f"📝 [TTS] 开始合成: {text[:50]}...")
        
        # 创建回调
        callback = WebRealtimeTTSCallback(on_audio_chunk)
        
        # 创建合成器
        synthesizer = SpeechSynthesizer(
            model=self.model,
            voice=self.voice,
            format=AudioFormat.PCM_22050HZ_MONO_16BIT,
            callback=callback,
        )
        
        try:
            # 流式合成
            synthesizer.streaming_call(text)
            synthesizer.streaming_complete()
            
            request_id = synthesizer.get_last_request_id()
            print(f"📊 [TTS] 请求ID: {request_id}")
            return request_id
            
        except Exception as e:
            print(f"❌ [TTS] 合成出错: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def synthesize_to_base64_chunks(self, text: str):
        """
        合成语音并生成 Base64 编码的音频块(用于 JSON 传输)
        
        Args:
            text: 要合成的文本
            
        Yields:
            Base64 编码的音频数据字符串
        """
        audio_chunks = []
        
        def collect_chunk(data: bytes):
            # 转换为 Base64 并存储
            b64_data = base64.b64encode(data).decode('utf-8')
            audio_chunks.append(b64_data)
        
        # 执行合成
        self.synthesize_stream(text, collect_chunk)
        
        # 返回所有音频块
        for chunk in audio_chunks:
            yield chunk


# ========== Flask 集成示例 ==========

def integrate_with_flask_socketio(app, socketio):
    """
    将实时 TTS 集成到 Flask-SocketIO 应用中
    
    Args:
        app: Flask 应用实例
        socketio: Flask-SocketIO 实例
        
    使用方法:
        from flask import Flask
        from flask_socketio import SocketIO
        
        app = Flask(__name__)
        socketio = SocketIO(app)
        integrate_with_flask_socketio(app, socketio)
    """
    
    generator = RealtimeTTSGenerator()
    
    @socketio.on('synthesize_speech')
    def handle_synthesize(data):
        """处理语音合成请求"""
        text = data.get('text', '')
        
        if not text:
            socketio.emit('tts_error', {'error': '文本为空'})
            return
        
        print(f"🎤 收到合成请求: {text[:50]}...")
        
        # 通知客户端开始合成
        socketio.emit('tts_start', {'text': text})
        
        def send_audio_chunk(audio_data: bytes):
            """将音频块发送到客户端"""
            # 转换为 Base64
            b64_audio = base64.b64encode(audio_data).decode('utf-8')
            socketio.emit('tts_chunk', {'audio': b64_audio})
        
        try:
            # 执行流式合成
            request_id = generator.synthesize_stream(text, send_audio_chunk)
            
            # 通知客户端完成
            socketio.emit('tts_complete', {'request_id': request_id})
            
        except Exception as e:
            print(f"❌ 合成失败: {e}")
            socketio.emit('tts_error', {'error': str(e)})


# ========== 简单的 HTTP 端点集成 ==========

def create_realtime_tts_endpoint(app):
    """
    为 Flask 应用创建实时 TTS 端点(使用 Server-Sent Events)
    
    Args:
        app: Flask 应用实例
    """
    from flask import Response, request, stream_with_context, jsonify
    import json
    
    generator = RealtimeTTSGenerator()
    
    @app.route('/api/tts/stream', methods=['POST'])
    def stream_tts():
        """
        流式 TTS 端点
        
        请求体:
            {"text": "要合成的文本"}
            
        返回:
            Server-Sent Events 流,包含 Base64 编码的音频块
        """
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': '文本为空'}), 400
        
        def generate():
            """生成 SSE 事件流"""
            # 发送开始事件
            yield f"event: start\ndata: {json.dumps({'text': text})}\n\n"
            
            try:
                # 合成并发送音频块
                for b64_chunk in generator.synthesize_to_base64_chunks(text):
                    yield f"event: chunk\ndata: {json.dumps({'audio': b64_chunk})}\n\n"
                
                # 发送完成事件
                yield f"event: complete\ndata: {json.dumps({'status': 'success'})}\n\n"
                
            except Exception as e:
                # 发送错误事件
                yield f"event: error\ndata: {json.dumps({'error': str(e)})}\n\n"
        
        return Response(
            stream_with_context(generate()),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'X-Accel-Buffering': 'no'
            }
        )


if __name__ == "__main__":
    # 测试模块
    print("📦 实时 TTS Web 模块已加载")
    print("💡 使用方法:")
    print("   from realtime_tts_web import RealtimeTTSGenerator")
    print("   generator = RealtimeTTSGenerator()")
    print("   generator.synthesize_stream('你好', callback_function)")
