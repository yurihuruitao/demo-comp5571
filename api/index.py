import sys
import os

# 将父目录添加到路径中，以便可以导入app模块
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

# 导入Flask应用
from app import app

# 确保环境变量可用
if not os.getenv("DASHSCOPE_API_KEY"):
    print("WARNING: DASHSCOPE_API_KEY not set in environment variables!")

# Vercel入口点 - 必须导出app对象
# 不要使用 app.run()，Vercel会自动处理
