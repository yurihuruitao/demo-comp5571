# 个人信息功能使用指南

## 功能概述

新增的个人信息功能可以让 AI 根据您的具体情况提供**更个性化、更精准**的健康建议和聊天回复。您的信息会被安全地保存在浏览器本地,不会上传到服务器存储。

## 使用方法

### 1. 打开个人信息界面

点击页面顶部的 **"👤 My Profile"** 按钮,即可打开个人信息录入表单。

### 2. 填写基本信息

表单包含以下字段(全部为选填):

#### 📝 基本信息
- **Name (姓名)**: 您的名字,例如: John Smith
- **Age (年龄)**: 您的年龄,例如: 65
- **Gender (性别)**: 可选 Male/Female/Prefer not to say

#### 🏥 健康信息
- **Existing Health Conditions (现有健康状况)**: 
  - 例如: Diabetes, High blood pressure, Arthritis
  - 糖尿病、高血压、关节炎等
  
- **Allergies (过敏史)**:
  - 例如: Penicillin, Peanuts, Pollen
  - 青霉素、花生、花粉等
  
- **Current Medications (正在服用的药物)**:
  - 例如: Metformin, Lisinopril
  - 二甲双胍、赖诺普利等

### 3. 保存信息

填写完成后:
- 点击 **"💾 Save Profile"** 保存您的信息
- 系统会显示 "✓ Profile saved successfully!"
- 信息会自动保存到浏览器本地存储(localStorage)
- 弹窗会在 2 秒后自动关闭

### 4. 清除信息

如需删除所有信息:
- 点击 **"🗑️ Clear All"** 按钮
- 确认删除操作
- 所有字段将被清空

## 信息如何被使用

### 在健康咨询中

当您向医生咨询健康问题时,AI 会考虑您的:
- 年龄和性别(提供适龄建议)
- 现有健康状况(避免冲突建议)
- 过敏史(避免推荐过敏食物/药物)
- 正在服用的药物(避免药物相互作用)

**示例**:
```
没有填写信息:
"您应该多休息,可以服用一些止痛药..."

填写了"对青霉素过敏":
"您应该多休息,注意避免使用含青霉素的药物,可以考虑对乙酰氨基酚类止痛药..."
```

### 在友好聊天中

聊天机器人会:
- 用您的名字称呼您(更亲切)
- 考虑您的年龄(提供适合的话题和建议)
- 了解您的健康状况(更贴心的关怀)

**示例**:
```
没有填写信息:
"Hello! How are you today?"

填写了姓名 John 和年龄 65:
"Hello John! How are you today? Hope you're having a wonderful day at 65!"
```

## 隐私与安全

### ✅ 安全保障

1. **本地存储**: 所有信息保存在您的浏览器本地(localStorage)
2. **不上传服务器**: 个人信息不会被永久存储在服务器数据库中
3. **仅用于对话**: 信息仅在发送消息时临时传递给 AI
4. **可随时删除**: 您可以随时清空所有信息

### 📋 信息传递流程

```
1. 用户填写表单 → 保存到浏览器 localStorage
2. 用户发送消息 → JavaScript 读取 localStorage
3. 附加信息到请求 → 发送给后端 API
4. AI 生成回复 → 考虑用户信息
5. 返回个性化建议 → 不保存到数据库
```

### ⚠️ 注意事项

- 清除浏览器数据会删除您保存的信息
- 不同浏览器之间信息不同步
- 隐私模式下保存的信息在关闭后会丢失

## 实际应用场景

### 场景 1: 老年人健康咨询

**用户信息**:
- 姓名: Mary Johnson
- 年龄: 68
- 性别: Female
- 现有状况: Type 2 Diabetes, Osteoporosis
- 过敏: Sulfa drugs
- 药物: Metformin, Calcium supplements

**咨询**: "I've been feeling dizzy lately"

**AI 回复**: 
> "Hi Mary, dizziness can be concerning, especially with your diabetes. Here are some considerations:
> 
> 1. **Blood Sugar Check**: Your diabetes medication (Metformin) can sometimes cause low blood sugar. Please check your blood glucose levels.
> 2. **Hydration**: Make sure you're drinking enough water.
> 3. **Medication Review**: Given your Metformin and calcium supplements, timing of meals is important.
> 4. **Bone Health**: With osteoporosis, be extra careful to avoid falls.
> 
> ⚠️ **Important**: If dizziness persists or worsens, please see your doctor immediately as this could indicate blood sugar issues or medication interaction."

### 场景 2: 友好聊天

**用户信息**:
- 姓名: Robert
- 年龄: 72
- 现有状况: Mild arthritis

**聊天**: "The weather is so nice today!"

**AI 回复**:
> "That's wonderful, Robert! 😊 Beautiful weather is such a blessing. With your arthritis being mild, this might be a perfect day for a gentle walk in the park or some light gardening if you enjoy it. Just remember to take it easy and stay hydrated! What do you like to do on nice days like this?"

## 最佳实践

### ✅ 推荐做法

1. **如实填写**: 准确的信息能获得更好的建议
2. **定期更新**: 健康状况变化时记得更新
3. **详细描述**: 健康状况可以详细列出
4. **保存重要信息**: 特别是过敏史和药物信息

### ❌ 注意避免

1. **不要填写敏感个人信息**: 如身份证号、详细地址
2. **不要过分依赖**: AI 建议不能替代医生诊断
3. **不要共享账号**: 每个人应使用自己的浏览器配置

## 技术细节

### 数据存储格式

```javascript
{
  "name": "John Smith",
  "age": "65",
  "gender": "Male",
  "conditions": "Diabetes, High blood pressure",
  "allergies": "Penicillin",
  "medications": "Metformin, Lisinopril"
}
```

### System Prompt 格式

```
User Profile Information:
- Name: John Smith
- Age: 65 years old
- Gender: Male
- Existing Health Conditions: Diabetes, High blood pressure
- Allergies: Penicillin
- Current Medications: Metformin, Lisinopril

Please consider this information when providing advice.
```

## 常见问题

### Q: 我必须填写所有字段吗?
A: 不需要,所有字段都是可选的。您可以只填写您愿意分享的信息。

### Q: 我的信息安全吗?
A: 是的,信息只保存在您的浏览器本地,不会上传到服务器数据库。

### Q: 更换浏览器后信息还在吗?
A: 不在,信息只存储在当前浏览器的 localStorage 中。

### Q: AI 会记住我们之前的对话吗?
A: 目前不会,每次对话都是独立的。但您的基本信息会在每次对话中被考虑。

### Q: 如何验证信息是否被使用?
A: 您可以先不填信息咨询一次,再填写信息后咨询同样的问题,对比 AI 的回复差异。

## 更新日志

### Version 1.0 (2025-10-17)
- ✅ 添加个人信息录入界面
- ✅ 本地存储功能
- ✅ 与健康咨询集成
- ✅ 与友好聊天集成
- ✅ 保存/清除功能
- ✅ 表单验证和用户反馈

## 总结

个人信息功能让 AICSE 健康助手变得更智能、更贴心。通过提供您的基本信息,AI 可以:

- 🎯 提供更精准的健康建议
- 💊 考虑药物相互作用和过敏史
- 👵 提供适龄的生活建议
- 💬 进行更自然、更亲切的对话

您的信息安全是我们的首要考虑,所有数据都保存在您的本地浏览器中,您可以随时查看、修改或删除。

开始使用个人信息功能,让 AI 更了解您,为您提供更好的服务! 🌟
