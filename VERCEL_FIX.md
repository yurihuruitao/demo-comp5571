# Vercel部署修复指南

## 问题原因
之前的部署失败是因为Vercel的serverless函数需要特定的目录结构和入口点。

## ✅ 已修复的问题

### 1. 创建了正确的API目录结构
```
demo/
├── api/
│   ├── __init__.py
│   └── index.py  ← Vercel入口点
├── app.py        ← 主应用
├── static/
├── templates/
└── vercel.json
```

### 2. 更新了 vercel.json
现在正确指向 `api/index.py` 作为构建源。

### 3. 修复了模块导入
`api/index.py` 现在可以正确导入父目录的 `app.py`。

## 📋 部署步骤

### 方法一：使用Vercel CLI（推荐）

1. **确保已安装Vercel CLI**
```powershell
npm install -g vercel
```

2. **在项目目录运行部署命令**
```powershell
cd d:\study\研一上\comp5571\demo
vercel
```

3. **设置环境变量**
```powershell
vercel env add DASHSCOPE_API_KEY
```
然后输入您的API密钥。

4. **重新部署**
```powershell
vercel --prod
```

### 方法二：通过Vercel网站部署

1. 访问 https://vercel.com
2. 点击 "Import Project"
3. 选择您的GitHub仓库
4. **重要**：在部署前，添加环境变量：
   - 变量名：`DASHSCOPE_API_KEY`
   - 值：您的DashScope API密钥
5. 点击 "Deploy"

## 🔍 验证部署

部署成功后，访问您的Vercel URL，应该能看到应用正常运行。

### 检查日志
如果仍有问题，查看Vercel控制台的Function Logs：
```
vercel logs <your-deployment-url>
```

## ⚠️ 重要提示

### 音频文件限制
Vercel的serverless函数是**无状态**的，这意味着：
- ✅ 文本建议和聊天功能正常工作
- ❌ 音频文件不会永久保存（每次函数调用后都会被清除）

### 解决方案
如需音频功能，需要使用云存储：
1. **阿里云OSS**（推荐，因为已使用DashScope）
2. **AWS S3**
3. **Cloudinary**

修改 `app.py` 中的 `text_to_speech()` 函数，将音频上传到云存储并返回URL。

## 🐛 常见问题

### 问题1：Still showing "Serverless Function has crashed"
**解决**：
1. 确保 `api/index.py` 和 `api/__init__.py` 都已创建
2. 检查 `vercel.json` 是否正确更新
3. 重新部署：`vercel --prod --force`

### 问题2：环境变量未生效
**解决**：
```powershell
# 查看当前环境变量
vercel env ls

# 如果没有，添加它
vercel env add DASHSCOPE_API_KEY
```

### 问题3：找不到模块
**解决**：确保 `requirements.txt` 包含所有依赖：
```
Flask==3.0.0
openai==1.54.3
dashscope==1.20.9
Werkzeug==3.0.1
```

## 📝 文件清单

部署前确保有以下文件：
- ✅ `api/index.py` - Vercel入口点
- ✅ `api/__init__.py` - Python包初始化
- ✅ `app.py` - Flask应用主文件
- ✅ `vercel.json` - Vercel配置
- ✅ `requirements.txt` - Python依赖
- ✅ `.vercelignore` - 忽略文件配置

## 🚀 现在可以部署了！

运行以下命令：
```powershell
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
vercel --prod
```

祝部署顺利！🎉
