# Vercel 部署兼容性修复说明

## 问题：`proxies` 参数错误

### 错误信息
```
Client.__init__() got an unexpected keyword argument 'proxies'
```

### 原因
- `openai==1.54.3` 和 `dashscope==1.20.9` 之间存在兼容性问题
- 新版本的 OpenAI SDK 移除了 `proxies` 参数
- DashScope 内部可能仍在使用旧的调用方式

### 解决方案
已将依赖版本回退到稳定组合：
```
openai==1.12.0
dashscope==1.17.0
```

## 部署步骤

### 1. 重新部署到 Vercel

```powershell
# 提交更改
git add requirements.txt
git commit -m "Fix openai and dashscope version compatibility"
git push origin main

# 重新部署
vercel --prod
```

### 2. 如果仍有问题，清除 Vercel 缓存

在 Vercel 控制台：
1. 进入项目设置
2. 找到 "Build & Development Settings"
3. 清除构建缓存
4. 重新部署

或使用命令：
```powershell
vercel --prod --force
```

## 📋 完整的 requirements.txt

```
Flask==3.0.0
openai==1.12.0
dashscope==1.17.0
Werkzeug==3.0.1
```

## ✅ 验证

部署后测试以下功能：
1. ✅ 健康咨询对话
2. ✅ 友好聊天
3. ✅ 用户信息收集
4. ✅ 语音合成（如果配置了云存储）

## 🔍 调试

如果还有错误，查看 Vercel 日志：
```powershell
vercel logs <your-deployment-url> --follow
```

或在 Vercel 控制台查看 Function Logs。

## 注意事项

- ✅ 确保 `DASHSCOPE_API_KEY` 环境变量已在 Vercel 中设置
- ✅ 使用稳定版本的依赖包
- ⚠️ 音频文件在 serverless 环境中不会持久化
