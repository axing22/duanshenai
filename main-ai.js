// 段永平智慧问答系统 - AI对话版本
// 主要功能：集成DeepSeek API，实现智能对话

// =============================================================================
// 1. 知识库数据
// =============================================================================
const WISDOM_KNOWLEDGE = {
    "投资理念": {
        "corePrinciples": [
            "做对的事情，把事情做对",
            "投资自己懂的企业",
            "长期持有优秀公司",
            "不要借钱投资",
            "不要做空",
            "不懂不做"
        ],
        "valuationMethods": [
            "看企业的长期价值",
            "关注现金流",
            "重视商业模式",
            "考虑竞争优势"
        ],
        "riskManagement": [
            "安全边际",
            "分散投资",
            "耐心等待",
            "避免情绪化决策"
        ]
    },
    "企业经营": {
        "corporateCulture": [
            "本分文化",
            "用户导向",
            "长期主义",
            "诚信第一"
        ],
        "managementPhilosophy": [
            "做对的事情",
            "把事情做对",
            "以人为本",
            "持续学习"
        ],
        "innovationConcept": [
            "用户需求驱动",
            "技术服务于人",
            "简单实用",
            "持续改善"
        ]
    },
    "教育理念": {
        "parentingConcept": [
            "以身作则",
            "培养独立思考",
            "重视品德教育",
            "鼓励探索学习"
        ],
        "learningMethods": [
            "终身学习",
            "实践出真知",
            "跨界思考",
            "反思总结"
        ]
    },
    "AI思考": {
        "technologyAttitude": [
            "AI是工具",
            "服务于人",
            "保持人性",
            "谨慎发展"
        ],
        "applicationPhilosophy": [
            "提高效率",
            "改善生活",
            "保持简单",
            "关注用户"
        ]
    },
    "人生哲学": {
        "values": [
            "诚实正直",
            "谦逊学习",
            "知足常乐",
            "利他精神"
        ],
        "lifeAttitude": [
            "简单生活",
            "珍惜当下",
            "持续成长",
            "帮助他人"
        ]
    }
};

// =============================================================================
// 2. 系统提示词 - 确保AI回答符合段永平理念
// =============================================================================
const SYSTEM_PROMPT = `你是一个基于段永平智慧的对话助手。段永平是著名的投资家、企业家、教育家，以其深刻的投资理念和企业经营智慧而闻名。

段永平的核心理念包括：

投资原则：
- 做对的事情，把事情做对
- 投资自己懂的企业，不懂不做
- 长期持有优秀公司
- 不要借钱投资
- 不要做空股票
- 重视企业的长期价值和商业模式
- 关注现金流和竞争优势
- 保持安全边际，分散投资

企业经营：
- 本分文化 - 诚实守信，承担责任
- 用户导向 - 始终把用户需求放在第一位
- 长期主义 - 关注长远发展，不急功近利
- 以人为本 - 重视人才，以德治企
- 持续学习 - 企业文化和个人成长

教育理念：
- 以身作则 - 父母是孩子的第一任老师
- 培养独立思考能力
- 重视品德教育胜过成绩
- 鼓励探索和实践
- 终身学习和反思

AI思考：
- AI是工具，要服务于人
- 技术要保持简单实用
- 关注用户需求和体验
- 谨慎发展但拥抱创新

人生哲学：
- 诚实正直，谦逊学习
- 知足常乐，珍惜当下
- 利他精神，帮助他人
- 简单生活，深度思考

请基于这些理念回答用户问题，遵循以下要求：
1. 用简洁、深刻、启发性的语言回答
2. 尽量不编造具体细节、金额、时间等
3. 如果问题超出段永平理念范围，坦诚说明并给出一般性建议
4. 保持智慧和启发性，帮助用户独立思考
5. 回答控制在200-500字之间`;

const FORBIDDEN_PATTERNS = [
    '具体金额',
    '确切时间',
    '据我所知段永平说过',
    '我记得段永平在',
    '段永平曾经说过',
    '具体数字',
    '确切数字'
];

// =============================================================================
// 3. API配置和密钥管理
// =============================================================================
const API_CONFIG = {
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
    temperature: 0.7,
    maxTokens: 1000
};

// 动态加载API密钥（分两段存储，稍微增加安全性）
let API_KEY = null;

async function loadApiKey() {
    if (API_KEY) return API_KEY;

    try {
        // 第一段密钥
        const part1 = 'sk-c1a8ede66f5e479b8c11ef9abb';
        // 第二段密钥（通过简单混淆）
        const part2 = atob('ZmEzMTk3', 'base64'); // fa3197
        API_KEY = part1 + part2;
        return API_KEY;
    } catch (error) {
        console.error('Failed to load API key:', error);
        return null;
    }
}

// =============================================================================
// 4. 对话管理系统
// =============================================================================
class ConversationManager {
    constructor() {
        this.conversations = this.loadConversations();
        this.currentConversationId = this.getOrCreateCurrentConversation();
        this.maxStorageSize = 5 * 1024 * 1024; // 5MB
    }

    loadConversations() {
        try {
            const data = localStorage.getItem('duanshenai_conversations');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Failed to load conversations:', error);
            return {};
        }
    }

    saveConversations() {
        try {
            const dataStr = JSON.stringify(this.conversations);
            if (dataStr.length > this.maxStorageSize) {
                // 如果超过5MB，删除最旧的对话
                this.cleanupOldConversations();
            }
            localStorage.setItem('duanshenai_conversations', JSON.stringify(this.conversations));
        } catch (error) {
            console.error('Failed to save conversations:', error);
        }
    }

    getOrCreateCurrentConversation() {
        const now = Date.now();
        const currentId = `conv_${now}`;
        this.conversations[currentId] = {
            id: currentId,
            title: '新对话',
            messages: [],
            createdAt: now,
            updatedAt: now
        };
        this.currentConversationId = currentId;
        this.saveConversations();
        return currentId;
    }

    addMessage(role, content) {
        const conversation = this.conversations[this.currentConversationId];
        if (!conversation) return;

        const message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            role,
            content,
            timestamp: Date.now()
        };

        conversation.messages.push(message);
        conversation.updatedAt = Date.now();

        // 更新对话标题（使用第一条用户消息）
        if (conversation.messages.filter(m => m.role === 'user').length === 1) {
            conversation.title = content.length > 20 ? content.substring(0, 20) + '...' : content;
        }

        this.saveConversations();
        return message;
    }

    getMessages() {
        const conversation = this.conversations[this.currentConversationId];
        return conversation ? conversation.messages : [];
    }

    cleanupOldConversations() {
        // 删除最旧的对话，直到存储大小合适
        const conversationIds = Object.keys(this.conversations);
        const sorted = conversationIds
            .map(id => ({
                id,
                updatedAt: this.conversations[id].updatedAt
            }))
            .sort((a, b) => a.updatedAt - b.updatedAt);

        while (JSON.stringify(this.conversations).length > this.maxStorageSize && sorted.length > 0) {
            const oldestId = sorted.shift().id;
            delete this.conversations[oldestId];
        }
    }
}

// =============================================================================
// 5. DeepSeek API 调用
// =============================================================================
class DeepSeekAPI {
    constructor(manager) {
        this.conversationManager = manager;
        this.isLoading = false;
    }

    async callAPI(messages) {
        if (this.isLoading) {
            throw new Error('请求正在进行中，请稍候');
        }

        this.isLoading = true;

        try {
            const apiKey = await loadApiKey();
            if (!apiKey) {
                throw new Error('API密钥加载失败');
            }

            const response = await fetch(API_CONFIG.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: API_CONFIG.model,
                    messages: messages,
                    temperature: API_CONFIG.temperature,
                    max_tokens: API_CONFIG.maxTokens
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const answer = data.choices?.[0]?.message?.content;

            if (!answer) {
                throw new Error('API返回格式异常');
            }

            this.isLoading = false;
            return answer;

        } catch (error) {
            this.isLoading = false;
            console.error('DeepSeek API Error:', error);
            throw error;
        }
    }

    async sendMessage(userInput) {
        // 添加用户消息
        this.conversationManager.addMessage('user', userInput);

        // 准备消息历史
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...this.conversationManager.getMessages().map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        try {
            // 调用API
            const answer = await this.callAPI(messages);

            // 质量控制检查
            const validatedAnswer = this.validateAnswer(answer);

            // 添加AI回复
            this.conversationManager.addMessage('assistant', validatedAnswer);

            return validatedAnswer;

        } catch (error) {
            // API失败时的降级处理
            const fallbackMessage = this.getFallbackMessage(userInput);
            this.conversationManager.addMessage('assistant', fallbackMessage);
            throw { isAPIError: true, message: error.message, fallback: fallbackMessage };
        }
    }

    validateAnswer(answer) {
        // 检查是否包含被禁止的内容
        for (const pattern of FORBIDDEN_PATTERNS) {
            if (answer.includes(pattern)) {
                return '基于段永平的理念，我建议您从长期价值投资的角度思考这个问题。重要的是保持独立思考，不被短期波动影响判断。';
            }
        }

        // 限制回答长度
        if (answer.length > 1000) {
            answer = answer.substring(0, 1000) + '...';
        }

        return answer;
    }

    getFallbackMessage(userInput) {
        const simplified = userInput.toLowerCase();

        if (simplified.includes('投资') || simplified.includes('股票')) {
            return '抱歉，AI服务暂时不可用。基于段永平的投资理念，建议您：做对的事情，选择自己真正理解的企业，长期持有优秀公司，不懂不做。请稍后重试。';
        }

        if (simplified.includes('教育') || simplified.includes('孩子')) {
            return '抱歉，AI服务暂时不可用。基于段永平的教育理念，建议您：以身作则，培养孩子的独立思考能力，重视品德教育。请稍后重试。';
        }

        if (simplified.includes('企业') || simplified.includes('管理')) {
            return '抱歉，AI服务暂时不可用。基于段永平的企业经营理念，建议您：坚持本分文化，以用户为导向，保持长期主义。请稍后重试。';
        }

        if (simplified.includes('ai') || simplified.includes('人工智能')) {
            return '抱歉，AI服务暂时不可用。基于段永平对AI的思考：AI是工具，要服务于人，保持简单实用，关注用户体验。请稍后重试。';
        }

        return '抱歉，AI服务暂时不可用。基于段永平的理念：做对的事情，把事情做对。保持独立思考，长期学习。请稍后重试。';
    }
}

// =============================================================================
// 6. UI 管理器
// =============================================================================
class UIManager {
    constructor(api) {
        this.api = api;
        this.initElements();
        this.bindEvents();
        this.renderMessages();
    }

    initElements() {
        this.messagesContainer = document.getElementById('chat-messages');
        this.inputElement = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-button');
        this.clearButton = document.getElementById('clear-button');
        this.loadingIndicator = document.getElementById('loading-indicator');
    }

    bindEvents() {
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        this.clearButton?.addEventListener('click', () => this.handleClear());
    }

    async handleSend() {
        const message = this.inputElement.value.trim();
        if (!message || this.api.isLoading) return;

        // 清空输入框
        this.inputElement.value = '';
        this.inputElement.style.height = 'auto';

        // 添加用户消息到界面
        this.addMessageToUI('user', message);
        this.scrollToBottom();

        // 显示加载状态
        this.showLoading(true);

        try {
            // 发送消息并获取回复
            const response = await this.api.sendMessage(message);

            // 添加AI回复到界面
            this.addMessageToUI('assistant', response);

        } catch (error) {
            // 处理错误
            console.error('Send message error:', error);

            if (error.isAPIError) {
                // 显示降级回复
                this.addMessageToUI('assistant', error.fallback, true);
            } else {
                this.addMessageToUI('assistant', '抱歉，出现了一些问题。请检查网络连接后重试。', true);
            }
        } finally {
            // 隐藏加载状态
            this.showLoading(false);
            this.scrollToBottom();
        }
    }

    addMessageToUI(role, content, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        // 添加复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '📋';
        copyButton.title = '复制消息';
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(content);
            copyButton.innerHTML = '✅';
            setTimeout(() => {
                copyButton.innerHTML = '📋';
            }, 1000);
        });

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = content;

        if (isError) {
            messageContent.style.borderLeft = '4px solid var(--warm-orange)';
        }

        messageContent.appendChild(copyButton);
        messageContent.appendChild(messageText);
        messageDiv.appendChild(messageContent);

        this.messagesContainer.appendChild(messageDiv);
    }

    showLoading(show) {
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = show ? 'block' : 'none';
        }
        this.sendButton.disabled = show;
        this.sendButton.textContent = show ? '思考中...' : '发送';
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    renderMessages() {
        // 清空现有消息
        this.messagesContainer.innerHTML = '';

        // 渲染历史消息
        const messages = this.conversationManager?.getMessages() || [];
        messages.forEach(msg => {
            this.addMessageToUI(msg.role, msg.content);
        });

        // 如果没有消息，显示欢迎信息
        if (messages.length === 0) {
            this.showWelcomeMessage();
        }
    }

    showWelcomeMessage() {
        const welcomeMessages = [
            '你好！我是基于段永平智慧的AI助手。',
            '我可以和您聊聊投资理念、企业经营、教育思考、人生哲学等话题。',
            '请输入您的问题，我会基于段永平的理念为您提供启发和建议。'
        ];

        welcomeMessages.forEach(msg => {
            this.addMessageToUI('assistant', msg);
        });
    }

    handleClear() {
        if (confirm('确定要清除所有对话历史吗？此操作不可恢复。')) {
            this.api.conversationManager = new ConversationManager();
            localStorage.removeItem('duanshenai_conversations');
            this.renderMessages();
        }
    }
}

// =============================================================================
// 7. 动画效果
// =============================================================================
function initAnimations() {
    // 输入框自动调整高度
    const input = document.getElementById('chat-input');
    if (input) {
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    // 页面加载动画
    anime({
        targets: '.chat-container',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutQuart'
    });
}

// =============================================================================
// 8. 初始化
// =============================================================================
let conversationManager;
let deepSeekAPI;
let uiManager;

document.addEventListener('DOMContentLoaded', () => {
    // 初始化各个组件
    conversationManager = new ConversationManager();
    deepSeekAPI = new DeepSeekAPI(conversationManager);
    uiManager = new UIManager(deepSeekAPI);

    // 保存引用到全局
    window.chatApp = {
        conversationManager,
        deepSeekAPI,
        uiManager
    };

    // 初始化动画
    initAnimations();

    console.log('段永平智慧问答AI系统已启动');
});

// =============================================================================
// 9. 工具函数
// =============================================================================

// 格式化时间戳
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
