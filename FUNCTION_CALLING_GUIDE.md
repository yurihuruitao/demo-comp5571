# Function Calling 功能使用指南

## 功能概述

新增的 **Function Calling** 功能允许用户通过**自然对话**的方式与 AI 互动,直接添加服药提醒到个人药物时间表中,无需手动打开表单填写。

## 核心特性

### 🤖 智能识别
AI 能自动识别用户的服药提醒需求,例如:
- "提醒我早上8点吃降压药"
- "帮我设置一个晚上9点的服药提醒"
- "我需要每天下午2点吃二甲双胍"

### 🔧 自动执行
当 AI 识别到服药提醒请求时,会:
1. 调用 `add_medication_reminder` 函数
2. 提取药物名称、时间、剂量、备注
3. 自动添加到用户的药物时间表
4. 在聊天中显示成功确认

### 💾 无缝集成
- 自动保存到 localStorage
- 与个人信息页面同步
- 可在 My Profile 中查看和编辑

## 使用方法

### 方式 1: 自然语言请求

在 **Friendly Chat** 对话框中,用自然语言告诉 AI:

**示例对话**:

```
用户: "Can you help me set up a reminder to take my blood pressure medication at 8 AM?"

AI: "Sure! I'll help you set up a reminder for blood pressure medication at 08:00. ✓"

系统: ✓ Medication reminder added: blood pressure medication at 08:00
```

### 方式 2: 详细指定信息

提供更详细的信息:

```
用户: "Remind me to take Metformin 500mg after breakfast at 8:30 AM"

AI: "Sure! I'll help you set up a reminder for Metformin at 08:30. ✓"

系统: ✓ Medication reminder added: Metformin at 08:30
```

### 方式 3: 多个提醒

一次性设置多个提醒:

```
用户: "I need reminders for my morning medications: Lisinopril at 7 AM and Aspirin at 8 AM"

AI: "Sure! I'll help you set up a reminder for Lisinopril at 07:00. ✓"
系统: ✓ Medication reminder added: Lisinopril at 07:00

AI: "Sure! I'll help you set up a reminder for Aspirin at 08:00. ✓"
系统: ✓ Medication reminder added: Aspirin at 08:00
```

## 支持的表达方式

### 时间格式

AI 能理解多种时间表达:

| 用户说法 | AI 识别为 |
|---------|----------|
| "8 AM" | 08:00 |
| "eight in the morning" | 08:00 |
| "half past seven" | 07:30 |
| "9 PM" | 21:00 |
| "noon" | 12:00 |
| "midnight" | 00:00 |

### 药物描述

支持各种药物描述方式:

| 用户说法 | AI 提取 |
|---------|---------|
| "blood pressure medication" | blood pressure medication |
| "Metformin 500mg" | Metformin |
| "my diabetes pills" | diabetes pills |
| "aspirin tablet" | aspirin |
| "vitamin D supplement" | vitamin D |

### 剂量信息

可选包含剂量信息:

| 用户说法 | 剂量字段 |
|---------|---------|
| "500mg" | 500mg |
| "one tablet" | 1 tablet |
| "two pills" | 2 pills |
| "5ml" | 5ml |

### 备注信息

可选包含服用提示:

| 用户说法 | 备注字段 |
|---------|---------|
| "after breakfast" | After breakfast |
| "before bed" | Before bed |
| "with food" | With food |
| "on empty stomach" | Empty stomach |

## 技术实现

### 后端 Function Definition

```python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "add_medication_reminder",
            "description": "Add a medication reminder to the user's schedule",
            "parameters": {
                "type": "object",
                "properties": {
                    "medication_name": {
                        "type": "string",
                        "description": "The name of the medication"
                    },
                    "time": {
                        "type": "string",
                        "description": "Time in 24-hour format HH:MM"
                    },
                    "dosage": {
                        "type": "string",
                        "description": "The dosage, e.g., 500mg, 1 tablet"
                    },
                    "notes": {
                        "type": "string",
                        "description": "Additional notes"
                    }
                },
                "required": ["medication_name", "time"]
            }
        }
    }
]
```

### API 调用流程

```python
response = client.chat.completions.create(
    model="qwen-max",
    messages=messages,
    tools=TOOLS,
    tool_choice="auto",  # AI 自动决定是否调用函数
    temperature=0.8,
    max_tokens=500
)

# 检查是否有函数调用
if response.tool_calls:
    function_name = response.tool_calls[0].function.name
    function_args = json.loads(response.tool_calls[0].function.arguments)
    # 返回函数调用信息给前端
```

### 前端处理

```javascript
// 检查响应中是否有函数调用
if (data.function_call && data.function_call.name === 'add_medication_reminder') {
    const args = data.function_call.arguments;
    
    // 读取用户配置
    const profile = localStorage.getItem('userProfile');
    const profileData = JSON.parse(profile);
    
    // 添加新提醒
    profileData.medicationSchedule.push({
        id: Date.now().toString(),
        name: args.medication_name,
        time: args.time,
        dosage: args.dosage || '',
        notes: args.notes || 'Added via chat'
    });
    
    // 保存
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // 显示成功消息
    showSuccessMessage(`Medication reminder added: ${args.medication_name} at ${args.time}`);
}
```

## 实际应用场景

### 场景 1: 老年人快速设置

**背景**: 老年用户不熟悉表单操作

**对话**:
```
用户: "我每天早上要吃降压药，能帮我设置个提醒吗？"

AI: "Sure! I'll help you set up a reminder for blood pressure medication at 08:00. ✓"

系统: ✓ Medication reminder added: blood pressure medication at 08:00
```

**优势**: 无需打开 My Profile,无需填写表单,通过对话完成

### 场景 2: 批量设置多个提醒

**背景**: 用户有多种药物需要设置

**对话**:
```
用户: "I need to take three medications daily: Metformin at 8 AM, another Metformin at 8 PM, and Aspirin at night before bed"

AI: "Sure! I'll help you set up a reminder for Metformin at 08:00. ✓"
系统: ✓ Medication reminder added: Metformin at 08:00

AI: "Sure! I'll help you set up a reminder for Metformin at 20:00. ✓"
系统: ✓ Medication reminder added: Metformin at 20:00

AI: "Sure! I'll help you set up a reminder for Aspirin at 22:00. ✓"
系统: ✓ Medication reminder added: Aspirin at 22:00
```

### 场景 3: 医生开了新药

**背景**: 刚从医院回来,需要添加新药

**对话**:
```
用户: "The doctor just prescribed me Lisinopril 10mg. I need to take it every morning at 7:30 before breakfast"

AI: "Sure! I'll help you set up a reminder for Lisinopril at 07:30. ✓"

系统: ✓ Medication reminder added: Lisinopril at 07:30
```

**结果**: 在 My Profile 中可以看到:
- Medication Name: Lisinopril
- Time: 07:30
- Dosage: 10mg
- Notes: Added via chat

### 场景 4: 临时用药提醒

**对话**:
```
用户: "I'm starting antibiotics today. I need to take Amoxicillin 500mg three times a day - 8 AM, 2 PM, and 8 PM"

AI: (会自动创建三个提醒)
```

## 查看和管理

### 查看添加的提醒

1. 点击 **"👤 My Profile"**
2. 向下滚动到 **"💊 Medication Schedule"**
3. 查看通过对话添加的提醒(备注为 "Added via chat")

### 编辑提醒

在 My Profile 中:
- 修改任何字段
- 添加更多详细信息
- 调整时间
- 点击 **"💾 Save Profile"** 保存

### 删除提醒

在 My Profile 中:
- 点击对应行的 **"🗑️ Delete"** 按钮
- 点击 **"💾 Save Profile"** 保存

## 优势对比

### 传统方式 (手动表单)

```
1. 点击 "👤 My Profile" 按钮
   ↓
2. 向下滚动找到药物时间表
   ↓
3. 点击 "➕ Add Medication"
   ↓
4. 填写药物名称
   ↓
5. 选择时间
   ↓
6. 填写剂量
   ↓
7. 填写备注
   ↓
8. 点击 "💾 Save Profile"
```

**步骤**: 8 步  
**时间**: ~2-3 分钟

### Function Calling 方式

```
1. 在聊天中说: "Remind me to take Metformin at 8 AM"
   ↓
2. AI 自动添加 ✓
```

**步骤**: 1 步  
**时间**: ~10 秒

**效率提升**: 约 **80-90%**

## 注意事项

### ✅ 最佳实践

1. **清晰表达**: 明确说出药物名称和时间
   - 好: "Remind me to take Aspirin at 9 PM"
   - 差: "晚上吃那个药"

2. **包含关键信息**: 至少提供药物名称和时间
   - 必需: 药物名 + 时间
   - 可选: 剂量 + 备注

3. **使用 24 小时制**: 或明确说明 AM/PM
   - 好: "8 AM" 或 "20:00"
   - 差: "8 点" (不明确)

4. **验证添加**: 查看系统成功消息
   - 看到绿色提示框表示成功

5. **定期检查**: 在 My Profile 中查看完整列表
   - 确保所有提醒都正确添加

### ⚠️ 注意事项

1. **时间格式**: AI 会尽力理解,但标准格式最准确
2. **重复提醒**: 不会自动检测重复,可能添加相同药物的多个提醒
3. **备注默认值**: 如果未指定,备注为 "Added via chat"
4. **需要联网**: Function Calling 需要调用 API

### ❌ 常见错误

1. **模糊表达**:
   - 错误: "提醒我吃药"
   - 正确: "Remind me to take Metformin at 8 AM"

2. **时间不明确**:
   - 错误: "明天早上"
   - 正确: "8:00 AM" 或 "tomorrow at 8:00 AM"

3. **药物名称不清楚**:
   - 错误: "那个白色的药片"
   - 正确: "Aspirin" 或 "blood pressure medication"

## 数据流程

```
用户输入
  ↓
"Remind me to take Metformin at 8 AM"
  ↓
发送到后端 /chat API
  ↓
调用 call_chat_api() with tools
  ↓
Qwen Max 识别意图
  ↓
返回 function_call:
{
  "name": "add_medication_reminder",
  "arguments": {
    "medication_name": "Metformin",
    "time": "08:00",
    "dosage": "",
    "notes": ""
  }
}
  ↓
后端返回给前端
  ↓
前端 JavaScript 处理
  ↓
读取 localStorage
  ↓
添加到 medicationSchedule
  ↓
保存到 localStorage
  ↓
显示成功消息
  ↓
用户可在 My Profile 中查看
```

## 调试信息

### 后端日志

```bash
收到聊天消息: 'Remind me to take Metformin at 8 AM'
函数调用: add_medication_reminder, 参数: {'medication_name': 'Metformin', 'time': '08:00'}
返回函数调用: {'name': 'add_medication_reminder', 'arguments': {...}}
```

### 前端控制台

```javascript
Received chat data: {
  reply: "Sure! I'll help you set up a reminder for Metformin at 08:00. ✓",
  function_call: {
    name: "add_medication_reminder",
    arguments: {
      medication_name: "Metformin",
      time: "08:00"
    }
  }
}
Function call detected: {medication_name: "Metformin", time: "08:00"}
Medication reminder added: {medication_name: "Metformin", time: "08:00"}
```

## 扩展可能

### 未来可能添加的功能

1. **删除提醒**: "Remove the 8 AM Metformin reminder"
2. **修改提醒**: "Change my Aspirin time from 8 PM to 9 PM"
3. **查询提醒**: "What medications do I need to take today?"
4. **批量设置**: "Set up my weekly medication schedule"
5. **重复模式**: "Remind me every Monday, Wednesday, Friday"

### 更多 Function Calls

可以添加更多工具函数:
- `check_medication_conflicts`: 检查药物相互作用
- `suggest_medication_time`: AI 建议最佳服药时间
- `create_health_report`: 生成健康报告
- `schedule_doctor_appointment`: 预约医生

## 常见问题

### Q: AI 会自动识别所有服药请求吗?
A: 是的,只要用户表达中包含"提醒"、"reminder"、"set up"等关键词,并且提到药物和时间,AI 就会尝试调用函数。

### Q: 如果我说得不清楚,AI 会怎么做?
A: AI 会尽力理解并提取信息。如果信息不完整,可能会添加部分信息,或者要求用户澄清。

### Q: 可以一次添加多个提醒吗?
A: 可以,在一段话中提到多个药物和时间,AI 会依次处理并添加。

### Q: 添加的提醒会立即生效吗?
A: 是的,添加后立即保存到 localStorage,并可在 My Profile 中查看。如果有服药提醒功能,也会立即生效。

### Q: 如果添加了错误的提醒怎么办?
A: 可以在 My Profile 中编辑或删除。

### Q: Function Calling 会增加 API 调用费用吗?
A: 会略微增加,因为需要发送工具定义。但对用户体验的提升远超成本。

### Q: 支持中文对话吗?
A: 当前系统设置为英文响应,但 AI 应该能理解中文输入。建议使用英文以获得最佳体验。

## 更新日志

### Version 1.0 (2025-10-17)
- ✅ 添加 `add_medication_reminder` 函数定义
- ✅ 集成 Function Calling 到聊天 API
- ✅ 前端自动处理函数调用响应
- ✅ 自动保存到 localStorage
- ✅ 显示成功确认消息
- ✅ 与 My Profile 无缝集成

## 总结

Function Calling 功能通过 AI 智能对话,让服药提醒的设置变得:

- 🚀 **更快速**: 从 8 步减少到 1 步
- 🎯 **更直观**: 自然语言,无需学习界面
- 👵 **更友好**: 特别适合老年用户
- 🤖 **更智能**: AI 自动理解和提取信息
- 💾 **更可靠**: 自动保存,即时生效

开始使用对话式交互,让健康管理更轻松! 💊✨
