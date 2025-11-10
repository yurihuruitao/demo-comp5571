from flask import Flask, render_template, request, jsonify, send_file
from openai import OpenAI
import dashscope
from dashscope.audio.tts_v2 import SpeechSynthesizer
import os
import uuid
import re
import json

# 初始化 Flask 应用
app = Flask(__name__)

# 设置阿里云API Key
API_KEY = os.getenv("DASHSCOPE_API_KEY")
dashscope.api_key = API_KEY

# 创建音频文件存储目录
AUDIO_DIR = os.path.join(app.root_path, "static", "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# 定义 Function Call 工具
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "add_medication_reminder",
            "description": "Add a medication reminder to the user's schedule. Use this when the user wants to set up a reminder for taking medication at a specific time.",
            "parameters": {
                "type": "object",
                "properties": {
                    "medication_name": {
                        "type": "string",
                        "description": "The name of the medication, e.g., Metformin, Aspirin, Lisinopril",
                    },
                    "time": {
                        "type": "string",
                        "description": "The time to take the medication in 24-hour format HH:MM, e.g., 08:00, 14:30, 20:00",
                    },
                    "dosage": {
                        "type": "string",
                        "description": "The dosage of the medication, e.g., 500mg, 1 tablet, 2 pills",
                    },
                    "notes": {
                        "type": "string",
                        "description": "Additional notes about taking the medication, e.g., 'After breakfast', 'Before bed', 'With food'",
                    },
                },
                "required": ["medication_name", "time"],
            },
        },
    }
]


def clean_text_for_speech(text):
    """
    清理文本,移除标点符号,为语音合成做准备。

    Args:
        text: 原始文本。

    Returns:
        清理后的文本。
    """
    # 移除常见的标点符号,但保留空格和换行
    # 英文标点
    text = re.sub(r"[,.!?;:\'\"\-\(\)\[\]\{\}<>/\\|@#$%^&*+=_~`]", " ", text)
    # 中文标点
    text = re.sub(r'[。，、；：？！""' "「」『』【】《》〈〉（）…—·～]", " ", text)
    # 其他符号
    text = re.sub(r"[•★☆♪♫→←↑↓▪▫■□●○◆◇◎◉✓✔✕✖✗✘]", " ", text)

    # 移除多余的空格
    text = re.sub(r"\s+", " ", text)
    text = text.strip()

    return text


def text_to_speech(text):
    """
    将文本转换为语音并保存为音频文件。

    Args:
        text: 要转换的文本内容。

    Returns:
        音频文件的URL路径,如果失败返回None。
    """
    try:
        # 清理文本,移除标点符号
        clean_text = clean_text_for_speech(text)

        if not clean_text or len(clean_text.strip()) == 0:
            print("清理后的文本为空,跳过语音合成")
            return None

        print(f"原始文本长度: {len(text)}, 清理后长度: {len(clean_text)}")

        # 生成唯一的文件名
        audio_filename = f"{uuid.uuid4()}.mp3"
        audio_path = os.path.join(AUDIO_DIR, audio_filename)

        # 使用DashScope的语音合成API
        synthesizer = SpeechSynthesizer(model="cosyvoice-v1", voice="longxiaochun")

        # 合成语音 - 使用清理后的文本
        audio_data = synthesizer.call(clean_text)

        # 检查是否成功生成音频数据
        if audio_data and isinstance(audio_data, bytes):
            # 保存音频文件
            with open(audio_path, "wb") as f:
                f.write(audio_data)

            print(f"语音合成成功: {audio_filename}")
            # 返回音频URL
            return f"/static/audio/{audio_filename}"
        else:
            print(f"语音合成返回空数据或格式错误")
            return None

    except Exception as e:
        print(f"语音合成失败: {e}")
        import traceback

        traceback.print_exc()
        return None


def call_chat_api(user_message, user_profile="", language="en"):
    """
    使用通义千问API进行友好的聊天对话,支持 Function Calling。

    Args:
        user_message: 用户发送的聊天消息。
        user_profile: 用户的基本信息上下文。
        language: 语言设置 ('en' 或 'zh')。

    Returns:
        包含回复内容和可能的函数调用的字典。
    """
    # 1. 设置API配置
    api_key = os.getenv("DASHSCOPE_API_KEY")
    base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"

    try:
        # 2. 初始化 OpenAI 客户端
        client = OpenAI(api_key=api_key, base_url=base_url)

        # 3. 构建系统提示词,包含用户信息
        if language == "zh":
            system_content = """你是一个温暖、富有同理心的朋友，正在与一位老年人聊天。你的回复应该友好自然，就像朋友之间的日常对话。仔细倾听，给予鼓励和关心，分享生活智慧。保持回答简洁温暖，使用简单易懂的词汇，保持温和友好的语气。可以适当使用表情符号让对话更生动。不要说教——像朋友一样平等交流。始终用中文回复。回复要更加口语化。不要使用'*'等不属于正常对话的符号。

当用户提到想要设置服药提醒，或者请你帮助他们记住在特定时间吃药时，使用add_medication_reminder函数为他们添加提醒。从对话中提取药物名称、时间、剂量和备注。"""
        else:
            system_content = """You are a warm, empathetic friend chatting with an elderly person. Your responses should be friendly and natural, like everyday conversations between friends. Listen carefully, offer encouragement and care, and share life wisdom. Keep your answers concise and warm, use simple and easy-to-understand words, and maintain a gentle and friendly tone. You can use emojis appropriately to make the conversation more lively. Don't preach - communicate as equals like friends do. Always respond in English. Do not use signals that not belongs to normal conversation. Respond more oral. Do not use '*'

When the user mentions wanting to set up medication reminders, or asks you to help them remember to take medicine at a specific time, use the add_medication_reminder function to add the reminder for them. Extract the medication name, time, dosage, and any notes from the conversation."""

        # 如果有用户信息,添加到系统提示词
        if user_profile:
            system_content += user_profile

        # 构建消息 - 设定为友好的陪伴角色
        messages = [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_message},
        ]

        # 4. 调用 API (支持 Function Calling)
        print(f"收到聊天消息: '{user_message}'")
        if user_profile:
            print(f"用户信息: {user_profile[:100]}...")

        response = client.chat.completions.create(
            model="qwen-max",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
            temperature=0.8,
            max_tokens=500,
        )

        # 5. 检查是否有函数调用
        response_message = response.choices[0].message

        # 如果有 tool_calls,处理函数调用
        if response_message.tool_calls:
            tool_call = response_message.tool_calls[0]
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            print(f"函数调用: {function_name}, 参数: {function_args}")

            # 返回函数调用信息
            if language == "zh":
                default_reply = f"好的！我会帮你设置{function_args.get('medication_name', '药物')}的提醒，时间是{function_args.get('time', '指定时间')}。✓"
            else:
                default_reply = f"Sure! I'll help you set up a reminder for {function_args.get('medication_name', 'your medication')} at {function_args.get('time', 'the specified time')}. ✓"
            
            return {
                "reply": response_message.content or default_reply,
                "function_call": {"name": function_name, "arguments": function_args},
            }
        else:
            # 普通回复
            reply = response_message.content
            print(f"AI回复: '{reply}'")
            return {"reply": reply}

    except Exception as e:
        print(f"聊天API调用失败: {e}")
        import traceback

        traceback.print_exc()
        if language == "zh":
            return {"reply": "抱歉，我刚才走神了。你能再说一遍吗？"}
        else:
            return {"reply": "Sorry, I got distracted for a moment. Could you say that again?"}


def call_qwen_max_api(disease_text, user_profile="", language="en"):
    """
    使用 OpenAI 格式调用通义千问（Qwen Max）API，支持 Function Calling。

    Args:
        disease_text: 从前端接收到的疾病或症状描述。
        user_profile: 用户的基本信息上下文。
        language: 语言设置 ('en' 或 'zh')。

    Returns:
        包含健康建议和可能的函数调用的字典。
    """
    # 检查输入
    if not disease_text or disease_text.strip() == "":
        if language == "zh":
            return {"suggestion": "请提供一些症状或病情描述，这样我才能给您建议。"}
        else:
            return {"suggestion": "Please provide some symptoms or condition descriptions so I can give you advice."}

    # 1. 设置您的 API Key 和 Base URL
    api_key = os.getenv("DASHSCOPE_API_KEY")
    base_url = (
        "https://dashscope.aliyuncs.com/compatible-mode/v1"  # 通义千问的OpenAI兼容端点
    )

    try:
        # 2. 初始化 OpenAI 客户端
        client = OpenAI(api_key=api_key, base_url=base_url)

        # 3. 构建系统提示词,包含用户信息
        if language == "zh":
            system_content = """你是一位专业且富有同情心的老年人健康顾问。始终用中文回复。不要使用不属于正常对话的符号。回复要更加口语化和简单。根据用户描述的症状或病情，为老年人提供一般性的、安全的、易于理解的健康建议。你的建议应涵盖饮食、休息、适度活动以及何时就医。重要提示：你的建议不能替代专业医疗诊断。在回复的最后，你必须包含这句话：'重要提示：以上建议仅供参考，不能替代专业医疗诊断。如果身体持续不适，请务必咨询医生。'

当用户提到想要设置服药提醒，或者请你帮助他们记住在特定时间吃药时，使用add_medication_reminder函数为他们添加提醒。从对话中提取药物名称、时间、剂量和备注。"""
        else:
            system_content = """You are a professional and compassionate health advisor for elderly people. Always respond in English. Do not use signals that not belongs to normal conversation. Respond more oral and simpler. Based on the symptoms or conditions described by the user, provide general, safe, and easy-to-understand health advice for seniors. Your suggestions should cover diet, rest, moderate activity, and when to see a doctor. Important: Your advice cannot replace professional medical diagnosis. At the end of your response, you must include this statement: 'Important Note: The above advice is for reference only and cannot replace professional medical diagnosis. If you continue to feel unwell, please consult a doctor.'

When the user mentions wanting to set up medication reminders, or asks you to help them remember to take medicine at a specific time, use the add_medication_reminder function to add the reminder for them. Extract the medication name, time, dosage, and any notes from the conversation."""

        # 如果有用户信息,添加到系统提示词
        if user_profile:
            system_content += user_profile

        # 构建消息
        if language == "zh":
            user_content = f"我有以下症状或病情：{disease_text}。请给我提供健康建议。"
        else:
            user_content = f"I have the following symptoms or condition: {disease_text}. Please provide me with health advice."
        
        messages = [
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_content},
        ]

        # 4. 调用 API (支持 Function Calling)
        print(f"接收到前端内容: '{disease_text}'，正在调用API...")
        if user_profile:
            print(f"用户信息: {user_profile[:100]}...")  # 打印部分用户信息
        response = client.chat.completions.create(
            model="qwen-max",  # 使用 qwen-max 模型
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
            temperature=0.7,
            max_tokens=3000,
        )

        # 5. 检查是否有函数调用
        response_message = response.choices[0].message

        # 如果有 tool_calls,处理函数调用
        if response_message.tool_calls:
            tool_call = response_message.tool_calls[0]
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            print(f"医生API函数调用: {function_name}, 参数: {function_args}")

            # 返回函数调用信息
            if language == "zh":
                default_suggestion = f"好的！我会帮你设置{function_args.get('medication_name', '药物')}的提醒，时间是{function_args.get('time', '指定时间')}。根据你的症状，记得按时服用这种药物。✓"
            else:
                default_suggestion = f"Sure! I'll help you set up a reminder for {function_args.get('medication_name', 'your medication')} at {function_args.get('time', 'the specified time')}. Based on your symptoms, remember to take this medication as prescribed. ✓"
            
            return {
                "suggestion": response_message.content or default_suggestion,
                "function_call": {"name": function_name, "arguments": function_args},
            }
        else:
            # 普通回复
            suggestion = response_message.content
            print("医生API调用成功!")
            return {"suggestion": suggestion}

    except Exception as e:
        print(f"医生API调用失败: {e}")
        import traceback
        traceback.print_exc()
        if language == "zh":
            return {"suggestion": f"抱歉，调用AI服务时出现错误：{str(e)}。请稍后再试。"}
        else:
            return {"suggestion": f"Sorry, an error occurred while calling the AI service: {str(e)}. Please try again later."}


@app.route("/")
def index():
    """渲染主页"""
    return render_template("index.html")


@app.route("/get_suggestion", methods=["POST"])
def get_suggestion():
    """接收前端请求并返回模型生成的建议，支持 Function Calling"""
    try:
        data = request.get_json()
        disease_text = data.get("disease", "")
        user_profile = data.get("userProfile", "")
        language = data.get("language", "en")  # 获取语言参数，默认英文

        # 调用AI模型API (返回字典格式,可能包含函数调用)
        result = call_qwen_max_api(disease_text, user_profile, language)

        # 提取建议文本
        suggestion = result.get("suggestion", "")

        # 生成语音
        audio_url = text_to_speech(suggestion)
        print(f"返回的音频URL: {audio_url}")  # 调试信息

        # 准备响应
        response_data = {"suggestion": suggestion, "audio_url": audio_url}

        # 如果有函数调用,添加到响应中
        if "function_call" in result:
            response_data["function_call"] = result["function_call"]
            print(f"医生API返回函数调用: {result['function_call']}")

        return jsonify(response_data)
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return (
            jsonify({"suggestion": "Server error occurred. Please try again later."}),
            500,
        )


@app.route("/chat", methods=["POST"])
def chat():
    """处理聊天请求，提供友好的陪伴式对话，支持 Function Calling"""
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        user_profile = data.get("userProfile", "")
        language = data.get("language", "en")  # 获取语言参数，默认英文

        if not user_message or user_message.strip() == "":
            if language == "zh":
                return jsonify({"reply": "你想聊些什么呢？"})
            else:
                return jsonify({"reply": "What would you like to talk about?"})

        # 调用聊天API (返回字典格式,可能包含函数调用)
        result = call_chat_api(user_message, user_profile, language)

        # 提取回复文本
        reply = result.get("reply", "")

        # 生成语音
        audio_url = text_to_speech(reply)
        print(f"聊天返回的音频URL: {audio_url}")

        # 准备响应
        response_data = {"reply": reply, "audio_url": audio_url}

        # 如果有函数调用,添加到响应中
        if "function_call" in result:
            response_data["function_call"] = result["function_call"]
            print(f"返回函数调用: {result['function_call']}")

        return jsonify(response_data)

    except Exception as e:
        print(f"Chat Error: {e}")
        import traceback

        traceback.print_exc()
        return (
            jsonify(
                {"reply": "Sorry, I'm not feeling well right now. Can we chat later?"}
            ),
            500,
        )


@app.route("/profile_guide", methods=["POST"])
def profile_guide():
    """处理引导机器人请求，通过对话方式收集用户信息"""
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        step = data.get("step", 1)
        collected_data = data.get("collectedData", {})
        language = data.get("language", "en")  # 获取语言参数

        if not user_message or user_message.strip() == "":
            if language == "zh":
                return jsonify({"reply": "我没听清。你能再说一遍吗？"})
            else:
                return jsonify({"reply": "I didn't catch that. Could you tell me again?"})

        # 根据步骤生成引导问题
        guide_prompts = {
            1: "your name",
            2: "your age",
            3: "your gender (Male/Female/Other)",
            4: "any existing health conditions you have",
            5: "any allergies you have",
            6: "any medications you're currently taking",
            7: "confirmation"
        }

        # 使用AI来解析用户回答
        api_key = os.getenv("DASHSCOPE_API_KEY")
        base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
        client = OpenAI(api_key=api_key, base_url=base_url)

        # 构建系统提示词
        if step == 7:
            # 确认步骤 - 不再调用AI，直接在前端生成总结以加快速度
            if language == "zh":
                summary = f"""太好了！我已经收集了您的所有信息。让我展示一下我们有什么：

📋 <strong>档案摘要：</strong>
• 姓名：{collected_data.get('name', '未提供')}
• 年龄：{collected_data.get('age', '未提供')}
• 性别：{collected_data.get('gender', '未提供')}
• 健康状况：{collected_data.get('conditions', '无')}
• 过敏史：{collected_data.get('allergies', '无')}
• 当前用药：{collected_data.get('medications', '无')}

这样看起来对吗？如果一切正常，您现在可以保存您的档案了！"""
            else:
                summary = f"""Great! I've collected all your information. Let me show you what we have:

📋 <strong>Profile Summary:</strong>
• Name: {collected_data.get('name', 'Not provided')}
• Age: {collected_data.get('age', 'Not provided')}
• Gender: {collected_data.get('gender', 'Not provided')}
• Health Conditions: {collected_data.get('conditions', 'None')}
• Allergies: {collected_data.get('allergies', 'None')}
• Current Medications: {collected_data.get('medications', 'None')}

Does this look correct? If everything looks good, you can save your profile now!"""
            
            return jsonify({
                "reply": summary,
                "step": 7,
                "readyToSave": True
            })
        else:
            # 信息收集步骤
            if language == "zh":
                field_instructions = {
                    1: "从用户的回复中提取姓名。要灵活——接受名字、全名或昵称。只返回姓名，不要其他内容。",
                    2: "从用户回复中提取年龄数字。如果他们说'六十五岁'，转换为'65'。只返回数字，不要其他内容。",
                    3: "提取用户的性别。接受'男'、'男性'为Male，'女'、'女性'为Female。只返回一个词：Male、Female或Other。",
                    4: "提取健康状况。老年人常见的有：糖尿病、高血压、关节炎、心脏病。如果说'没有'或'健康'，返回'无'。要全面但简洁。",
                    5: "提取过敏史。常见的有：药物过敏（青霉素）、食物过敏（花生、海鲜）、环境过敏（花粉）。如果说'没有'，返回'无'。",
                    6: "提取药物名称。老年人常用药物：二甲双胍、赖诺普利、阿司匹林、阿托伐他汀。如果说'没有'，返回'无'。用逗号分隔列出。"
                }
                system_content = f"""你正在从用户回复中提取信息。{field_instructions.get(step, '')}

用户的回复："{user_message}"

只提取并返回请求的信息，格式要恰当。要理解老年人表达信息的各种方式。"""
            else:
                field_instructions = {
                    1: "Extract the person's name from their response. Be flexible - accept first name, full name, or nickname. Return ONLY the name, nothing else.",
                    2: "Extract the person's age as a number. If they say 'sixty five' convert it to '65'. Return ONLY the number, nothing else.",
                    3: "Extract the person's gender. Accept variations like 'man/boy' as Male, 'woman/girl' as Female. Return ONLY one word: Male, Female, or Other.",
                    4: "Extract health conditions. Common ones for elderly: diabetes, high blood pressure, arthritis, heart disease. If they say 'none' or 'healthy', return 'None'. Be comprehensive but concise.",
                    5: "Extract allergies. Common ones: medications (penicillin), foods (peanuts, shellfish), environmental (pollen). If they say 'none', return 'None'.",
                    6: "Extract medication names. Common elderly medications: Metformin, Lisinopril, Aspirin, Atorvastatin. If they say 'none', return 'None'. List them separated by commas."
                }
                system_content = f"""You are extracting information from user responses. {field_instructions.get(step, '')}

User's response: "{user_message}"

Extract and return ONLY the requested information, formatted appropriately. Be understanding of various ways elderly people might express information."""
            
            messages = [
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_message}
            ]

            response = client.chat.completions.create(
                model="qwen-max",
                messages=messages,
                temperature=0.3,
                max_tokens=200,
            )

            extracted_info = response.choices[0].message.content.strip()

            # 生成下一个问题
            if language == "zh":
                next_prompts = {
                    1: f"很高兴认识你，{extracted_info}！现在，你多大年纪了？",
                    2: f"谢谢！你{extracted_info}岁了。你能告诉我你的性别吗？",
                    3: f"知道了！你有什么现有的健康状况我应该知道的吗？比如糖尿病、高血压或关节炎？",
                    4: f"谢谢分享。你有什么过敏吗？可能是对药物、食物或其他东西。",
                    5: f"了解了。你目前在服用什么药物吗？如果有的话，是哪些？",
                    6: f"完美！让我给你展示我们收集到的信息..."
                }
            else:
                next_prompts = {
                    1: f"Nice to meet you, {extracted_info}! Now, how old are you?",
                    2: f"Thank you! You're {extracted_info} years old. Could you tell me your gender?",
                    3: f"Got it! Do you have any existing health conditions I should know about? For example, diabetes, high blood pressure, or arthritis?",
                    4: f"Thanks for sharing. Do you have any allergies? This could be to medications, foods, or anything else.",
                    5: f"Good to know. Are you currently taking any medications? If so, which ones?",
                    6: f"Perfect! Let me show you what we've collected..."
                }

            next_question = next_prompts.get(step, "Thank you!" if language == "en" else "谢谢！")
            return jsonify({
                "reply": next_question,
                "extracted": extracted_info,
                "step": step
            })

    except Exception as e:
        print(f"Profile Guide Error: {e}")
        import traceback
        traceback.print_exc()
        if language == "zh":
            return jsonify({"reply": "抱歉，我理解有困难。你能再试一次吗？"}), 500
        else:
            return jsonify({"reply": "Sorry, I had trouble understanding. Could you try again?"}), 500


if __name__ == "__main__":
    # 启动 Flask 应用
    # 在生产环境中，应使用 Gunicorn 或 uWSGI 等部署
    app.run(debug=True)
