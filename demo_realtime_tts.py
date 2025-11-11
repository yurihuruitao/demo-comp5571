# coding=utf-8
"""
快速演示: 将实时 TTS 集成到现有 app.py 的最简单方式
只需要几行代码即可升级到实时语音播放!
"""

from flask import Flask, render_template, request, jsonify
from realtime_tts_web import RealtimeTTSGenerator
import base64
import os

app = Flask(__name__)

# 初始化实时 TTS 生成器
tts_generator = RealtimeTTSGenerator(
    model="cosyvoice-v2",
    voice="longxiaochun_v2"
)

# 设置 API Key
os.environ["DASHSCOPE_API_KEY"] = "your_api_key_here"


@app.route("/")
def index():
    """首页"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>实时语音合成演示</title>
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            h1 {
                color: #667eea;
                text-align: center;
                margin-bottom: 30px;
            }
            textarea {
                width: 100%;
                height: 120px;
                padding: 15px;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                font-size: 16px;
                resize: vertical;
                margin-bottom: 20px;
            }
            button {
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 18px;
                cursor: pointer;
                transition: transform 0.2s;
            }
            button:hover {
                transform: translateY(-2px);
            }
            button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            #status {
                margin-top: 20px;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                display: none;
            }
            .status-playing {
                background: #e3f2fd;
                color: #1976d2;
                border: 2px solid #1976d2;
            }
            .status-error {
                background: #ffebee;
                color: #c62828;
                border: 2px solid #c62828;
            }
            .wave {
                display: inline-block;
                width: 8px;
                height: 20px;
                background: #1976d2;
                margin: 0 2px;
                animation: wave 1s ease-in-out infinite;
            }
            .wave:nth-child(2) { animation-delay: 0.1s; }
            .wave:nth-child(3) { animation-delay: 0.2s; }
            .wave:nth-child(4) { animation-delay: 0.3s; }
            @keyframes wave {
                0%, 100% { height: 20px; }
                50% { height: 40px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎙️ 实时语音合成演示</h1>
            <textarea id="text" placeholder="请输入要合成的文本...&#10;例如: 你好,我是智能语音助手。今天天气真不错!">你好,我是智能语音助手。欢迎使用实时语音合成功能!</textarea>
            <button id="playBtn" onclick="playRealtime()">🔊 开始播放</button>
            <div id="status"></div>
        </div>

        <script>
            let audioContext = null;
            let isPlaying = false;

            async function playRealtime() {
                const text = document.getElementById('text').value.trim();
                const btn = document.getElementById('playBtn');
                const status = document.getElementById('status');

                if (!text) {
                    alert('请输入文本');
                    return;
                }

                if (isPlaying) {
                    return;
                }

                // 初始化 AudioContext
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }

                isPlaying = true;
                btn.disabled = true;
                btn.textContent = '⏳ 合成中...';
                status.className = 'status-playing';
                status.style.display = 'block';
                status.innerHTML = `
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    正在合成和播放语音...
                `;

                try {
                    // 请求服务器合成语音
                    const response = await fetch('/synthesize_realtime', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: text })
                    });

                    const data = await response.json();

                    if (data.error) {
                        throw new Error(data.error);
                    }

                    // 播放音频块
                    console.log(`收到 ${data.audio_chunks.length} 个音频块`);
                    status.innerHTML = `🎵 正在播放... (${data.audio_chunks.length} 个音频块)`;

                    await playAudioChunks(data.audio_chunks);

                    status.className = 'status-playing';
                    status.innerHTML = '✅ 播放完成!';
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 2000);

                } catch (error) {
                    console.error('播放失败:', error);
                    status.className = 'status-error';
                    status.innerHTML = `❌ 播放失败: ${error.message}`;
                } finally {
                    isPlaying = false;
                    btn.disabled = false;
                    btn.textContent = '🔊 开始播放';
                }
            }

            async function playAudioChunks(base64Chunks) {
                // 合并所有音频块
                let allBytes = [];

                for (const b64Chunk of base64Chunks) {
                    // Base64 解码
                    const binaryString = atob(b64Chunk);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    allBytes.push(...bytes);
                }

                // 转换为 AudioBuffer
                const combinedBuffer = new Uint8Array(allBytes).buffer;
                
                try {
                    const audioBuffer = await audioContext.decodeAudioData(combinedBuffer);
                    
                    // 播放
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    
                    return new Promise((resolve) => {
                        source.onended = resolve;
                        source.start();
                    });
                } catch (e) {
                    console.error('音频解码失败:', e);
                    throw new Error('音频格式不支持');
                }
            }
        </script>
    </body>
    </html>
    """


@app.route("/synthesize_realtime", methods=["POST"])
def synthesize_realtime():
    """
    实时语音合成端点
    接收文本,返回 Base64 编码的音频块数组
    """
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "文本为空"}), 400

        print(f"📝 收到合成请求: {text[:50]}...")

        # 收集音频块
        audio_chunks = []

        def collect_chunk(audio_data: bytes):
            """收集每个音频块并转换为 Base64"""
            b64_data = base64.b64encode(audio_data).decode('utf-8')
            audio_chunks.append(b64_data)
            print(f"  📦 音频块 {len(audio_chunks)}: {len(audio_data)} 字节")

        # 使用实时 TTS 生成器合成语音
        request_id = tts_generator.synthesize_stream(text, collect_chunk)

        print(f"✅ 合成完成! 总计 {len(audio_chunks)} 个音频块")
        print(f"📊 请求ID: {request_id}")

        return jsonify({
            "audio_chunks": audio_chunks,
            "request_id": request_id,
            "chunk_count": len(audio_chunks)
        })

    except Exception as e:
        print(f"❌ 合成失败: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("\n" + "="*60)
    print("🎙️  实时语音合成演示服务器")
    print("="*60)
    print("📍 访问: http://127.0.0.1:5000")
    print("🔑 请确保设置了 DASHSCOPE_API_KEY 环境变量")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000)
