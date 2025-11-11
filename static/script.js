// ============ 翻译对象 ============
const translations = {
    en: {
        // 主页面
        title: "AI Health Assistant for Elders",
        voiceCommand: "🎤 Voice Command",
        voiceStatus: "Say \"doctor\" or \"friend\"...",
        languageToggle: "中文",
        profileBtn: "👤 My Profile",
        profileGuideBtn: "🤖 Profile Assistant",
        reminderBtn: "⏰ Medication Reminder",
        reminderStatusOn: "ON",
        reminderStatusOff: "OFF",
        doctorTitle: "Health Consultation",
        doctorDesc: "Professional health advisor",
        friendTitle: "Friendly Chat",
        friendDesc: "Emotional support companion",
        
        // 医生对话框
        doctorModalTitle: "🩺 Health Consultation",
        doctorWelcome: "Hello! I'm your health advisor. Please tell me about your symptoms or discomfort, and I'll provide you with professional health advice. 😊",
        doctorPlaceholder: "Describe your symptoms here...",
        generateBtn: "Send",
        analyzing: "Analyzing...",
        playAudio: "🔊 Play Audio",
        pauseAudio: "⏸️ Pause Audio",
        
        // 朋友聊天框
        chatModalTitle: "💬 Friendly Chat",
        chatWelcome: "Hello! I'm your AI friend. What would you like to talk about? We can chat about life, feelings, or anything you'd like to share. 😊",
        chatPlaceholder: "Type your message...",
        sendBtn: "Send",
        replying: "Replying...",
        
        // 个人信息弹窗
        profileModalTitle: "👤 My Health Profile",
        userName: "Name",
        userAge: "Age",
        userGender: "Gender",
        genderMale: "Male",
        genderFemale: "Female",
        genderOther: "Other",
        userConditions: "Existing Health Conditions",
        userAllergies: "Known Allergies",
        userMedications: "Current Medications",
        medicationScheduleTitle: "💊 Medication Schedule",
        medName: "Medication Name",
        medTime: "Time",
        medDosage: "Dosage",
        medNotes: "Notes",
        addMedicationBtn: "➕ Add Medication",
        deleteBtn: "🗑️ Delete",
        saveProfileBtn: "💾 Save Profile",
        clearProfileBtn: "🗑️ Clear All",
        profileSaveSuccess: "✓ Profile saved successfully!",
        profileClearSuccess: "✓ Profile cleared!",
        profileClearConfirm: "Are you sure you want to clear all your profile information?",
        
        // 引导机器人
        guideModalTitle: "🤖 Profile Setup Assistant",
        guideProgressText: "Step {step} of 7: {label}",
        guideStepName: "Name",
        guideStepAge: "Age",
        guideStepGender: "Gender",
        guideStepConditions: "Health Conditions",
        guideStepAllergies: "Allergies",
        guideStepMedications: "Medications",
        guideStepConfirmation: "Confirmation",
        guidePlaceholder: "Type your answer...",
        guideSendBtn: "Send",
        guideProcessing: "Processing...",
        guideSaveBtn: "💾 Save Profile",
        guideRestartBtn: "🔄 Start Over",
        guideSaveSuccess: "✓ Profile saved successfully!",
        guideInitialMessage: "Hi! I'm your profile assistant. I'll help you set up your health profile through a friendly conversation. Let's start with your name - what should I call you?",
        guideRestartMessage: "Let's start over! What's your name?",
        
        // 服药提醒
        reminderModalTitle: "⏰ Medication Reminders",
        enableRemindersBtn: "🔔 Enable Reminders",
        disableRemindersBtn: "🔕 Disable Reminders",
        reminderEmptyTitle: "No medication schedule found.",
        reminderEmptyDesc: "Please add your medications in the Profile page first.",
        reminderNoMeds: "No medications in your schedule.",
        reminderAddPrompt: "Click \"👤 My Profile\" to add medications.",
        reminderNoTime: "No time set",
        alertTitle: "💊 Medication Reminder",
        alertTaken: "✓ Taken",
        alertSnooze: "⏰ Snooze 10min",
        
        // 错误消息
        errorNetwork: "Sorry, there was a network issue. Please try again later.",
        errorVoiceNoSpeech: "No speech detected. Please try again.",
        errorVoiceDenied: "Microphone access denied. Please allow microphone access in your browser settings.",
        errorVoiceGeneric: "Voice recognition error: ",
        
        // 通知消息
        notifMedicationAdded: "✓ Medication reminder added: ",
        notifRemindersEnabled: "✓ Reminders enabled for {count} medication(s)!",
        notifRemindersDisabled: "Reminders disabled.",
        notifNoProfile: "Please add your medication schedule in Profile first.",
        notifNoMedications: "No medications found in your schedule.",
        notifNoTimes: "Please add times to your medications in Profile."
    },
    zh: {
        // 主页面
        title: "老年人AI健康助手",
        voiceCommand: "🎤 语音命令",
        voiceStatus: "说\"医生\"或\"朋友\"...",
        languageToggle: "English",
        profileBtn: "👤 我的档案",
        profileGuideBtn: "🤖 档案助手",
        reminderBtn: "⏰ 服药提醒",
        reminderStatusOn: "开启",
        reminderStatusOff: "关闭",
        doctorTitle: "健康咨询",
        doctorDesc: "专业健康顾问",
        friendTitle: "友好聊天",
        friendDesc: "情感支持伙伴",
        
        // 医生对话框
        doctorModalTitle: "🩺 健康咨询",
        doctorWelcome: "您好！我是您的健康顾问。请告诉我您的症状或不适，我会为您提供专业的健康建议。😊",
        doctorPlaceholder: "请在这里描述您的症状...",
        generateBtn: "发送",
        analyzing: "分析中...",
        playAudio: "🔊 播放语音",
        pauseAudio: "⏸️ 暂停语音",
        
        // 朋友聊天框
        chatModalTitle: "💬 友好聊天",
        chatWelcome: "您好！我是您的AI朋友。您想聊些什么呢？我们可以聊聊生活、感受，或者任何您想分享的事情。😊",
        chatPlaceholder: "输入您的消息...",
        sendBtn: "发送",
        replying: "回复中...",
        
        // 个人信息弹窗
        profileModalTitle: "👤 我的健康档案",
        userName: "姓名",
        userAge: "年龄",
        userGender: "性别",
        genderMale: "男",
        genderFemale: "女",
        genderOther: "其他",
        userConditions: "现有健康状况",
        userAllergies: "已知过敏",
        userMedications: "当前药物",
        medicationScheduleTitle: "💊 用药时间表",
        medName: "药物名称",
        medTime: "时间",
        medDosage: "剂量",
        medNotes: "备注",
        addMedicationBtn: "➕ 添加药物",
        deleteBtn: "🗑️ 删除",
        saveProfileBtn: "💾 保存档案",
        clearProfileBtn: "🗑️ 清除所有",
        profileSaveSuccess: "✓ 档案保存成功！",
        profileClearSuccess: "✓ 档案已清除！",
        profileClearConfirm: "确定要清除所有档案信息吗？",
        
        // 引导机器人
        guideModalTitle: "🤖 档案设置助手",
        guideProgressText: "第 {step} 步，共 7 步：{label}",
        guideStepName: "姓名",
        guideStepAge: "年龄",
        guideStepGender: "性别",
        guideStepConditions: "健康状况",
        guideStepAllergies: "过敏史",
        guideStepMedications: "用药情况",
        guideStepConfirmation: "确认",
        guidePlaceholder: "输入您的答案...",
        guideSendBtn: "发送",
        guideProcessing: "处理中...",
        guideSaveBtn: "💾 保存档案",
        guideRestartBtn: "🔄 重新开始",
        guideSaveSuccess: "✓ 档案保存成功！",
        guideInitialMessage: "您好！我是您的档案助手。我将通过友好的对话帮助您设置健康档案。让我们从您的姓名开始——我应该怎么称呼您？",
        guideRestartMessage: "让我们重新开始！您叫什么名字？",
        
        // 服药提醒
        reminderModalTitle: "⏰ 服药提醒",
        enableRemindersBtn: "🔔 开启提醒",
        disableRemindersBtn: "🔕 关闭提醒",
        reminderEmptyTitle: "未找到用药时间表。",
        reminderEmptyDesc: "请先在档案页面添加您的药物。",
        reminderNoMeds: "您的时间表中没有药物。",
        reminderAddPrompt: "点击\"👤 我的档案\"添加药物。",
        reminderNoTime: "未设置时间",
        alertTitle: "💊 服药提醒",
        alertTaken: "✓ 已服用",
        alertSnooze: "⏰ 延迟10分钟",
        
        // 错误消息
        errorNetwork: "抱歉，网络出现问题。请稍后再试。",
        errorVoiceNoSpeech: "未检测到语音。请重试。",
        errorVoiceDenied: "麦克风访问被拒绝。请在浏览器设置中允许麦克风访问。",
        errorVoiceGeneric: "语音识别错误：",
        
        // 通知消息
        notifMedicationAdded: "✓ 已添加服药提醒：",
        notifRemindersEnabled: "✓ 已为 {count} 种药物启用提醒！",
        notifRemindersDisabled: "提醒已关闭。",
        notifNoProfile: "请先在档案中添加您的用药时间表。",
        notifNoMedications: "您的时间表中未找到药物。",
        notifNoTimes: "请在档案中为您的药物添加时间。"
    }
};

// 当前语言
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// 翻译函数
function translate(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

// 替换占位符
function translateWithParams(key, params) {
    let text = translate(key);
    for (const [param, value] of Object.entries(params)) {
        text = text.replace(`{${param}}`, value);
    }
    return text;
}

// 切换语言
function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    localStorage.setItem('preferredLanguage', currentLanguage);
    updateUILanguage();
}

// 更新整个UI的语言
function updateUILanguage() {
    // 更新所有带data-lang属性的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.type === 'text' || element.type === 'number' || element.tagName === 'TEXTAREA') {
                element.placeholder = translate(key);
            }
        } else if (element.tagName === 'OPTION') {
            element.textContent = translate(key);
        } else {
            // 保留HTML标签，只替换文本
            const htmlContent = element.innerHTML;
            if (htmlContent.includes('<')) {
                // 如果包含HTML标签，只替换文本节点
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                if (tempDiv.childNodes.length === 1 && tempDiv.childNodes[0].nodeType === Node.TEXT_NODE) {
                    element.textContent = translate(key);
                } else {
                    // 复杂情况：尝试智能替换
                    const firstTextNode = Array.from(tempDiv.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
                    if (firstTextNode) {
                        firstTextNode.textContent = translate(key);
                        element.innerHTML = tempDiv.innerHTML;
                    }
                }
            } else {
                element.textContent = translate(key);
            }
        }
    });
    
    // 更新语言切换按钮
    const languageText = document.getElementById('language-text');
    if (languageText) {
        languageText.textContent = translate('languageToggle');
    }
    
    // 更新初始欢迎消息
    const doctorInitialMsg = document.getElementById('doctor-initial-message');
    if (doctorInitialMsg) {
        doctorInitialMsg.textContent = translate('doctorWelcome');
    }
    
    const chatInitialMsg = document.getElementById('chat-initial-message');
    if (chatInitialMsg) {
        chatInitialMsg.textContent = translate('chatWelcome');
    }
    
    // 更新页面标题
    document.title = translate('title');
}

document.addEventListener('DOMContentLoaded', () => {

    // 初始化语言
    updateUILanguage();
    
    // 绑定语言切换按钮
    const languageToggleBtn = document.getElementById('language-toggle-btn');
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', switchLanguage);
    }

    // ============ 实时音频播放器 (真·流式播放版) ============
    
    class RealtimeAudioPlayer {
        constructor() {
            this.audioContext = null;
            this.isPlaying = false;
            this.playQueue = [];
            this.currentTime = 0;
        }
        
        async init() {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
        }
        
        // 将 PCM 数据转换为 WAV 格式
        pcmToWav(pcmData, sampleRate = 22050, numChannels = 1, bitsPerSample = 16) {
            const dataLength = pcmData.length;
            const buffer = new ArrayBuffer(44 + dataLength);
            const view = new DataView(buffer);
            
            const writeString = (offset, string) => {
                for (let i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            };
            
            writeString(0, 'RIFF');
            view.setUint32(4, 36 + dataLength, true);
            writeString(8, 'WAVE');
            writeString(12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, numChannels, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * numChannels * bitsPerSample / 8, true);
            view.setUint16(32, numChannels * bitsPerSample / 8, true);
            view.setUint16(34, bitsPerSample, true);
            writeString(36, 'data');
            view.setUint32(40, dataLength, true);
            
            const pcmView = new Uint8Array(buffer, 44);
            pcmView.set(pcmData);
            
            return buffer;
        }

        // 回退：向服务器请求一次性 WAV 并播放
        async playWavFromServer(text) {
            await this.init();
            try {
                const resp = await fetch('/tts_once', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({text})
                });
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                if (!data || !data.wav_base64) throw new Error('No WAV data');

                const byteString = atob(data.wav_base64);
                const bytes = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) bytes[i] = byteString.charCodeAt(i);
                const wavBuffer = bytes.buffer;

                const audioBuffer = await this.audioContext.decodeAudioData(wavBuffer);
                const source = this.audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.audioContext.destination);
                await new Promise((resolve) => {
                    source.onended = resolve;
                    source.start();
                });
                console.log('✅ [一次性播放] 完成');
            } catch (e) {
                console.error('❌ [一次性播放] 失败:', e);
            }
        }
        
        // SSE 流式播放: 缓冲后再播放 (避免破音)
        async streamFromSSE(text) {
            await this.init();
            
            this.isPlaying = true;
            this.currentTime = this.audioContext.currentTime;
            this.playQueue = [];
            
            // 缓冲配置
            const BUFFER_SIZE = 5; // 缓冲前5个音频块
            let chunkBuffer = [];
            let hasStartedPlaying = false;
            
            console.log('🎵 [SSE流式播放] 开始接收音频流');
            
            return new Promise((resolve, reject) => {
                // 创建 EventSource 连接
                fetch('/stream_audio', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({text: text})
                }).then(response => {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';
                    
                    const processChunk = async ({done, value}) => {
                        if (done) {
                            console.log('✅ [SSE] 流式接收完成');
                            
                            // 播放缓冲区剩余的音频块
                            if (chunkBuffer.length > 0) {
                                console.log(`🎵 [缓冲] 批量调度剩余 ${chunkBuffer.length} 个音频块`);
                                const playPromises = chunkBuffer.map(bufferedChunk => 
                                    this.playChunkImmediately(bufferedChunk.chunk, bufferedChunk.index)
                                );
                                await Promise.all(playPromises);
                            }
                            
                            // 等待播放完成
                            const totalDuration = this.currentTime - this.audioContext.currentTime;
                            setTimeout(() => {
                                this.isPlaying = false;
                                this.playQueue = [];
                                resolve();
                            }, totalDuration * 1000 + 100);
                            return;
                        }
                        
                        buffer += decoder.decode(value, {stream: true});
                        const lines = buffer.split('\n\n');
                        buffer = lines.pop(); // 保留不完整的行
                        
                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                try {
                                    const data = JSON.parse(line.substring(6));
                                    
                                    if (data.error) {
                                        console.error('❌ [SSE] 服务器错误:', data.error);
                                        reject(new Error(data.error));
                                        return;
                                    }
                                    
                                    if (data.done) {
                                        console.log(`✅ [SSE] 接收完成: ${data.total || 0} 个音频块`);
                                        continue;
                                    }
                                    
                                    if (data.chunk) {
                                        // 缓冲策略
                                        if (!hasStartedPlaying) {
                                            // 缓冲阶段: 收集音频块
                                            chunkBuffer.push({chunk: data.chunk, index: data.index});
                                            console.log(`📦 [缓冲] 收集音频块 ${data.index} (${chunkBuffer.length}/${BUFFER_SIZE})`);
                                            
                                            // 达到缓冲大小后开始播放
                                            if (chunkBuffer.length >= BUFFER_SIZE) {
                                                hasStartedPlaying = true;
                                                console.log(`🎬 [缓冲] 缓冲完成，批量调度 ${chunkBuffer.length} 个音频块`);
                                                
                                                // 批量调度缓冲的音频块 (不用 await,让它们并行解码)
                                                const playPromises = chunkBuffer.map(bufferedChunk => 
                                                    this.playChunkImmediately(bufferedChunk.chunk, bufferedChunk.index)
                                                );
                                                
                                                // 等待所有块解码完成
                                                await Promise.all(playPromises);
                                                
                                                chunkBuffer = []; // 清空缓冲区
                                                console.log(`✅ [缓冲] 所有缓冲块已调度完成`);
                                            }
                                        } else {
                                            // 播放阶段: 立即播放新收到的块
                                            await this.playChunkImmediately(data.chunk, data.index);
                                        }
                                    }
                                } catch (e) {
                                    console.error('❌ [SSE] 解析数据失败:', e);
                                }
                            }
                        }
                        
                        // 继续读取
                        reader.read().then(processChunk).catch(reject);
                    };
                    
                    reader.read().then(processChunk).catch(reject);
                    
                }).catch(error => {
                    console.error('❌ [SSE] 连接失败:', error);
                    this.isPlaying = false;
                    reject(error);
                });
            });
        }
        
        // 立即播放单个音频块 (使用精确时间调度)
        async playChunkImmediately(base64Chunk, index) {
            try {
                // Base64 解码
                const binaryString = atob(base64Chunk);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                
                // 转换为 WAV
                const wavBuffer = this.pcmToWav(bytes, 22050, 1, 16);
                
                // 解码音频
                const audioBuffer = await this.audioContext.decodeAudioData(wavBuffer);
                
                // 如果是第一个块,设置起始时间 (留一点缓冲)
                if (this.playQueue.length === 0) {
                    this.currentTime = this.audioContext.currentTime + 0.1; // 100ms 缓冲
                    console.log(`🎬 [SSE播放] 初始化播放时间: ${this.currentTime.toFixed(3)}s`);
                }
                
                // 创建音源并调度播放
                const source = this.audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.audioContext.destination);
                
                // 在精确的时间点开始播放
                const startTime = Math.max(this.currentTime, this.audioContext.currentTime);
                source.start(startTime);
                
                // 更新下一个块的播放时间
                this.currentTime = startTime + audioBuffer.duration;
                
                this.playQueue.push(source);
                
                console.log(`▶️ [SSE播放] 块 ${index} 已调度, 开始: ${startTime.toFixed(3)}s, 时长: ${audioBuffer.duration.toFixed(2)}s`);
                
            } catch (error) {
                console.error(`❌ [SSE播放] 块 ${index} 播放失败:`, error);
            }
        }
        
        // 兼容旧方法 (暂时不使用)
        async playChunks(base64Chunks) {
            console.warn('[警告] 使用了旧的批量播放方法,建议使用 streamFromSSE');
            // 可以保留兼容性实现
        }
        
        stop() {
            if (this.playQueue.length > 0) {
                try {
                    for (const source of this.playQueue) {
                        source.stop();
                        source.disconnect();
                    }
                } catch (e) {
                    console.log('Stop error:', e);
                }
                this.playQueue = [];
            }
            this.isPlaying = false;
            this.currentTime = 0;
        }
    }
    
    // 创建全局实时播放器
    const realtimePlayer = new RealtimeAudioPlayer();
    
    // 兼容旧版播放器（用于静态音频文件）
    let currentAudio = null;
    let currentAudioBtn = null;

    // 停止当前音频播放
    function stopAudio() {
        // 停止实时播放器
        realtimePlayer.stop();
        
        // 停止传统播放器
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        if (currentAudioBtn) {
            currentAudioBtn.innerHTML = '🔊 Play Audio';
            currentAudioBtn.classList.remove('playing');
            currentAudioBtn = null;
        }
    }

    // 播放音频函数（支持暂停/继续）- 传统方式
    function toggleAudio(audioUrl, buttonElement) {
        // 如果点击的是同一个按钮
        if (currentAudioBtn === buttonElement && currentAudio && !currentAudio.paused) {
            // 暂停播放
            currentAudio.pause();
            buttonElement.innerHTML = '🔊 Play Audio';
            buttonElement.classList.remove('playing');
            return;
        }

        // 停止之前的音频
        stopAudio();

        // 创建新的音频对象并播放
        currentAudio = new Audio(audioUrl);
        currentAudioBtn = buttonElement;
        
        if (buttonElement) {
            buttonElement.innerHTML = '⏸️ Pause Audio';
            buttonElement.classList.add('playing');
        }

        currentAudio.play().catch(error => {
            console.error("Audio playback failed:", error);
            if (buttonElement) {
                buttonElement.innerHTML = '🔊 Play Audio';
                buttonElement.classList.remove('playing');
            }
        });

        // 播放结束后更新按钮状态
        currentAudio.onended = () => {
            if (buttonElement) {
                buttonElement.innerHTML = '🔊 Play Audio';
                buttonElement.classList.remove('playing');
            }
            currentAudio = null;
            currentAudioBtn = null;
        };
    }

    // 简单播放函数（用于悬浮介绍）
    function playAudio(audioUrl) {
        stopAudio();
        currentAudio = new Audio(audioUrl);
        currentAudio.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
    }

    // 获取DOM元素 - 健康建议模块
    const modal = document.getElementById('suggestion-modal');
    const doctorWrapper = document.getElementById('doctor-wrapper');
    const closeBtn = document.querySelector('.close-btn');
    const generateBtn = document.getElementById('generate-btn');
    const diseaseInput = document.getElementById('disease-input');
    const suggestionMessages = document.getElementById('suggestion-messages');

    // 获取DOM元素 - 聊天模块
    const chatModal = document.getElementById('chat-modal');
    const friendWrapper = document.getElementById('friend-wrapper');
    const chatCloseBtn = document.querySelector('.chat-close-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // 获取DOM元素 - 语音命令
    const voiceCommandBtn = document.getElementById('voice-command-btn');
    const voiceStatus = document.getElementById('voice-status');

    // 获取DOM元素 - 个人信息
    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const profileCloseBtn = document.querySelector('.profile-close-btn');
    const profileForm = document.getElementById('profile-form');
    const profileStatus = document.getElementById('profile-status');

    // ============ 个人信息管理 ============
    
    // 药物时间表数据
    let medicationSchedule = [];
    
    // 添加药物记录行
    function addMedicationRow(medication = {}) {
        const tbody = document.getElementById('medication-tbody');
        const row = tbody.insertRow();
        const id = medication.id || Date.now();
        
        row.setAttribute('data-id', id);
        row.innerHTML = `
            <td><input type="text" class="med-name" value="${medication.name || ''}" placeholder="e.g., Metformin"></td>
            <td><input type="time" class="med-time" value="${medication.time || ''}"></td>
            <td><input type="text" class="med-dosage" value="${medication.dosage || ''}" placeholder="e.g., 500mg"></td>
            <td><input type="text" class="med-notes" value="${medication.notes || ''}" placeholder="e.g., After meal"></td>
            <td><button type="button" class="delete-medication-btn" onclick="deleteMedicationRow(this)">🗑️ Delete</button></td>
        `;
    }
    
    // 删除药物记录行
    window.deleteMedicationRow = function(button) {
        const row = button.closest('tr');
        row.remove();
    };
    
    // 获取表格中的所有药物数据
    function getMedicationScheduleData() {
        const tbody = document.getElementById('medication-tbody');
        const rows = tbody.querySelectorAll('tr');
        const schedule = [];
        
        rows.forEach(row => {
            const id = row.getAttribute('data-id');
            const name = row.querySelector('.med-name').value.trim();
            const time = row.querySelector('.med-time').value;
            const dosage = row.querySelector('.med-dosage').value.trim();
            const notes = row.querySelector('.med-notes').value.trim();
            
            if (name || time || dosage || notes) {
                schedule.push({ id, name, time, dosage, notes });
            }
        });
        
        return schedule;
    }
    
    // 加载药物时间表
    function loadMedicationSchedule(schedule) {
        const tbody = document.getElementById('medication-tbody');
        tbody.innerHTML = ''; // 清空现有行
        
        if (schedule && schedule.length > 0) {
            schedule.forEach(med => addMedicationRow(med));
        }
    }
    
    // 添加药物按钮事件
    document.getElementById('add-medication-btn').addEventListener('click', () => {
        addMedicationRow();
    });
    
    // 加载已保存的个人信息
    function loadUserProfile() {
        const profile = localStorage.getItem('userProfile');
        if (profile) {
            const data = JSON.parse(profile);
            document.getElementById('user-name').value = data.name || '';
            document.getElementById('user-age').value = data.age || '';
            document.getElementById('user-gender').value = data.gender || '';
            document.getElementById('user-conditions').value = data.conditions || '';
            document.getElementById('user-allergies').value = data.allergies || '';
            document.getElementById('user-medications').value = data.medications || '';
            
            // 加载药物时间表
            if (data.medicationSchedule) {
                loadMedicationSchedule(data.medicationSchedule);
            }
        }
    }

    // 获取用户信息作为 system prompt 的一部分
    function getUserProfileContext() {
        const profile = localStorage.getItem('userProfile');
        if (!profile) return '';
        
        const data = JSON.parse(profile);
        let context = '\n\nUser Profile Information:\n';
        
        if (data.name) context += `- Name: ${data.name}\n`;
        if (data.age) context += `- Age: ${data.age} years old\n`;
        if (data.gender) context += `- Gender: ${data.gender}\n`;
        if (data.conditions) context += `- Existing Health Conditions: ${data.conditions}\n`;
        if (data.allergies) context += `- Allergies: ${data.allergies}\n`;
        if (data.medications) context += `- Current Medications: ${data.medications}\n`;
        
        // 添加药物时间表信息
        if (data.medicationSchedule && data.medicationSchedule.length > 0) {
            context += '- Medication Schedule:\n';
            data.medicationSchedule.forEach(med => {
                if (med.name) {
                    let scheduleInfo = `  • ${med.name}`;
                    if (med.time) scheduleInfo += ` at ${med.time}`;
                    if (med.dosage) scheduleInfo += ` (${med.dosage})`;
                    if (med.notes) scheduleInfo += ` - ${med.notes}`;
                    context += scheduleInfo + '\n';
                }
            });
        }
        
        context += '\nPlease consider this information when providing advice.';
        return context;
    }

    // 打开个人信息弹窗
    profileBtn.onclick = () => {
        loadUserProfile();
        profileModal.style.display = 'flex';
    };

    // 关闭个人信息弹窗
    profileCloseBtn.onclick = () => {
        profileModal.style.display = 'none';
        profileStatus.style.display = 'none';
    };

    // 保存个人信息
    profileForm.onsubmit = (e) => {
        e.preventDefault();
        
        const profileData = {
            name: document.getElementById('user-name').value.trim(),
            age: document.getElementById('user-age').value.trim(),
            gender: document.getElementById('user-gender').value,
            conditions: document.getElementById('user-conditions').value.trim(),
            allergies: document.getElementById('user-allergies').value.trim(),
            medications: document.getElementById('user-medications').value.trim(),
            medicationSchedule: getMedicationScheduleData() // 保存药物时间表
        };
        
        // 保存到 localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // 显示成功消息
        profileStatus.textContent = '✓ Profile saved successfully!';
        profileStatus.className = 'profile-status success';
        profileStatus.style.display = 'block';
        
        // 3秒后关闭弹窗
        setTimeout(() => {
            profileModal.style.display = 'none';
            profileStatus.style.display = 'none';
        }, 2000);
    };

    // 清除个人信息
    document.querySelector('.clear-profile-btn').onclick = () => {
        if (confirm('Are you sure you want to clear all your profile information?')) {
            localStorage.removeItem('userProfile');
            document.getElementById('user-name').value = '';
            document.getElementById('user-age').value = '';
            document.getElementById('user-gender').value = '';
            document.getElementById('user-conditions').value = '';
            document.getElementById('user-allergies').value = '';
            document.getElementById('user-medications').value = '';
            
            // 清空药物时间表
            document.getElementById('medication-tbody').innerHTML = '';
            
            profileStatus.textContent = '✓ Profile cleared!';
            profileStatus.className = 'profile-status success';
            profileStatus.style.display = 'block';
            
            setTimeout(() => {
                profileStatus.style.display = 'none';
            }, 2000);
        }
    };

    // 点击弹窗外部关闭
    window.addEventListener('click', (event) => {
        if (event.target == profileModal) {
            profileModal.style.display = 'none';
            profileStatus.style.display = 'none';
        }
    });

    // ============ 引导机器人功能 ============
    
    const profileGuideBtn = document.getElementById('profile-guide-btn');
    const profileGuideModal = document.getElementById('profile-guide-modal');
    const profileGuideCloseBtn = document.querySelector('.profile-guide-close-btn');
    const guideMessages = document.getElementById('guide-messages');
    const guideInput = document.getElementById('guide-input');
    const guideSendBtn = document.getElementById('guide-send-btn');
    const guideVoiceBtn = document.getElementById('guide-voice-btn');
    const guideProgressFill = document.getElementById('guide-progress-fill');
    const guideProgressText = document.getElementById('guide-progress-text');
    
    let currentStep = 1;
    let collectedData = {
        name: '',
        age: '',
        gender: '',
        conditions: '',
        allergies: '',
        medications: ''
    };
    
    const stepLabels = {
        1: 'Name',
        2: 'Age',
        3: 'Gender',
        4: 'Health Conditions',
        5: 'Allergies',
        6: 'Medications',
        7: 'Confirmation'
    };
    
    // 打开引导机器人
    profileGuideBtn.onclick = () => {
        currentStep = 1;
        collectedData = { name: '', age: '', gender: '', conditions: '', allergies: '', medications: '' };
        const initialMessage = translate('guideInitialMessage');
        guideMessages.innerHTML = `
            <div class="chat-message ai-message">
                <p>${initialMessage}</p>
            </div>
        `;
        updateGuideProgress();
        profileGuideModal.style.display = 'flex';
    };
    
    // 关闭引导机器人
    profileGuideCloseBtn.onclick = () => {
        stopAudio();
        profileGuideModal.style.display = 'none';
    };
    
    // 点击外部关闭
    window.addEventListener('click', (event) => {
        if (event.target == profileGuideModal) {
            stopAudio();
            profileGuideModal.style.display = 'none';
        }
    });
    
    // 更新进度条
    function updateGuideProgress() {
        const progress = (currentStep / 7) * 100;
        guideProgressFill.style.width = progress + '%';
        
        // 步骤标签映射
        const stepLabelKeys = {
            1: 'guideStepName',
            2: 'guideStepAge',
            3: 'guideStepGender',
            4: 'guideStepConditions',
            5: 'guideStepAllergies',
            6: 'guideStepMedications',
            7: 'guideStepConfirmation'
        };
        
        const stepLabel = translate(stepLabelKeys[currentStep]);
        
        if (currentLanguage === 'zh') {
            guideProgressText.textContent = `第 ${currentStep} 步，共 7 步：${stepLabel}`;
        } else {
            guideProgressText.textContent = `Step ${currentStep} of 7: ${stepLabel}`;
        }
    }
    
    // 发送引导消息
    const sendGuideMessage = async () => {
        const messageText = guideInput.value.trim();
        
        if (!messageText) return;
        
        // 添加用户消息
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user-message';
        userMessageDiv.innerHTML = `<p>${messageText}</p>`;
        guideMessages.appendChild(userMessageDiv);
        
        // 清空输入框
        guideInput.value = '';
        
        // 滚动到底部
        guideMessages.scrollTop = guideMessages.scrollHeight;
        
        // 禁用发送按钮
        guideSendBtn.disabled = true;
        guideSendBtn.textContent = translate('guideProcessing');
        
        try {
            const response = await fetch('/profile_guide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: messageText,
                    step: currentStep,
                    collectedData: collectedData,
                    language: currentLanguage  // 发送当前语言设置
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 保存提取的信息
            if (data.extracted && currentStep < 7) {
                const fieldMap = {
                    1: 'name',
                    2: 'age',
                    3: 'gender',
                    4: 'conditions',
                    5: 'allergies',
                    6: 'medications'
                };
                collectedData[fieldMap[currentStep]] = data.extracted;
                
                // 显示系统消息
                const systemMessageDiv = document.createElement('div');
                systemMessageDiv.className = 'chat-message system-message';
                systemMessageDiv.innerHTML = `<p>✓ Saved: ${stepLabels[currentStep]} = "${data.extracted}"</p>`;
                guideMessages.appendChild(systemMessageDiv);
            }
            
            // 添加AI回复
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'chat-message ai-message';
            aiMessageDiv.innerHTML = `<p>${data.reply}</p>`;
            guideMessages.appendChild(aiMessageDiv);
            
            // 生成语音（可选）
            // 这里可以调用TTS如果需要
            
            // 更新步骤
            if (currentStep < 7 && !data.readyToSave) {
                currentStep++;
                updateGuideProgress();
                
                // 如果刚完成步骤6，自动显示总结（无需等待API）
                if (currentStep === 7) {
                    setTimeout(() => {
                        showProfileSummary();
                    }, 500);  // 短暂延迟，让用户看到步骤6的确认
                }
            } else if (data.readyToSave) {
                // 直接显示保存按钮（这是从步骤7返回的情况）
                showSaveButtons();
            }
            
            // 滚动到底部
            guideMessages.scrollTop = guideMessages.scrollHeight;
            
        } catch (error) {
            console.error('Guide Error:', error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message ai-message';
            errorMessageDiv.innerHTML = '<p style="color: #d32f2f;">Sorry, I had trouble processing that. Could you try again?</p>';
            guideMessages.appendChild(errorMessageDiv);
            guideMessages.scrollTop = guideMessages.scrollHeight;
        } finally {
            guideSendBtn.disabled = false;
            guideSendBtn.textContent = translate('guideSendBtn');
        }
    };
    
    // 显示个人信息总结
    function showProfileSummary() {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'chat-message ai-message';
        summaryDiv.innerHTML = `
            <p style="font-size: 1.15rem; margin-bottom: 15px;"><strong>🎉 Great! I've collected all your information.</strong></p>
            <div class="profile-summary-box">
                <p style="margin: 5px 0; font-size: 1.05rem;"><strong>📋 Profile Summary:</strong></p>
                <hr style="border: none; border-top: 2px solid #e1bee7; margin: 10px 0;">
                <p style="margin: 8px 0; padding-left: 10px;">👤 <strong>Name:</strong> ${collectedData.name || '<em>Not provided</em>'}</p>
                <p style="margin: 8px 0; padding-left: 10px;">🎂 <strong>Age:</strong> ${collectedData.age || '<em>Not provided</em>'}</p>
                <p style="margin: 8px 0; padding-left: 10px;">⚧️ <strong>Gender:</strong> ${collectedData.gender || '<em>Not provided</em>'}</p>
                <p style="margin: 8px 0; padding-left: 10px;">🏥 <strong>Health Conditions:</strong> ${collectedData.conditions || '<em>None</em>'}</p>
                <p style="margin: 8px 0; padding-left: 10px;">⚠️ <strong>Allergies:</strong> ${collectedData.allergies || '<em>None</em>'}</p>
                <p style="margin: 8px 0; padding-left: 10px;">💊 <strong>Current Medications:</strong> ${collectedData.medications || '<em>None</em>'}</p>
            </div>
            <p style="margin-top: 15px; font-size: 1.05rem;">✨ Does this look correct?</p>
        `;
        guideMessages.appendChild(summaryDiv);
        guideMessages.scrollTop = guideMessages.scrollHeight;
        
        // 显示保存按钮
        showSaveButtons();
    }
    
    // 显示保存按钮
    function showSaveButtons() {
        const saveDiv = document.createElement('div');
        saveDiv.className = 'chat-message system-message';
        saveDiv.innerHTML = `
            <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>💫 Ready to save your profile?</strong></p>
            <div class="guide-button-group">
                <button onclick="saveGuidedProfile()" class="save-profile-btn">💾 Save Profile</button>
                <button onclick="restartGuide()" class="clear-profile-btn">🔄 Start Over</button>
            </div>
        `;
        guideMessages.appendChild(saveDiv);
        guideMessages.scrollTop = guideMessages.scrollHeight;
    }
    
    // 保存引导收集的数据
    window.saveGuidedProfile = function() {
        const profileData = {
            name: collectedData.name,
            age: collectedData.age,
            gender: collectedData.gender,
            conditions: collectedData.conditions,
            allergies: collectedData.allergies,
            medications: collectedData.medications,
            medicationSchedule: []
        };
        
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // 显示成功消息
        const successDiv = document.createElement('div');
        successDiv.className = 'chat-message system-message';
        successDiv.innerHTML = '<p style="color: #2e7d32;"><strong>✓ Profile saved successfully!</strong><br>You can now close this window or add medication schedules in the Profile page.</p>';
        guideMessages.appendChild(successDiv);
        guideMessages.scrollTop = guideMessages.scrollHeight;
        
        // 3秒后关闭
        setTimeout(() => {
            profileGuideModal.style.display = 'none';
        }, 3000);
    };
    
    // 重新开始引导
    window.restartGuide = function() {
        currentStep = 1;
        collectedData = { name: '', age: '', gender: '', conditions: '', allergies: '', medications: '' };
        const restartMessage = translate('guideRestartMessage');
        guideMessages.innerHTML = `
            <div class="chat-message ai-message">
                <p>${restartMessage}</p>
            </div>
        `;
        updateGuideProgress();
    };
    
    guideSendBtn.onclick = sendGuideMessage;
    
    // 输入框回车发送
    guideInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendGuideMessage();
        }
    });
    
    // 语音输入（引导机器人）
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const guideRecognition = new SpeechRecognition();
        guideRecognition.lang = 'en-US';
        guideRecognition.continuous = false;
        guideRecognition.interimResults = false;
        
        guideVoiceBtn.onclick = () => {
            if (guideVoiceBtn.classList.contains('recording')) {
                guideRecognition.stop();
            } else {
                guideRecognition.start();
                guideVoiceBtn.classList.add('recording');
                guideVoiceBtn.innerHTML = '⏹️';
            }
        };
        
        guideRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            guideInput.value = transcript;
            guideVoiceBtn.classList.remove('recording');
            guideVoiceBtn.innerHTML = '🎤';
        };
        
        guideRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            guideVoiceBtn.classList.remove('recording');
            guideVoiceBtn.innerHTML = '🎤';
        };
        
        guideRecognition.onend = () => {
            guideVoiceBtn.classList.remove('recording');
            guideVoiceBtn.innerHTML = '🎤';
        };
    }

    // ============ 服药提醒功能 ============
    
    const reminderBtn = document.getElementById('reminder-btn');
    const reminderModal = document.getElementById('reminder-modal');
    const reminderCloseBtn = document.querySelector('.reminder-close-btn');
    const reminderList = document.getElementById('reminder-list');
    const enableRemindersBtn = document.getElementById('enable-reminders-btn');
    const medicationAlert = document.getElementById('medication-alert');
    
    // 按钮状态徽章
    const reminderStatusBadge = document.getElementById('reminder-status-badge');
    
    let remindersEnabled = false;
    let reminderTimers = [];
    let notificationPermission = false;
    
    // 从localStorage加载提醒状态
    function loadReminderStatus() {
        const savedStatus = localStorage.getItem('remindersEnabled');
        if (savedStatus === 'true') {
            remindersEnabled = true;
            updateReminderButtonUI(true);
            // 重新启动提醒
            startReminders();
        } else {
            // 确保首次加载或OFF状态时显示OFF
            remindersEnabled = false;
            updateReminderButtonUI(false);
        }
    }
    
    // 保存提醒状态到localStorage
    function saveReminderStatus(enabled) {
        localStorage.setItem('remindersEnabled', enabled);
    }
    
    // 更新按钮UI
    function updateReminderButtonUI(enabled) {
        if (enabled) {
            reminderBtn.classList.add('active');
            reminderStatusBadge.classList.remove('off');
            reminderStatusBadge.classList.add('on');
            reminderStatusBadge.textContent = translate('reminderStatusOn');
        } else {
            reminderBtn.classList.remove('active');
            reminderStatusBadge.classList.remove('on');
            reminderStatusBadge.classList.add('off');
            reminderStatusBadge.textContent = translate('reminderStatusOff');
        }
    }
    
    // 检查通知权限
    async function checkNotificationPermission() {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                notificationPermission = true;
                return true;
            } else if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                notificationPermission = (permission === 'granted');
                return notificationPermission;
            }
        }
        return false;
    }
    
    // 显示服药提醒列表
    function displayReminderList() {
        const profile = localStorage.getItem('userProfile');
        if (!profile) {
            reminderList.innerHTML = `
                <div class="reminder-empty">
                    <div class="reminder-empty-icon">📋</div>
                    <p>No medication schedule found.</p>
                    <p>Please add your medications in the Profile page first.</p>
                </div>
            `;
            return;
        }
        
        const data = JSON.parse(profile);
        const schedule = data.medicationSchedule;
        
        if (!schedule || schedule.length === 0) {
            reminderList.innerHTML = `
                <div class="reminder-empty">
                    <div class="reminder-empty-icon">💊</div>
                    <p>No medications in your schedule.</p>
                    <p>Click "👤 My Profile" to add medications.</p>
                </div>
            `;
            return;
        }
        
        // 按时间排序
        const sortedSchedule = [...schedule].sort((a, b) => {
            if (!a.time) return 1;
            if (!b.time) return -1;
            return a.time.localeCompare(b.time);
        });
        
        reminderList.innerHTML = sortedSchedule.map(med => {
            const hasTime = med.time && med.time.trim() !== '';
            const itemClass = hasTime ? 'reminder-item' : 'reminder-item no-time';
            
            return `
                <div class="${itemClass}">
                    <div class="reminder-item-header">
                        <span class="reminder-med-name">${med.name || 'Unnamed Medication'}</span>
                        <span class="reminder-time">${med.time || 'No time set'}</span>
                    </div>
                    <div class="reminder-med-details">
                        ${med.dosage ? `<div class="reminder-med-dosage">Dosage: ${med.dosage}</div>` : ''}
                        ${med.notes ? `<div class="reminder-med-notes">Note: ${med.notes}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // 打开提醒列表（保持原有功能）
    reminderBtn.onclick = () => {
        displayReminderList();
        reminderModal.style.display = 'flex';
    };
    
    // 关闭提醒列表
    reminderCloseBtn.onclick = () => {
        reminderModal.style.display = 'none';
    };
    
    // 点击弹窗外部关闭
    window.addEventListener('click', (event) => {
        if (event.target == reminderModal) {
            reminderModal.style.display = 'none';
        }
    });
    
    // 计算距离目标时间的毫秒数
    function getMillisecondsUntil(timeStr) {
        const now = new Date();
        const [hours, minutes] = timeStr.split(':').map(Number);
        const target = new Date();
        target.setHours(hours, minutes, 0, 0);
        
        let diff = target - now;
        
        // 如果时间已过,设置为明天
        if (diff < 0) {
            target.setDate(target.getDate() + 1);
            diff = target - now;
        }
        
        return diff;
    }
    
    // 显示服药提醒通知
    function showMedicationAlert(medication) {
        // 显示页面通知
        document.getElementById('alert-medication-name').textContent = medication.name;
        document.getElementById('alert-medication-info').textContent = 
            `${medication.dosage || 'Dosage not specified'}${medication.notes ? ' - ' + medication.notes : ''}`;
        document.getElementById('alert-time').textContent = 
            `Scheduled time: ${medication.time}`;
        
        medicationAlert.style.display = 'block';
        
        // 播放提示音(如果浏览器支持)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCp+zPDYfC8IM3fN79qANwkaaLvty55NEg1Rq+fxuGUcBjiS2fLNey4EJHjH8N2RQAoVX7Tq7KlWFApGn+DyvmwhBCp+zPDYfC8IM3fN79qANwkaaLvty55NEg1Rq+fxuGUcBjiS2fLNey4EJHjH8N2RQAoVX7Tq7KlWFApGn+DyvmwhBCp+zPDYfC8IM3fN79qANwkaaLvty55NEg1Rq+fxuGUcBjiS2fLNey4E');
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
            console.log('Audio not supported');
        }
        
        // 浏览器通知
        if (notificationPermission && 'Notification' in window) {
            new Notification('💊 Medication Reminder', {
                body: `Time to take ${medication.name}\n${medication.dosage || ''}\n${medication.notes || ''}`,
                icon: '/static/icon.png',
                requireInteraction: true
            });
        }
    }
    
    // 设置单个药物提醒
    function setMedicationReminder(medication) {
        if (!medication.time || medication.time.trim() === '') return;
        
        const delay = getMillisecondsUntil(medication.time);
        
        const timerId = setTimeout(() => {
            showMedicationAlert(medication);
            // 24小时后再次提醒
            setMedicationReminder(medication);
        }, delay);
        
        reminderTimers.push(timerId);
        
        console.log(`Reminder set for ${medication.name} at ${medication.time} (in ${Math.round(delay/1000/60)} minutes)`);
    }
    
    // 清除所有提醒
    function clearAllReminders() {
        reminderTimers.forEach(timer => clearTimeout(timer));
        reminderTimers = [];
    }
    
    // 启动提醒系统
    async function startReminders() {
        const hasPermission = await checkNotificationPermission();
        
        const profile = localStorage.getItem('userProfile');
        if (!profile) {
            alert('Please add your medication schedule in Profile first.');
            updateReminderButtonUI(false);
            saveReminderStatus(false);
            remindersEnabled = false;
            return false;
        }
        
        const data = JSON.parse(profile);
        const schedule = data.medicationSchedule;
        
        if (!schedule || schedule.length === 0) {
            alert('No medications found in your schedule.');
            updateReminderButtonUI(false);
            saveReminderStatus(false);
            remindersEnabled = false;
            return false;
        }
        
        const withTime = schedule.filter(med => med.time && med.time.trim() !== '');
        if (withTime.length === 0) {
            alert('Please add times to your medications in Profile.');
            updateReminderButtonUI(false);
            saveReminderStatus(false);
            remindersEnabled = false;
            return false;
        }
        
        // 清除旧提醒
        clearAllReminders();
        
        // 设置新提醒
        withTime.forEach(med => setMedicationReminder(med));
        
        console.log(`✓ Reminders started for ${withTime.length} medication(s)`);
        return true;
    }
    
    // 启用/禁用提醒 (弹窗中的按钮,与主按钮同步)
    enableRemindersBtn.onclick = async () => {
        if (!remindersEnabled) {
            // 启用提醒
            const success = await startReminders();
            if (success) {
                remindersEnabled = true;
                updateReminderButtonUI(true);
                saveReminderStatus(true);
                enableRemindersBtn.textContent = translate('disableRemindersBtn');
                enableRemindersBtn.classList.add('enabled');
                
                const profile = JSON.parse(localStorage.getItem('userProfile'));
                const count = profile.medicationSchedule.filter(med => med.time && med.time.trim() !== '').length;
                
                alert(translateWithParams('notifRemindersEnabled', {count}) + (notificationPermission ? '\nBrowser notifications enabled.' : '\nBrowser notifications not available.'));
            }
        } else {
            // 禁用提醒
            clearAllReminders();
            remindersEnabled = false;
            updateReminderButtonUI(false);
            saveReminderStatus(false);
            enableRemindersBtn.textContent = translate('enableRemindersBtn');
            enableRemindersBtn.classList.remove('enabled');
            
            alert(translate('notifRemindersDisabled'));
        }
    };
    
    // 页面加载时恢复提醒状态
    loadReminderStatus();
    
    // 已服药按钮
    document.getElementById('taken-btn').onclick = () => {
        medicationAlert.style.display = 'none';
        // 可以在这里记录服药历史
        console.log('Medication taken at', new Date().toLocaleString());
    };
    
    // 延迟提醒按钮
    document.getElementById('snooze-btn').onclick = () => {
        medicationAlert.style.display = 'none';
        
        // 10分钟后再次提醒
        setTimeout(() => {
            medicationAlert.style.display = 'block';
        }, 10 * 60 * 1000);
        
        console.log('Reminder snoozed for 10 minutes');
    };

    // 医生角色悬浮事件 - 直接播放advisor.mp3
    doctorWrapper.addEventListener('mouseenter', () => {
        playAudio('/static/audio/advisor.mp3');
    });

    // 朋友角色悬浮事件 - 直接播放friend.mp3
    friendWrapper.addEventListener('mouseenter', () => {
        playAudio('/static/audio/friend.mp3');
    });

    // 点击医生角色打开健康建议弹窗
    doctorWrapper.onclick = () => {
        modal.style.display = 'flex';
    };

    // 关闭健康建议弹窗
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        stopAudio(); // 停止播放
    };

    // 点击朋友角色打开聊天弹窗
    friendWrapper.onclick = () => {
        chatModal.style.display = 'flex';
    };

    // 关闭聊天弹窗
    chatCloseBtn.onclick = () => {
        chatModal.style.display = 'none';
        stopAudio(); // 停止播放
    };

    // 点击弹窗外部区域关闭弹窗
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            stopAudio(); // 停止播放
        }
        if (event.target == chatModal) {
            chatModal.style.display = 'none';
            stopAudio(); // 停止播放
        }
    };

    // "生成建议"按钮点击事件 - 改为聊天式交互
    const sendHealthQuery = async () => {
        const diseaseText = diseaseInput.value.trim();

        if (!diseaseText) return;

        // 添加用户消息到聊天框
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user-message';
        userMessageDiv.innerHTML = `<p>${diseaseText}</p>`;
        suggestionMessages.appendChild(userMessageDiv);

        // 清空输入框
        diseaseInput.value = '';

        // 滚动到底部
        suggestionMessages.scrollTop = suggestionMessages.scrollHeight;

        // 禁用发送按钮
        generateBtn.disabled = true;
        generateBtn.textContent = translate('analyzing');

        try {
            const response = await fetch('/get_suggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    disease: diseaseText,
                    userProfile: getUserProfileContext(),
                    language: currentLanguage  // 发送当前语言设置
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received data:", data); // 调试信息

            // 处理函数调用 (如果存在)
            if (data.function_call && data.function_call.name === 'add_medication_reminder') {
                const args = data.function_call.arguments;
                console.log("Doctor API function call detected:", args);
                
                // 自动添加到用户的药物时间表
                const profile = localStorage.getItem('userProfile');
                const profileData = profile ? JSON.parse(profile) : {};
                
                if (!profileData.medicationSchedule) {
                    profileData.medicationSchedule = [];
                }
                
                // 添加新的药物提醒
                profileData.medicationSchedule.push({
                    id: Date.now().toString(),
                    name: args.medication_name || '',
                    time: args.time || '',
                    dosage: args.dosage || '',
                    notes: args.notes || 'Added via doctor consultation'
                });
                
                // 保存到 localStorage
                localStorage.setItem('userProfile', JSON.stringify(profileData));
                console.log("Medication reminder added from doctor:", args);
                
                // 显示成功提示在医生对话框中
                const successNote = document.createElement('div');
                successNote.className = 'chat-message system-message';
                successNote.innerHTML = `<p style="background: #e8f5e9; padding: 10px; border-radius: 8px; color: #2e7d32;">✓ Medication reminder added: ${args.medication_name} at ${args.time}</p>`;
                suggestionMessages.appendChild(successNote);
            }

            // 添加AI建议到聊天框
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'chat-message ai-message';
            
            // 创建文本段落
            const textP = document.createElement('p');
            textP.textContent = data.suggestion;
            aiMessageDiv.appendChild(textP);

            suggestionMessages.appendChild(aiMessageDiv);

            // 语音播放：优先 SSE 流式；Vercel 等不支持流式时回退为一次性 WAV
            if (data.is_realtime && data.streaming_supported) {
                console.log('[健康建议] 开始SSE流式播放');
                try {
                    await realtimePlayer.streamFromSSE(data.suggestion);
                    console.log('✅ [健康建议] SSE流式播放完成');
                } catch (error) {
                    console.error('❌ [健康建议] SSE流式播放失败，回退一次性播放:', error);
                    await realtimePlayer.playWavFromServer(data.suggestion);
                }
            } else {
                console.log('[健康建议] 流式不支持，使用一次性播放');
                await realtimePlayer.playWavFromServer(data.suggestion);
            }

            // 滚动到底部
            suggestionMessages.scrollTop = suggestionMessages.scrollHeight;

        } catch (error) {
            console.error("Fetch Error:", error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message ai-message';
            errorMessageDiv.innerHTML = '<p style="color: #d32f2f;">Sorry, there was a network issue. Please try again later.</p>';
            suggestionMessages.appendChild(errorMessageDiv);
            suggestionMessages.scrollTop = suggestionMessages.scrollHeight;
        } finally {
            // 恢复按钮状态
            generateBtn.disabled = false;
            generateBtn.textContent = translate('generateBtn');
        }
    };

    generateBtn.onclick = sendHealthQuery;

    // 输入框回车发送（Shift+Enter换行）
    diseaseInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendHealthQuery();
        }
    });

    // 聊天功能 - 发送消息
    const sendMessage = async () => {
        const messageText = chatInput.value.trim();
        
        if (!messageText) return;

        // 添加用户消息到聊天框
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user-message';
        userMessageDiv.innerHTML = `<p>${messageText}</p>`;
        chatMessages.appendChild(userMessageDiv);

        // 清空输入框
        chatInput.value = '';

        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 禁用发送按钮
        sendBtn.disabled = true;
        sendBtn.textContent = translate('replying');

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: messageText,
                    userProfile: getUserProfileContext(),
                    language: currentLanguage  // 发送当前语言设置
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received chat data:", data); // 调试信息

            // 处理函数调用 (如果存在)
            if (data.function_call && data.function_call.name === 'add_medication_reminder') {
                const args = data.function_call.arguments;
                console.log("Function call detected:", args);
                
                // 自动添加到用户的药物时间表
                const profile = localStorage.getItem('userProfile');
                const profileData = profile ? JSON.parse(profile) : {};
                
                if (!profileData.medicationSchedule) {
                    profileData.medicationSchedule = [];
                }
                
                // 添加新的药物提醒
                profileData.medicationSchedule.push({
                    id: Date.now().toString(),
                    name: args.medication_name || '',
                    time: args.time || '',
                    dosage: args.dosage || '',
                    notes: args.notes || 'Added via chat'
                });
                
                // 保存到 localStorage
                localStorage.setItem('userProfile', JSON.stringify(profileData));
                console.log("Medication reminder added:", args);
                
                // 显示成功提示在聊天中
                const successNote = document.createElement('div');
                successNote.className = 'chat-message system-message';
                successNote.innerHTML = `<p style="background: #e8f5e9; padding: 10px; border-radius: 8px; color: #2e7d32;">✓ Medication reminder added: ${args.medication_name} at ${args.time}</p>`;
                chatMessages.appendChild(successNote);
            }

            // 添加AI回复到聊天框
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'chat-message ai-message';
            
            // 创建文本段落
            const textP = document.createElement('p');
            textP.textContent = data.reply;
            aiMessageDiv.appendChild(textP);

            chatMessages.appendChild(aiMessageDiv);

            // 语音播放：优先 SSE 流式；不支持时回退一次性 WAV
            if (data.is_realtime && data.streaming_supported) {
                console.log('[聊天] 开始SSE流式播放');
                try {
                    await realtimePlayer.streamFromSSE(data.reply);
                    console.log('✅ [聊天] SSE流式播放完成');
                } catch (error) {
                    console.error('❌ [聊天] SSE流式播放失败，回退一次性播放:', error);
                    await realtimePlayer.playWavFromServer(data.reply);
                }
            } else {
                console.log('[聊天] 流式不支持，使用一次性播放');
                await realtimePlayer.playWavFromServer(data.reply);
            }

            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;

        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message ai-message';
            errorMessageDiv.innerHTML = '<p style="color: #d32f2f;">Sorry, there was a network issue. Please try again later.</p>';
            chatMessages.appendChild(errorMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = translate('sendBtn');
        }
    };

    // 发送按钮点击事件
    sendBtn.onclick = sendMessage;

    // 输入框回车发送（Shift+Enter换行）
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    // ============ 语音命令功能 - 调出对话框 ============
    
    const VoiceCommandRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (VoiceCommandRecognition && voiceCommandBtn) {
        const commandRecognition = new VoiceCommandRecognition();
        
        // 配置语音命令识别
        commandRecognition.lang = 'en-US';
        commandRecognition.continuous = false;
        commandRecognition.interimResults = false;
        
        let isCommandListening = false;
        
        voiceCommandBtn.addEventListener('click', () => {
            if (!isCommandListening) {
                try {
                    commandRecognition.start();
                    isCommandListening = true;
                    voiceCommandBtn.classList.add('listening');
                    voiceCommandBtn.innerHTML = '🔴 Listening...';
                    voiceStatus.textContent = 'Say "doctor" or "friend"...';
                    voiceStatus.style.display = 'block';
                } catch (error) {
                    console.error('Voice command start error:', error);
                }
            }
        });
        
        commandRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Voice command detected:', transcript);
            
            voiceStatus.textContent = `Heard: "${transcript}"`;
            
            // 检查是否包含关键词
            if (transcript.includes('doctor') || transcript.includes('doctors')) {
                voiceStatus.textContent = '✓ Opening Health Consultation...';
                voiceStatus.style.color = '#4caf50';
                setTimeout(() => {
                    modal.style.display = 'flex';
                    diseaseInput.focus();
                }, 500);
            } else if (transcript.includes('friend') || transcript.includes('friends')) {
                voiceStatus.textContent = '✓ Opening Friendly Chat...';
                voiceStatus.style.color = '#4caf50';
                setTimeout(() => {
                    chatModal.style.display = 'flex';
                    chatInput.focus();
                }, 500);
            } else {
                voiceStatus.textContent = '❌ Please say "doctor" or "friend"';
                voiceStatus.style.color = '#f44336';
            }
            
            // 3秒后隐藏状态信息
            setTimeout(() => {
                voiceStatus.style.display = 'none';
                voiceStatus.style.color = 'var(--text-color)';
            }, 3000);
        };
        
        commandRecognition.onend = () => {
            isCommandListening = false;
            voiceCommandBtn.classList.remove('listening');
            voiceCommandBtn.innerHTML = '🎤 Voice Command';
        };
        
        commandRecognition.onerror = (event) => {
            console.error('Voice command error:', event.error);
            isCommandListening = false;
            voiceCommandBtn.classList.remove('listening');
            voiceCommandBtn.innerHTML = '🎤 Voice Command';
            
            if (event.error === 'no-speech') {
                voiceStatus.textContent = '❌ No speech detected';
                voiceStatus.style.color = '#f44336';
            } else if (event.error === 'not-allowed') {
                voiceStatus.textContent = '❌ Microphone access denied';
                voiceStatus.style.color = '#f44336';
            } else {
                voiceStatus.textContent = `❌ Error: ${event.error}`;
                voiceStatus.style.color = '#f44336';
            }
            voiceStatus.style.display = 'block';
            
            setTimeout(() => {
                voiceStatus.style.display = 'none';
                voiceStatus.style.color = 'var(--text-color)';
            }, 3000);
        };
    } else if (voiceCommandBtn) {
        // 如果不支持语音识别,隐藏按钮
        voiceCommandBtn.style.display = 'none';
    }

    // ============ 语音识别功能 ============
    
    // 检查浏览器是否支持语音识别
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        // 创建两个独立的语音识别实例
        const healthRecognition = new SpeechRecognition();
        const chatRecognition = new SpeechRecognition();
        
        // 配置语音识别(健康咨询)
        healthRecognition.lang = 'en-US'; // 设置为英语
        healthRecognition.continuous = false; // 单次识别
        healthRecognition.interimResults = false; // 只返回最终结果
        
        // 配置语音识别(聊天)
        chatRecognition.lang = 'en-US';
        chatRecognition.continuous = false;
        chatRecognition.interimResults = false;
        
        // 获取语音按钮
        const voiceInputBtn = document.getElementById('voice-input-btn');
        const chatVoiceBtn = document.getElementById('chat-voice-btn');
        
        let isHealthRecording = false;
        let isChatRecording = false;
        
        // 健康咨询 - 语音输入
        voiceInputBtn.addEventListener('click', () => {
            if (!isHealthRecording) {
                healthRecognition.start();
                voiceInputBtn.classList.add('recording');
                voiceInputBtn.innerHTML = '🔴';
                voiceInputBtn.title = 'Listening...';
                isHealthRecording = true;
            } else {
                healthRecognition.stop();
                voiceInputBtn.classList.remove('recording');
                voiceInputBtn.innerHTML = '🎤';
                voiceInputBtn.title = 'Click to speak';
                isHealthRecording = false;
            }
        });
        
        healthRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            diseaseInput.value = transcript;
            console.log('Health voice input:', transcript);
        };
        
        healthRecognition.onend = () => {
            voiceInputBtn.classList.remove('recording');
            voiceInputBtn.innerHTML = '🎤';
            voiceInputBtn.title = 'Click to speak';
            isHealthRecording = false;
        };
        
        healthRecognition.onerror = (event) => {
            console.error('Health voice recognition error:', event.error);
            voiceInputBtn.classList.remove('recording');
            voiceInputBtn.innerHTML = '🎤';
            voiceInputBtn.title = 'Click to speak';
            isHealthRecording = false;
            
            if (event.error === 'no-speech') {
                alert('No speech detected. Please try again.');
            } else if (event.error === 'not-allowed') {
                alert('Microphone access denied. Please allow microphone access in your browser settings.');
            } else {
                alert('Voice recognition error: ' + event.error);
            }
        };
        
        // 聊天 - 语音输入
        chatVoiceBtn.addEventListener('click', () => {
            if (!isChatRecording) {
                chatRecognition.start();
                chatVoiceBtn.classList.add('recording');
                chatVoiceBtn.innerHTML = '🔴';
                chatVoiceBtn.title = 'Listening...';
                isChatRecording = true;
            } else {
                chatRecognition.stop();
                chatVoiceBtn.classList.remove('recording');
                chatVoiceBtn.innerHTML = '🎤';
                chatVoiceBtn.title = 'Click to speak';
                isChatRecording = false;
            }
        });
        
        chatRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            console.log('Chat voice input:', transcript);
        };
        
        chatRecognition.onend = () => {
            chatVoiceBtn.classList.remove('recording');
            chatVoiceBtn.innerHTML = '🎤';
            chatVoiceBtn.title = 'Click to speak';
            isChatRecording = false;
        };
        
        chatRecognition.onerror = (event) => {
            console.error('Chat voice recognition error:', event.error);
            chatVoiceBtn.classList.remove('recording');
            chatVoiceBtn.innerHTML = '🎤';
            chatVoiceBtn.title = 'Click to speak';
            isChatRecording = false;
            
            if (event.error === 'no-speech') {
                alert('No speech detected. Please try again.');
            } else if (event.error === 'not-allowed') {
                alert('Microphone access denied. Please allow microphone access in your browser settings.');
            } else {
                alert('Voice recognition error: ' + event.error);
            }
        };
        
    } else {
        console.warn('Speech recognition not supported in this browser');
        // 隐藏语音按钮
        const voiceInputBtn = document.getElementById('voice-input-btn');
        const chatVoiceBtn = document.getElementById('chat-voice-btn');
        if (voiceInputBtn) voiceInputBtn.style.display = 'none';
        if (chatVoiceBtn) chatVoiceBtn.style.display = 'none';
    }

});