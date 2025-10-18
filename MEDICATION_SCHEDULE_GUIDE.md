# 药物时间表功能使用指南

## 功能概述

新增的药物时间表功能允许用户以**表格形式**记录每日服药时间安排,AI 将根据这些信息提供更精准的用药提醒和健康建议。

## 功能特点

### 📋 表格化管理
- 清晰的表格布局
- 支持添加多条药物记录
- 可随时编辑或删除
- 自动保存到本地

### 🕐 详细记录
每条药物记录包含:
- **药物名称** (Medication Name): 如 Metformin、Aspirin
- **服用时间** (Time): 选择具体时间,如 08:00、20:00
- **剂量** (Dosage): 如 500mg、1 tablet
- **备注** (Notes): 如 "饭后服用"、"空腹"、"睡前"

## 使用步骤

### 1. 打开个人信息页面

点击 **"👤 My Profile"** 按钮

### 2. 找到药物时间表区域

向下滚动到 **"💊 Medication Schedule"** 部分

### 3. 添加药物记录

点击 **"➕ Add Medication"** 按钮,会新增一行空白记录

### 4. 填写药物信息

在表格中填写以下信息:

| 字段 | 说明 | 示例 |
|------|------|------|
| Medication Name | 药物名称 | Metformin |
| Time | 服用时间(24小时制) | 08:00 |
| Dosage | 剂量 | 500mg |
| Notes | 备注说明 | After breakfast |

### 5. 添加更多药物

重复步骤3-4,可以添加多条记录

### 6. 删除记录

点击每行末尾的 **"🗑️ Delete"** 按钮删除该记录

### 7. 保存信息

点击 **"💾 Save Profile"** 保存所有信息

## 使用示例

### 示例 1: 糖尿病患者

| Medication Name | Time | Dosage | Notes |
|----------------|------|---------|-------|
| Metformin | 08:00 | 500mg | After breakfast |
| Metformin | 20:00 | 500mg | After dinner |
| Glimepiride | 07:30 | 2mg | Before breakfast |

### 示例 2: 高血压患者

| Medication Name | Time | Dosage | Notes |
|----------------|------|---------|-------|
| Lisinopril | 08:00 | 10mg | Once daily |
| Aspirin | 21:00 | 81mg | Before bed |

### 示例 3: 老年综合用药

| Medication Name | Time | Dosage | Notes |
|----------------|------|---------|-------|
| Calcium supplement | 09:00 | 600mg | With breakfast |
| Vitamin D | 09:00 | 1000 IU | With calcium |
| Blood pressure med | 08:00 | 5mg | Empty stomach |
| Sleeping pill | 22:00 | As needed | PRN for insomnia |

## 界面说明

### 表格布局

```
┌─────────────────┬──────┬─────────┬──────────────┬────────┐
│ Medication Name │ Time │ Dosage  │ Notes        │ Action │
├─────────────────┼──────┼─────────┼──────────────┼────────┤
│ [输入框]         │[时间]│ [输入框] │ [输入框]      │ [删除]  │
└─────────────────┴──────┴─────────┴──────────────┴────────┘
```

### 按钮功能

- **➕ Add Medication**: 添加新的药物记录行
- **🗑️ Delete**: 删除当前行
- **💾 Save Profile**: 保存所有个人信息(包括药物表)
- **🗑️ Clear All**: 清除所有信息(包括药物表)

## AI 如何使用这些信息

### 用药提醒

当您咨询健康问题时,AI 会参考您的用药时间表:

**用户**: "我早上8点吃完早饭后感觉胃不舒服"

**AI 回复** (考虑了您的用药时间表):
> "I see you take Metformin at 8:00 AM after breakfast. Metformin can sometimes cause stomach discomfort, especially in the beginning. Here are some suggestions:
> 
> 1. Make sure you eat enough food before taking Metformin
> 2. Try taking it with a glass of milk
> 3. The discomfort usually improves after a few weeks
> 
> If the discomfort persists or worsens, please consult your doctor about adjusting the dosage or timing."

### 用药冲突检测

**用户**: "医生新开了一个药,我应该什么时候吃?"

**AI 回复** (检查现有用药):
> "Looking at your current medication schedule:
> - Metformin at 08:00 and 20:00
> - Glimepiride at 07:30
> 
> Please tell me the name of the new medication, and I can suggest the best timing to avoid interactions. Generally, it's good to space medications at least 1-2 hours apart if possible."

### 生活方式建议

**用户**: "我晚上总是失眠"

**AI 回复** (注意到睡前用药):
> "I notice you take Aspirin at 21:00 before bed. Some suggestions for better sleep:
> 
> 1. Try to take your evening Aspirin 1-2 hours before bedtime
> 2. Establish a regular bedtime routine
> 3. Avoid screens 1 hour before your medication time (21:00)
> 
> Your current schedule: Aspirin at 21:00 - consider adjusting to 20:00 if it helps."

## 数据存储

### 存储位置
- 本地浏览器 `localStorage`
- 不上传到服务器数据库
- 隐私安全

### 数据格式
```javascript
{
  "medicationSchedule": [
    {
      "id": "1697500000000",
      "name": "Metformin",
      "time": "08:00",
      "dosage": "500mg",
      "notes": "After breakfast"
    },
    {
      "id": "1697500000001",
      "name": "Aspirin",
      "time": "21:00",
      "dosage": "81mg",
      "notes": "Before bed"
    }
  ]
}
```

### System Prompt 格式

AI 收到的用户信息会包含药物时间表:

```
User Profile Information:
- Name: John Smith
- Age: 65 years old
- Medication Schedule:
  • Metformin at 08:00 (500mg) - After breakfast
  • Metformin at 20:00 (500mg) - After dinner
  • Aspirin at 21:00 (81mg) - Before bed
```

## 最佳实践

### ✅ 推荐做法

1. **完整填写**: 尽量填写所有字段,特别是时间和剂量
2. **详细备注**: 在 Notes 中注明特殊要求(饭前/饭后/空腹等)
3. **及时更新**: 医生调整用药后立即更新
4. **按时间排序**: 建议按服用时间从早到晚添加
5. **定期检查**: 定期打开查看,确保信息准确

### ❌ 注意避免

1. **不要填写过期药物**: 及时删除已停用的药物
2. **不要混淆剂量**: 确保剂量单位正确(mg/g/ml/tablet)
3. **不要遗漏时间**: 时间字段很重要,尽量填写
4. **不要过度简化**: "早中晚"不如具体时间明确

## 实用技巧

### 技巧 1: 使用备注字段

**好的备注**:
- "With food" (随餐)
- "Empty stomach" (空腹)
- "30 min before meal" (饭前30分钟)
- "At bedtime" (睡前)
- "PRN - as needed" (按需服用)

**不好的备注**:
- "重要" (不够具体)
- "记得吃" (无实际信息)

### 技巧 2: 处理一天多次的药物

如果同一药物一天吃多次,添加多行记录:

| Medication Name | Time | Dosage | Notes |
|----------------|------|---------|-------|
| Metformin | 08:00 | 500mg | After breakfast |
| Metformin | 14:00 | 500mg | After lunch |
| Metformin | 20:00 | 500mg | After dinner |

### 技巧 3: 按需用药(PRN)

对于按需服药,可以不填时间:

| Medication Name | Time | Dosage | Notes |
|----------------|------|---------|-------|
| Ibuprofen | - | 400mg | PRN for pain, max 3x/day |
| Nitroglycerin | - | 1 tablet | PRN for chest pain |

### 技巧 4: 补充剂管理

维生素和补充剂也可以记录:

| Medication Name | Time | Dosage | Notes |
|----------------|------|---------|-------|
| Vitamin D3 | 09:00 | 2000 IU | With breakfast |
| Fish Oil | 09:00 | 1000mg | Omega-3 |
| Calcium | 21:00 | 600mg | Before bed |

## 常见问题

### Q: 我的药太多了,表格会不会太长?
A: 表格支持滚动,可以添加任意数量的药物记录。如果超过10种药物,建议只记录最重要的处方药。

### Q: 时间字段必须填写吗?
A: 不是必须的,但强烈建议填写。有时间信息,AI 可以提供更准确的用药建议。

### Q: 可以修改已保存的记录吗?
A: 可以。重新打开 My Profile,修改后点击 Save Profile 即可。

### Q: 删除一条记录后需要保存吗?
A: 是的。删除后务必点击 Save Profile,否则删除不会生效。

### Q: 表格数据会丢失吗?
A: 只要不清除浏览器数据,信息会一直保存。建议定期截图备份。

### Q: 可以导出数据吗?
A: 当前版本不支持导出,但数据保存在 localStorage 中,可以通过浏览器开发者工具查看。

### Q: 多个浏览器之间数据会同步吗?
A: 不会。数据只保存在当前浏览器,不会自动同步。

## 界面预览

### 空表格状态
```
┌────────────────────────────────────────────────────────────────┐
│  No medications added yet. Click '➕ Add Medication' to start. │
└────────────────────────────────────────────────────────────────┘

                    [➕ Add Medication]
```

### 填写后的表格
```
┌─────────────┬──────┬────────┬────────────────┬─────────┐
│ Metformin   │08:00 │ 500mg  │ After breakfast│ [Delete]│
│ Metformin   │20:00 │ 500mg  │ After dinner   │ [Delete]│
│ Aspirin     │21:00 │ 81mg   │ Before bed     │ [Delete]│
└─────────────┴──────┴────────┴────────────────┴─────────┘

                    [➕ Add Medication]
```

## 视觉样式

- **表头**: 蓝色渐变背景,白色文字
- **表格行**: 白色背景,悬停时变浅蓝
- **输入框**: 淡蓝色背景,聚焦时蓝色边框
- **添加按钮**: 绿色渐变
- **删除按钮**: 红色渐变

## 响应式设计

在小屏幕设备上:
- 字体自动缩小
- 表格可横向滚动
- 按钮大小适配触摸操作

## 技术实现

### 核心功能

1. **动态添加行**: `addMedicationRow()`
2. **删除行**: `deleteMedicationRow()`
3. **获取数据**: `getMedicationScheduleData()`
4. **加载数据**: `loadMedicationSchedule()`
5. **保存到本地**: `localStorage.setItem()`

### 数据流

```
用户填写表格
    ↓
点击保存按钮
    ↓
getMedicationScheduleData() 收集数据
    ↓
保存到 localStorage
    ↓
用户发送健康咨询
    ↓
getUserProfileContext() 读取数据
    ↓
格式化为 System Prompt
    ↓
发送给 AI API
    ↓
AI 生成个性化建议
```

## 更新日志

### Version 1.0 (2025-10-17)
- ✅ 添加药物时间表表格
- ✅ 支持添加/删除行
- ✅ 实时编辑功能
- ✅ 与个人信息集成
- ✅ System Prompt 生成
- ✅ 响应式设计
- ✅ 本地存储功能

## 总结

药物时间表功能让用药管理更加:

- 📊 **可视化**: 表格形式一目了然
- ⏰ **精确化**: 具体到分钟的时间管理
- 🎯 **个性化**: AI 根据您的用药时间提供建议
- 💾 **持久化**: 自动保存,无需担心丢失
- 🔒 **安全化**: 本地存储,保护隐私

开始使用药物时间表,让 AI 成为您的智能用药助手! 💊✨
