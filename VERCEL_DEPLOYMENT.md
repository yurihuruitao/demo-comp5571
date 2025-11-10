# 部署到Vercel指南

## 📋 部署前准备

### 1. 安装Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录Vercel
```bash
vercel login
```

## 🚀 部署步骤

### 方式一：使用Vercel CLI部署

1. **在项目目录中运行：**
```bash
vercel
```

2. **设置环境变量：**
```bash
vercel env add DASHSCOPE_API_KEY
```
然后输入您的API密钥：`sk-dec3caaa6d6d4350963f5ceb97dce549`

3. **重新部署以应用环境变量：**
```bash
vercel --prod
```

### 方式二：通过Vercel网站部署

1. **推送代码到GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **在Vercel网站上导入项目**
   - 访问 https://vercel.com
   - 点击 "Add New" → "Project"
   - 导入您的GitHub仓库
   - 在设置中添加环境变量：
     - Name: `DASHSCOPE_API_KEY`
     - Value: `sk-dec3caaa6d6d4350963f5ceb97dce549`

3. **部署**
   - 点击 "Deploy"
   - 等待部署完成

## ⚠️ 重要提示

### 关于音频文件存储
Vercel的serverless函数是**无状态**的，这意味着：
- ❌ 生成的音频文件不会永久保存在服务器上
- ❌ `/static/audio/` 目录在每次函数调用后会被清空

### 解决方案
有两个选择：

**选项1：禁用TTS功能（推荐用于测试）**
暂时注释掉语音合成功能，只返回文本

**选项2：使用云存储（推荐用于生产环境）**
将音频文件保存到：
- AWS S3
- 阿里云OSS
- Cloudinary
- 或其他云存储服务

修改 `text_to_speech()` 函数，将文件上传到云存储并返回URL。

## 📁 项目结构
```
demo/
├── app.py              # Flask主应用
├── vercel.json         # Vercel配置文件
├── requirements.txt    # Python依赖
├── .vercelignore      # 部署时忽略的文件
├── static/            # 静态资源
│   ├── script.js
│   ├── style.css
│   └── audio/         # ⚠️ 在Vercel上不持久
└── templates/         # HTML模板
    └── index.html
```

## 🔧 故障排除

### 错误："This Serverless Function has crashed"
**原因：** 通常是因为：
1. 环境变量未设置
2. 依赖包版本不兼容
3. 代码中有语法错误

**解决：**
1. 检查Vercel环境变量是否正确设置
2. 查看Vercel部署日志：在项目页面 → "Deployments" → 点击失败的部署 → "View Function Logs"
3. 确保所有 `os.getenv()` 都有默认值

### 查看部署日志
```bash
vercel logs <deployment-url>
```

### 本地测试
在部署前，建议先本地测试：
```bash
python app.py
```
访问 http://127.0.0.1:5000

## 🌐 访问您的应用

部署成功后，Vercel会给您提供一个URL：
- 预览URL: `https://your-project-name-xxx.vercel.app`
- 生产URL: `https://your-project-name.vercel.app`

## 📝 后续优化建议

1. **使用环境变量保护API密钥**
   - 不要将API密钥硬编码在代码中
   - 使用Vercel的环境变量功能

2. **添加错误处理**
   - 为所有API调用添加try-catch
   - 返回用户友好的错误消息

3. **性能优化**
   - 使用CDN加速静态资源
   - 缓存API响应（如果适用）

4. **监控和日志**
   - 使用Vercel Analytics
   - 设置错误通知
