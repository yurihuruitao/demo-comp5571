document.addEventListener('DOMContentLoaded', () => {

    // 音频播放器
    let currentAudio = null;
    let currentAudioBtn = null;

    // 停止当前音频播放
    function stopAudio() {
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

    // 播放音频函数（支持暂停/继续）
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
        guideMessages.innerHTML = `
            <div class="chat-message ai-message">
                <p>Hi! I'm your profile assistant. I'll help you set up your health profile through a friendly conversation. Let's start with your name - what should I call you?</p>
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
        guideProgressText.textContent = `Step ${currentStep} of 7: ${stepLabels[currentStep]}`;
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
        guideSendBtn.textContent = 'Processing...';
        
        try {
            const response = await fetch('/profile_guide', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: messageText,
                    step: currentStep,
                    collectedData: collectedData
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
            guideSendBtn.textContent = 'Send';
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
        guideMessages.innerHTML = `
            <div class="chat-message ai-message">
                <p>Let's start over! What's your name?</p>
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
            reminderStatusBadge.textContent = 'ON';
        } else {
            reminderBtn.classList.remove('active');
            reminderStatusBadge.classList.remove('on');
            reminderStatusBadge.classList.add('off');
            reminderStatusBadge.textContent = 'OFF';
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
                enableRemindersBtn.textContent = '🔕 Disable Reminders';
                enableRemindersBtn.classList.add('enabled');
                
                const profile = JSON.parse(localStorage.getItem('userProfile'));
                const count = profile.medicationSchedule.filter(med => med.time && med.time.trim() !== '').length;
                
                alert(`✓ Reminders enabled for ${count} medication(s)!${notificationPermission ? '\nBrowser notifications enabled.' : '\nBrowser notifications not available.'}`);
            }
        } else {
            // 禁用提醒
            clearAllReminders();
            remindersEnabled = false;
            updateReminderButtonUI(false);
            saveReminderStatus(false);
            enableRemindersBtn.textContent = '🔔 Enable Reminders';
            enableRemindersBtn.classList.remove('enabled');
            
            alert('Reminders disabled.');
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
        generateBtn.textContent = 'Analyzing...';

        try {
            const response = await fetch('/get_suggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    disease: diseaseText,
                    userProfile: getUserProfileContext()
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

            // 如果有音频URL,添加播放按钮
            if (data.audio_url) {
                const audioBtn = document.createElement('button');
                audioBtn.className = 'audio-btn';
                audioBtn.innerHTML = '🔊 Play Audio';
                audioBtn.onclick = () => toggleAudio(data.audio_url, audioBtn);
                aiMessageDiv.appendChild(audioBtn);
            }

            suggestionMessages.appendChild(aiMessageDiv);

            // 自动播放语音
            if (data.audio_url) {
                console.log("Auto-playing audio:", data.audio_url); // 调试信息
                const audioBtn = aiMessageDiv.querySelector('.audio-btn');
                if (audioBtn) {
                    toggleAudio(data.audio_url, audioBtn);
                }
            } else {
                console.log("No audio URL received"); // 调试信息
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
            generateBtn.textContent = 'Send';
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
        sendBtn.textContent = 'Replying...';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: messageText,
                    userProfile: getUserProfileContext()
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

            // 如果有音频URL,添加播放按钮
            if (data.audio_url) {
                const audioBtn = document.createElement('button');
                audioBtn.className = 'audio-btn';
                audioBtn.innerHTML = '🔊 Play Audio';
                audioBtn.onclick = () => toggleAudio(data.audio_url, audioBtn);
                aiMessageDiv.appendChild(audioBtn);
            }

            chatMessages.appendChild(aiMessageDiv);

            // 自动播放语音
            if (data.audio_url) {
                console.log("Auto-playing chat audio:", data.audio_url); // 调试信息
                const audioBtn = aiMessageDiv.querySelector('.audio-btn');
                if (audioBtn) {
                    toggleAudio(data.audio_url, audioBtn);
                }
            } else {
                console.log("No audio URL received for chat"); // 调试信息
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
            sendBtn.textContent = 'Send';
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