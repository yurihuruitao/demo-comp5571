import sys
import os

# 将父目录添加到路径中，以便可以导入app模块
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import app

# Vercel需要的入口点
# 这个文件将Flask应用导出为Vercel可以识别的格式
app = app
