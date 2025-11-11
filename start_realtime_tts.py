#!/usr/bin/env python
# coding=utf-8
"""
🎙️ 实时 TTS 快速启动器
自动检测环境并提供菜单选择
"""

import os
import sys
import subprocess


def print_banner():
    """打印欢迎横幅"""
    print("\n" + "="*60)
    print("🎙️  实时语音合成 (Realtime TTS)")
    print("="*60)
    print()


def check_api_key():
    """检查 API Key"""
    api_key = os.getenv("DASHSCOPE_API_KEY")
    if not api_key:
        print("⚠️  警告: 未设置 DASHSCOPE_API_KEY 环境变量")
        print()
        print("请先设置 API Key:")
        print("  Windows PowerShell:")
        print('    $env:DASHSCOPE_API_KEY="sk-your-api-key"')
        print("  Linux/Mac:")
        print('    export DASHSCOPE_API_KEY="sk-your-api-key"')
        print()
        return False
    else:
        print(f"✅ API Key: {api_key[:8]}...")
        return True


def check_dependencies():
    """检查依赖"""
    print("\n📦 检查依赖...")
    
    required = ['flask', 'dashscope', 'openai']
    missing = []
    
    for pkg in required:
        try:
            __import__(pkg)
            print(f"  ✅ {pkg}")
        except ImportError:
            print(f"  ❌ {pkg} (缺失)")
            missing.append(pkg)
    
    if missing:
        print(f"\n⚠️  缺少依赖: {', '.join(missing)}")
        print("安装命令: pip install -r requirements.txt")
        return False
    
    return True


def show_menu():
    """显示主菜单"""
    print("\n" + "─"*60)
    print("📋 请选择操作:")
    print("─"*60)
    print()
    print("  1️⃣  运行演示应用 (推荐首次使用)")
    print("     → 完整的 Web UI,立即体验效果")
    print()
    print("  2️⃣  运行环境测试")
    print("     → 验证配置是否正确")
    print()
    print("  3️⃣  本地播放测试 (需要 pyaudio)")
    print("     → 直接在本地扬声器播放")
    print()
    print("  4️⃣  查看集成指南")
    print("     → 如何集成到你的项目")
    print()
    print("  5️⃣  查看文档列表")
    print("     → 所有可用文档")
    print()
    print("  0️⃣  退出")
    print()
    print("─"*60)


def run_demo():
    """运行演示应用"""
    print("\n🚀 启动演示应用...")
    print("💡 提示: 按 Ctrl+C 停止服务器")
    print()
    
    try:
        subprocess.run([sys.executable, "demo_realtime_tts.py"])
    except KeyboardInterrupt:
        print("\n\n✅ 演示应用已停止")


def run_test():
    """运行测试"""
    print("\n🧪 运行环境测试...")
    print()
    
    try:
        subprocess.run([sys.executable, "test_realtime_tts.py"])
    except Exception as e:
        print(f"\n❌ 测试失败: {e}")


def run_local_test():
    """运行本地播放测试"""
    print("\n🔊 启动本地播放测试...")
    print()
    
    # 检查 pyaudio
    try:
        import pyaudio
        print("✅ pyaudio 已安装")
    except ImportError:
        print("❌ 未安装 pyaudio")
        print()
        print("安装说明:")
        print("  Windows:  pip install pyaudio")
        print("  Mac:      brew install portaudio && pip install pyaudio")
        print("  Linux:    sudo apt-get install python3-pyaudio")
        print()
        input("按回车键返回...")
        return
    
    try:
        subprocess.run([sys.executable, "realtime_tts_test.py"])
    except Exception as e:
        print(f"\n❌ 测试失败: {e}")


def show_integration_guide():
    """显示集成指南摘要"""
    print("\n" + "="*60)
    print("🔧 快速集成指南")
    print("="*60)
    print()
    print("📖 完整文档: QUICK_INTEGRATION.md")
    print()
    print("三步集成到 app.py:")
    print()
    print("1️⃣  导入模块")
    print("   from realtime_tts_web import RealtimeTTSGenerator")
    print("   realtime_tts = RealtimeTTSGenerator()")
    print()
    print("2️⃣  修改 TTS 函数")
    print("   def text_to_speech_realtime(text):")
    print("       # 收集音频块并返回 Base64 数组")
    print()
    print("3️⃣  更新 API 端点")
    print("   return jsonify({")
    print('       "audio_chunks": audio_chunks')
    print("   })")
    print()
    print("📄 详见: QUICK_INTEGRATION.md")
    print()
    input("按回车键返回...")


def show_docs():
    """显示文档列表"""
    print("\n" + "="*60)
    print("📚 文档列表")
    print("="*60)
    print()
    
    docs = [
        ("REALTIME_TTS_README.md", "总览和导航", "⭐ 推荐首次阅读"),
        ("QUICK_REFERENCE.md", "速查手册", "快速查询API和代码"),
        ("QUICK_INTEGRATION.md", "集成指南", "三步集成到项目"),
        ("REALTIME_TTS_GUIDE.md", "详细文档", "深入理解和最佳实践"),
        ("REALTIME_TTS_SUMMARY.md", "技术总结", "架构和实现细节"),
    ]
    
    for i, (filename, title, desc) in enumerate(docs, 1):
        print(f"{i}. {filename}")
        print(f"   📝 {title}")
        print(f"   💡 {desc}")
        print()
    
    print("─"*60)
    print("💻 使用编辑器或浏览器打开这些文件查看")
    print()
    input("按回车键返回...")


def main():
    """主函数"""
    print_banner()
    
    # 检查环境
    has_api_key = check_api_key()
    has_deps = check_dependencies()
    
    if not has_api_key:
        print("\n⚠️  请先设置 API Key 后再运行")
        input("\n按回车键退出...")
        return
    
    if not has_deps:
        print("\n⚠️  请先安装依赖: pip install -r requirements.txt")
        choice = input("\n是否继续? (y/n): ").strip().lower()
        if choice != 'y':
            return
    
    # 主循环
    while True:
        show_menu()
        
        try:
            choice = input("请输入选项 (0-5): ").strip()
            
            if choice == "1":
                run_demo()
            elif choice == "2":
                run_test()
            elif choice == "3":
                run_local_test()
            elif choice == "4":
                show_integration_guide()
            elif choice == "5":
                show_docs()
            elif choice == "0":
                print("\n👋 再见!")
                break
            else:
                print("\n❌ 无效选项,请重新输入")
                input("按回车键继续...")
        
        except KeyboardInterrupt:
            print("\n\n👋 再见!")
            break
        except Exception as e:
            print(f"\n❌ 错误: {e}")
            input("按回车键继续...")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ 程序出错: {e}")
        import traceback
        traceback.print_exc()
        input("\n按回车键退出...")
