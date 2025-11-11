# coding=utf-8
"""
实时语音合成测试脚本 - 使用 pyaudio 本地播放
注意: 这个脚本仅用于本地测试,不适用于 Web 服务器部署
"""

import pyaudio
import dashscope
from dashscope.audio.tts_v2 import *
import os


class RealtimeTTSCallback(ResultCallback):
    """实时语音合成回调类 - 边合成边播放"""
    
    _player = None
    _stream = None

    def on_open(self):
        """WebSocket 连接打开时初始化音频播放器"""
        print("🔊 WebSocket 连接已建立,开始语音合成...")
        self._player = pyaudio.PyAudio()
        # 配置音频流: 16位PCM, 单声道, 22050Hz采样率
        self._stream = self._player.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=22050,
            output=True
        )

    def on_complete(self):
        """语音合成完成"""
        print("✅ 语音合成任务成功完成!")

    def on_error(self, message: str):
        """处理错误"""
        print(f"❌ 语音合成失败: {message}")

    def on_close(self):
        """关闭连接时清理资源"""
        print("🔌 WebSocket 连接已关闭")
        if self._stream:
            self._stream.stop_stream()
            self._stream.close()
        if self._player:
            self._player.terminate()

    def on_event(self, message):
        """接收事件消息"""
        print(f"📩 收到事件: {message}")

    def on_data(self, data: bytes) -> None:
        """
        接收音频数据并实时播放
        这是核心方法 - 每次收到音频数据块就立即播放
        """
        print(f"🎵 收到音频数据: {len(data)} 字节")
        self._stream.write(data)


def synthesize_text_realtime(text):
    """
    实时合成并播放文本语音
    
    Args:
        text: 要合成的文本内容
    """
    print(f"\n{'='*50}")
    print(f"📝 准备合成文本: {text}")
    print(f"{'='*50}\n")
    
    # 初始化回调
    callback = RealtimeTTSCallback()
    
    # 创建语音合成器
    synthesizer = SpeechSynthesizer(
        model="cosyvoice-v2",          # 使用 CosyVoice v2 模型
        voice="longxiaochun_v2",        # 女声音色
        format=AudioFormat.PCM_22050HZ_MONO_16BIT,  # 音频格式
        callback=callback,
    )
    
    try:
        # 开始流式合成
        synthesizer.streaming_call(text)
        
        # 标记合成完成
        synthesizer.streaming_complete()
        
        print(f"\n📊 请求ID: {synthesizer.get_last_request_id()}")
        
    except Exception as e:
        print(f"\n❌ 合成过程出错: {e}")
        import traceback
        traceback.print_exc()


def synthesize_with_llm_realtime():
    """
    结合大语言模型的实时语音合成
    从 LLM 获取流式文本输出,同时流式合成语音
    """
    from http import HTTPStatus
    from dashscope import Generation
    
    print(f"\n{'='*50}")
    print(f"🤖 启动 LLM + 实时语音合成")
    print(f"{'='*50}\n")
    
    callback = RealtimeTTSCallback()
    synthesizer = SpeechSynthesizer(
        model="cosyvoice-v2",
        voice="longxiaochun_v2",
        format=AudioFormat.PCM_22050HZ_MONO_16BIT,
        callback=callback,
    )

    # 向 LLM 提问
    messages = [{"role": "user", "content": "请用三句话简单介绍一下你自己"}]
    
    print("💭 正在向 LLM 提问并合成语音...\n")
    
    responses = Generation.call(
        model="qwen-turbo",
        messages=messages,
        result_format="message",
        stream=True,              # 启用流式输出
        incremental_output=True,  # 启用增量输出
    )
    
    # 处理 LLM 的流式响应
    for response in responses:
        if response.status_code == HTTPStatus.OK:
            text_chunk = response.output.choices[0]["message"]["content"]
            print(text_chunk, end="", flush=True)
            # 将文本块实时送入语音合成器
            synthesizer.streaming_call(text_chunk)
        else:
            print(
                f"\n❌ LLM 请求失败:\n"
                f"  Request ID: {response.request_id}\n"
                f"  Status: {response.status_code}\n"
                f"  Error Code: {response.code}\n"
                f"  Error Message: {response.message}"
            )
            
    # 完成合成
    synthesizer.streaming_complete()
    print(f"\n\n📊 语音合成请求ID: {synthesizer.get_last_request_id()}")


def main():
    """主函数 - 提供测试菜单"""
    
    # 检查 API Key
    if not os.getenv("DASHSCOPE_API_KEY"):
        print("⚠️  警告: 未设置 DASHSCOPE_API_KEY 环境变量")
        print("请先设置: export DASHSCOPE_API_KEY='your_api_key'")
        return
    
    print("\n" + "="*60)
    print("🎙️  实时语音合成测试程序")
    print("="*60)
    print("\n请选择测试模式:")
    print("1. 直接合成文本")
    print("2. LLM + 实时语音合成")
    print("0. 退出")
    
    choice = input("\n请输入选项 (0-2): ").strip()
    
    if choice == "1":
        # 测试文本
        test_text = "你好,我是智能语音助手。今天天气真不错,适合出门散步。希望你有美好的一天!"
        synthesize_text_realtime(test_text)
        
    elif choice == "2":
        synthesize_with_llm_realtime()
        
    elif choice == "0":
        print("👋 再见!")
        
    else:
        print("❌ 无效选项,请重新运行程序")


if __name__ == "__main__":
    # 注意: 运行前需要安装 pyaudio
    # Windows: pip install pyaudio
    # Mac: brew install portaudio && pip install pyaudio
    # Linux: sudo apt-get install python3-pyaudio
    
    main()
