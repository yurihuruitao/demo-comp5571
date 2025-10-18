# 🤖 引导机器人功能说明

## 功能概述

添加了一个智能的**Profile Assistant（个人信息引导机器人）**，通过友好的对话方式帮助用户填写个人健康信息，特别适合不熟悉表单填写的老年用户。

---

## ✨ 核心特点

### 1. 对话式交互
- 🗣️ 逐步引导，一次只问一个问题
- 💬 自然语言理解，接受多种表达方式
- 🎯 智能提取关键信息
- ✅ 实时反馈已保存的信息

### 2. 进度可视化
- 📊 进度条显示完成百分比
- 📝 当前步骤提示（Step X of 7）
- 🎨 紫色渐变主题，醒目且友好

### 3. 语音输入支持
- 🎤 支持语音输入每个回答
- 🔊 自动转换为文字（可选TTS播放问题）

### 4. 灵活友好
- 🔄 支持重新开始
- 💾 确认后再保存
- 🌟 系统消息实时提示保存状态

---

## 🎯 用户交互流程

### 完整对话示例

```
🤖 Bot: Hi! I'm your profile assistant. I'll help you set up your 
        health profile through a friendly conversation. Let's start 
        with your name - what should I call you?

👤 User: My name is John Smith

🤖 Bot: Nice to meet you, John Smith! Now, how old are you?
✓ Saved: Name = "John Smith"

👤 User: I'm 65

🤖 Bot: Thank you! You're 65 years old. Could you tell me your gender?
✓ Saved: Age = "65"

👤 User: Male

🤖 Bot: Got it! Do you have any existing health conditions I should know 
        about? For example, diabetes, high blood pressure, or arthritis?
✓ Saved: Gender = "Male"

👤 User: I have diabetes and high blood pressure

🤖 Bot: Thanks for sharing. Do you have any allergies? This could be to 
        medications, foods, or anything else.
✓ Saved: Health Conditions = "diabetes and high blood pressure"

👤 User: I'm allergic to penicillin

🤖 Bot: Good to know. Are you currently taking any medications? If so, 
        which ones?
✓ Saved: Allergies = "penicillin"

👤 User: Metformin and Lisinopril

🤖 Bot: Perfect! Let me summarize everything...
✓ Saved: Medications = "Metformin and Lisinopril"

🤖 Bot: Here's what I've collected:
        Name: John Smith
        Age: 65
        Gender: Male
        Health Conditions: diabetes and high blood pressure
        Allergies: penicillin
        Medications: Metformin and Lisinopril
        
        Does this look correct? Would you like to save it?

[💾 Save Profile] [🔄 Start Over]
```

---

## 🔧 技术实现

### 后端（Flask）

#### 新增API端点：`/profile_guide`

```python
@app.route("/profile_guide", methods=["POST"])
def profile_guide():
    """处理引导机器人请求，通过对话方式收集用户信息"""
    data = request.get_json()
    user_message = data.get("message", "")
    step = data.get("step", 1)
    collected_data = data.get("collectedData", {})
    
    # 使用AI提取关键信息
    # 根据步骤生成下一个问题
    # 返回提取的信息和下一个问题
```

#### 7个收集步骤

| 步骤 | 字段 | 示例问题 | AI任务 |
|------|------|----------|--------|
| 1 | Name | What should I call you? | 提取姓名 |
| 2 | Age | How old are you? | 提取年龄（数字） |
| 3 | Gender | Could you tell me your gender? | 提取性别（Male/Female/Other） |
| 4 | Conditions | Any existing health conditions? | 提取健康状况 |
| 5 | Allergies | Do you have any allergies? | 提取过敏信息 |
| 6 | Medications | Are you taking any medications? | 提取药物列表 |
| 7 | Confirmation | 总结并确认所有信息 | 生成摘要 |

#### AI信息提取

```python
# 针对每个字段的特殊指令
field_instructions = {
    1: "Extract the person's name. Accept first name, full name, or nickname.",
    2: "Extract age as a number. Convert words like 'sixty five' to '65'.",
    3: "Extract gender. Accept variations: 'man/boy'→Male, 'woman/girl'→Female.",
    4: "Extract health conditions. Common: diabetes, high blood pressure...",
    5: "Extract allergies. Common: penicillin, peanuts, pollen...",
    6: "Extract medication names. Common: Metformin, Lisinopril, Aspirin..."
}
```

**智能理解示例**：
- "I'm sixty-five years old" → `65`
- "I'm a man" → `Male`
- "No allergies" / "None" → `None`
- "I take metformin for my diabetes" → `Metformin`

### 前端（JavaScript）

#### 核心变量

```javascript
let currentStep = 1;  // 当前步骤（1-7）
let collectedData = {
    name: '',
    age: '',
    gender: '',
    conditions: '',
    allergies: '',
    medications: ''
};
```

#### 关键函数

1. **sendGuideMessage()** - 发送用户消息到后端
   ```javascript
   const response = await fetch('/profile_guide', {
       method: 'POST',
       body: JSON.stringify({
           message: messageText,
           step: currentStep,
           collectedData: collectedData
       })
   });
   ```

2. **updateGuideProgress()** - 更新进度条
   ```javascript
   const progress = (currentStep / 7) * 100;
   guideProgressFill.style.width = progress + '%';
   ```

3. **saveGuidedProfile()** - 保存到localStorage
   ```javascript
   localStorage.setItem('userProfile', JSON.stringify(profileData));
   ```

4. **restartGuide()** - 重新开始
   ```javascript
   currentStep = 1;
   collectedData = { ... };
   ```

---

## 🎨 UI设计

### 主按钮

```html
<button id="profile-guide-btn" class="profile-guide-btn">
    🤖 Profile Assistant
</button>
```

- **颜色**：紫色渐变（#ab47bc → #8e24aa）
- **位置**：顶部控制栏，Profile按钮旁边
- **样式**：与其他按钮一致的圆角、阴影、悬停效果

### 对话界面

```
┌────────────────────────────────────┐
│  🤖 Profile Assistant          ✕   │
│  Let me help you set up...         │
├────────────────────────────────────┤
│                                    │
│  🤖 Bot: What's your name?         │
│                                    │
│  👤 You: John                      │
│                                    │
│  ✓ Saved: Name = "John"            │
│                                    │
│  🤖 Bot: How old are you?          │
│                                    │
├────────────────────────────────────┤
│  [Type your answer here...]        │
│  [🎤] [Send]                       │
├────────────────────────────────────┤
│  ████████░░░░░░░░░░░░░░░  57%      │
│  Step 4 of 7: Health Conditions    │
└────────────────────────────────────┘
```

### 消息类型

1. **AI消息** - 蓝色背景
   ```html
   <div class="chat-message ai-message">
       <p>Bot's question...</p>
   </div>
   ```

2. **用户消息** - 绿色背景
   ```html
   <div class="chat-message user-message">
       <p>User's answer...</p>
   </div>
   ```

3. **系统消息** - 橙色边框
   ```html
   <div class="chat-message system-message">
       <p>✓ Saved: Field = "Value"</p>
   </div>
   ```

### 进度条

```css
.progress-fill {
    background: linear-gradient(90deg, #ab47bc 0%, #8e24aa 100%);
    transition: width 0.5s ease;
}
```

- 平滑动画过渡
- 紫色渐变填充
- 百分比和步骤名称同步更新

---

## 💡 老年用户友好设计

### 1. 简化交互
- ✅ 一次只问一个问题，避免信息过载
- ✅ 自然语言输入，无需理解表单字段
- ✅ 即时反馈，用户知道信息已保存

### 2. 灵活理解
- ✅ 接受多种表达方式
  - "I'm 65" = "sixty-five" = "65 years old"
  - "I'm a woman" = "Female" = "girl"
- ✅ 智能纠错和转换

### 3. 语音支持
- ✅ 点击麦克风图标说话
- ✅ 自动转换为文字
- ✅ 适合不擅长打字的用户

### 4. 视觉清晰
- ✅ 大字体、高对比度
- ✅ 清晰的进度指示
- ✅ 彩色消息区分（蓝色问题、绿色回答、橙色确认）

### 5. 容错性
- ✅ 支持重新开始
- ✅ 确认后再保存，避免误操作
- ✅ 友好的错误提示

---

## 🔄 与传统表单的对比

| 特性 | 传统表单 | 引导机器人 |
|------|----------|-----------|
| **学习曲线** | 需要理解表单字段 | 自然对话，无需学习 |
| **输入方式** | 鼠标点击、键盘输入 | 对话 + 语音 |
| **一次性填写** | 所有字段同时显示 | 逐步引导，一次一个 |
| **灵活性** | 固定格式 | 接受多种表达 |
| **反馈** | 提交后才知道结果 | 实时确认每个信息 |
| **适合人群** | 熟悉电脑的用户 | 所有用户，尤其老年人 |

---

## 📊 数据流程

```
用户输入 → 前端收集 → 后端AI提取 → 前端显示确认 → localStorage保存

详细流程：
1. 用户在对话框输入回答
2. JavaScript调用 /profile_guide API
3. 后端使用Qwen Max提取关键信息
4. 返回提取结果 + 下一个问题
5. 前端保存到collectedData对象
6. 显示系统消息"✓ Saved"
7. currentStep++，更新进度条
8. 显示下一个问题
9. 重复直到第7步（确认）
10. 用户点击"Save Profile"
11. 保存到localStorage
12. 与传统Profile表单共用同一数据结构
```

---

## 🎯 使用场景

### 场景1：新用户首次设置
```
用户打开应用 → 点击"🤖 Profile Assistant" → 
跟随机器人对话 → 完成所有7步 → 保存
```

### 场景2：老年用户避免表单
```
不熟悉表单 → 选择对话方式 → 
用语音回答 → 轻松完成设置
```

### 场景3：快速更新信息
```
需要修改信息 → 重新开始引导 → 
快速重新回答 → 覆盖旧数据
```

---

## 🚀 未来改进建议

### 1. 智能建议
- 根据健康状况推荐相关问题
- 常见药物自动补全

### 2. 多语言支持
- 中英文双语对话
- 自动检测用户语言

### 3. 语音输出
- 朗读每个问题
- 完全语音交互

### 4. 更智能的理解
- 一次性回答多个问题
- 上下文理解

### 5. 进度保存
- 中途退出自动保存进度
- 下次打开继续未完成的步骤

### 6. 数据验证
- 年龄范围检查
- 药物名称校验
- 提供常见选项供快速选择

---

## 📝 代码位置

### 后端
- **文件**: `app.py`
- **新增路由**: `/profile_guide`
- **行数**: ~100行

### 前端
- **HTML**: `templates/index.html` - 引导机器人模态窗口
- **CSS**: `static/style.css` - 按钮和进度条样式
- **JavaScript**: `static/script.js` - 对话逻辑和数据处理
- **行数**: ~250行

---

## 🎉 总结

引导机器人功能为老年用户提供了一个**零学习成本**的个人信息设置方式：

✅ **自然对话** - 像聊天一样填信息  
✅ **逐步引导** - 不会感到overwhelmed  
✅ **语音支持** - 说话就能完成  
✅ **智能提取** - AI理解多种表达  
✅ **实时反馈** - 知道每步都成功了  
✅ **进度可视** - 清楚还要多久完成  
✅ **灵活友好** - 可以重新开始  

这个功能将大大提升老年用户的使用体验，让健康信息收集变得简单、有趣且高效！🚀
