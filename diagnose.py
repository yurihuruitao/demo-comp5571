#!/usr/bin/env python3
"""
Vercel 部署诊断脚本
运行此脚本检查本地环境是否能正常导入和运行
"""
import sys
import os

print("=" * 60)
print("Vercel 部署诊断")
print("=" * 60)

# 1. 检查 Python 版本
print(f"\n1. Python 版本: {sys.version}")

# 2. 检查依赖包
print("\n2. 检查依赖包:")
try:
    import flask
    print(f"   ✓ Flask: {flask.__version__}")
except ImportError as e:
    print(f"   ✗ Flask: {e}")

try:
    import openai
    print(f"   ✓ OpenAI: {openai.__version__}")
except ImportError as e:
    print(f"   ✗ OpenAI: {e}")

try:
    import dashscope
    print(f"   ✓ DashScope: 已安装")
except ImportError as e:
    print(f"   ✗ DashScope: {e}")

# 3. 检查环境变量
print("\n3. 环境变量:")
api_key = os.getenv("DASHSCOPE_API_KEY")
if api_key:
    print(f"   ✓ DASHSCOPE_API_KEY: 已设置 ({api_key[:10]}...)")
else:
    print(f"   ✗ DASHSCOPE_API_KEY: 未设置")

# 4. 尝试导入 app
print("\n4. 尝试导入应用:")
try:
    # 模拟 api/index.py 的导入路径
    current_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, current_dir)
    
    from app import app
    print(f"   ✓ 成功导入 Flask app")
    print(f"   ✓ App 名称: {app.name}")
    
    # 5. 检查路由
    print("\n5. 已注册的路由:")
    for rule in app.url_map.iter_rules():
        print(f"   - {rule.endpoint}: {rule.rule} [{', '.join(rule.methods - {'HEAD', 'OPTIONS'})}]")
    
except Exception as e:
    print(f"   ✗ 导入失败: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# 6. 测试基本功能
print("\n6. 测试基本功能:")
try:
    with app.test_client() as client:
        response = client.get('/')
        if response.status_code == 200:
            print(f"   ✓ 主页路由工作正常 (HTTP {response.status_code})")
        else:
            print(f"   ⚠ 主页返回: HTTP {response.status_code}")
except Exception as e:
    print(f"   ✗ 测试失败: {e}")

print("\n" + "=" * 60)
print("诊断完成!")
print("=" * 60)
print("\n如果所有检查都通过，应用应该可以在 Vercel 上运行。")
print("如果有失败项，请先在本地修复这些问题。")
