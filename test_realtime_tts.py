#!/usr/bin/env python
# coding=utf-8
"""
测试脚本 - 验证实时 TTS 功能
运行此脚本以测试所有组件是否正常工作
"""

import os
import sys

def check_environment():
    """检查环境配置"""
    print("🔍 检查环境配置...")
    
    issues = []
    
    # 检查 API Key
    api_key = os.getenv("DASHSCOPE_API_KEY")
    if not api_key:
        issues.append("❌ 未设置 DASHSCOPE_API_KEY 环境变量")
    else:
        print(f"✅ API Key: {api_key[:8]}...")
    
    # 检查依赖
    try:
        import dashscope
        print(f"✅ dashscope 版本: {dashscope.__version__}")
    except ImportError:
        issues.append("❌ 未安装 dashscope")
    
    try:
        import flask
        print(f"✅ Flask 版本: {flask.__version__}")
    except ImportError:
        issues.append("❌ 未安装 Flask")
    
    # 检查文件
    required_files = [
        'realtime_tts_web.py',
        'realtime_tts_test.py',
        'demo_realtime_tts.py',
        'app.py'
    ]
    
    for file in required_files:
        if os.path.exists(file):
            print(f"✅ 文件存在: {file}")
        else:
            issues.append(f"❌ 文件缺失: {file}")
    
    return issues


def test_realtime_tts_web():
    """测试 Web TTS 模块"""
    print("\n📦 测试 realtime_tts_web 模块...")
    
    try:
        from realtime_tts_web import RealtimeTTSGenerator
        print("✅ 模块导入成功")
        
        # 创建生成器
        generator = RealtimeTTSGenerator()
        print("✅ 生成器创建成功")
        
        # 测试合成(收集音频块)
        test_text = "测试语音合成"
        audio_chunks = []
        
        def collect_chunk(data):
            audio_chunks.append(data)
        
        print(f"🎤 合成测试文本: '{test_text}'")
        request_id = generator.synthesize_stream(test_text, collect_chunk)
        
        if request_id and len(audio_chunks) > 0:
            print(f"✅ 合成成功! Request ID: {request_id}")
            print(f"✅ 生成了 {len(audio_chunks)} 个音频块")
            total_bytes = sum(len(chunk) for chunk in audio_chunks)
            print(f"✅ 总音频大小: {total_bytes} 字节")
            return True
        else:
            print("❌ 合成失败: 没有生成音频数据")
            return False
            
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_demo_app():
    """测试演示应用"""
    print("\n🌐 测试 demo_realtime_tts.py...")
    
    try:
        # 不实际运行服务器,只测试导入
        import demo_realtime_tts
        print("✅ 演示应用模块导入成功")
        return True
    except Exception as e:
        print(f"❌ 演示应用测试失败: {e}")
        return False


def test_pyaudio():
    """测试 pyaudio (可选)"""
    print("\n🔊 测试 pyaudio (本地播放)...")
    
    try:
        import pyaudio
        print(f"✅ pyaudio 已安装")
        
        # 测试初始化
        p = pyaudio.PyAudio()
        device_count = p.get_device_count()
        print(f"✅ 检测到 {device_count} 个音频设备")
        p.terminate()
        return True
        
    except ImportError:
        print("⚠️  pyaudio 未安装(仅用于本地测试,Web 应用不需要)")
        return None
    except Exception as e:
        print(f"⚠️  pyaudio 测试失败: {e}")
        return None


def print_summary(results):
    """打印测试总结"""
    print("\n" + "="*60)
    print("📊 测试总结")
    print("="*60)
    
    total = len(results)
    passed = sum(1 for r in results.values() if r is True)
    failed = sum(1 for r in results.values() if r is False)
    skipped = sum(1 for r in results.values() if r is None)
    
    for test_name, result in results.items():
        if result is True:
            print(f"✅ {test_name}: 通过")
        elif result is False:
            print(f"❌ {test_name}: 失败")
        else:
            print(f"⚠️  {test_name}: 跳过")
    
    print("-"*60)
    print(f"总计: {total} | 通过: {passed} | 失败: {failed} | 跳过: {skipped}")
    print("="*60)
    
    if failed == 0:
        print("\n🎉 所有测试通过! 你可以开始使用实时 TTS 了!")
        print("\n下一步:")
        print("  1. 运行演示: python demo_realtime_tts.py")
        print("  2. 集成到 app.py: 参考 QUICK_INTEGRATION.md")
        print("  3. 查看详细文档: REALTIME_TTS_GUIDE.md")
    else:
        print("\n⚠️  部分测试失败,请检查上述错误信息")
        print("💡 常见问题:")
        print("  - 未设置 API Key: export DASHSCOPE_API_KEY='your_key'")
        print("  - 依赖缺失: pip install -r requirements.txt")


def main():
    """主测试流程"""
    print("\n" + "="*60)
    print("🧪 实时 TTS 功能测试")
    print("="*60 + "\n")
    
    # 检查环境
    issues = check_environment()
    
    if issues:
        print("\n⚠️  发现以下问题:")
        for issue in issues:
            print(f"  {issue}")
        
        print("\n是否继续测试? (y/n): ", end="")
        choice = input().strip().lower()
        if choice != 'y':
            print("测试已取消")
            return
    
    # 运行测试
    results = {}
    
    # 测试 Web 模块
    results["Web TTS 模块"] = test_realtime_tts_web()
    
    # 测试演示应用
    results["演示应用"] = test_demo_app()
    
    # 测试 pyaudio (可选)
    results["PyAudio (可选)"] = test_pyaudio()
    
    # 打印总结
    print_summary(results)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  测试已中断")
    except Exception as e:
        print(f"\n❌ 测试过程出错: {e}")
        import traceback
        traceback.print_exc()
