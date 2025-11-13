// 段永平智慧问答系统 - 主要JavaScript文件

// 知识库数据
const wisdomData = {
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

// 问答对数据
const qaPairs = [
    {
        id: 1,
        question: "如何选择投资标的？",
        answer: "段永平认为选择投资标的要遵循'不懂不做'的原则。首先要投资自己真正理解的企业，看这个企业的商业模式、竞争优势、管理团队和长期发展前景。重要的是要'做对的事情，把事情做对'，选择那些具有长期竞争优势和优秀管理团队的公司。",
        category: "投资理念",
        keywords: ["投资", "选择", "企业", "懂", "商业模式"]
    },
    {
        id: 2,
        question: "如何看待市场波动？",
        answer: "段永平认为市场波动是正常的，投资者不应该被短期的市场波动所影响。他主张长期持有优秀公司，不要被市场情绪左右。关键是要相信自己所投资企业的长期价值，保持耐心和定力。",
        category: "投资理念", 
        keywords: ["市场", "波动", "长期", "情绪", "耐心"]
    },
    {
        id: 3,
        question: "如何培养孩子的财商？",
        answer: "段永平强调以身作则的重要性。他认为父母应该通过自己的言行来教育孩子，培养孩子的独立思考能力和正确的价值观。在财商教育方面，要让孩子理解钱的价值，学会理性消费，培养长期投资的概念。",
        category: "教育理念",
        keywords: ["孩子", "财商", "教育", "以身作则", "独立思考"]
    },
    {
        id: 4,
        question: "如何面对AI技术的发展？",
        answer: "段永平认为AI是工具，应该服务于人。他强调要保持人性的温度，不要过度依赖技术。在应用AI时，要关注用户的真实需求，让技术真正改善人们的生活。同时要保持谨慎的态度，确保AI的发展符合人类的长期利益。",
        category: "AI思考",
        keywords: ["AI", "技术", "工具", "人性", "用户"]
    },
    {
        id: 5,
        question: "如何建立良好的企业文化？",
        answer: "段永平非常强调'本分文化'的重要性。他认为企业文化应该以诚信为基础，以用户为中心，坚持长期主义。要建立让员工感到自豪的文化，让每个人都能在工作中找到意义和价值。",
        category: "企业经营",
        keywords: ["企业文化", "本分", "诚信", "用户", "长期"]
    },
    {
        id: 6,
        question: "如何在投资中控制风险？",
        answer: "段永平的风险控制理念包括：不借钱投资、不做空、不懂不做、要有安全边际。他认为真正的风险控制来自于对企业的深入理解，而不是频繁的买卖。要保持理性，避免情绪化决策。",
        category: "投资理念",
        keywords: ["风险", "控制", "借钱", "做空", "安全边际"]
    },
    {
        id: 7,
        question: "如何保持简单的生活？",
        answer: "段永平倡导简单生活，他认为幸福不在于拥有多少，而在于内心的满足。要学会知足常乐，珍惜当下拥有的一切。在物质追求和精神追求之间找到平衡，过有意义的生活。",
        category: "人生哲学",
        keywords: ["简单", "生活", "知足", "幸福", "平衡"]
    },
    {
        id: 8,
        question: "如何在企业经营中创新？",
        answer: "段永平认为创新应该源于用户需求，而不是为了创新而创新。他强调技术要服务于人，要保持简单实用的理念。真正的创新是持续改善用户体验，解决用户的实际问题。",
        category: "企业经营",
        keywords: ["创新", "用户", "需求", "技术", "简单"]
    }
];

// 热门问题数据
const hotQuestions = [
    "如何选择投资标的？",
    "如何看待市场波动？",
    "如何培养孩子的财商？",
    "如何面对AI技术的发展？",
    "如何建立良好的企业文化？",
    "如何在投资中控制风险？",
    "如何保持简单的生活？",
    "如何在企业经营中创新？"
];

// 智慧语录数据
const wisdomQuotes = [
    "做对的事情，把事情做对。",
    "投资自己懂的企业。",
    "不懂不做。",
    "长期持有优秀公司。",
    "本分文化是企业根本。",
    "技术要服务于人。",
    "简单生活，深度思考。",
    "诚实正直是立身之本。"
];

// 全局变量
let currentBackground = null;
let particles = [];

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 初始化背景动画
    initBackgroundAnimation();
    
    // 初始化打字机效果
    initTypedQuotes();
    
    // 初始化热门问题
    initHotQuestions();
    
    // 初始化理念卡片
    initPhilosophyCards();
    
    // 初始化问答功能
    initQAFunction();
    
    // 初始化导航功能
    initNavigation();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化粒子效果
    initParticles();
    
    console.log('段永平智慧问答系统初始化完成');
}

// 背景动画初始化
function initBackgroundAnimation() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 创建水墨渲染效果
    let time = 0;
    
    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(248, 249, 250, 0.1)');
        gradient.addColorStop(0.5, 'rgba(232, 244, 248, 0.2)');
        gradient.addColorStop(1, 'rgba(248, 249, 250, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制流动的抽象形状
        for (let i = 0; i < 5; i++) {
            const x = Math.sin(time * 0.01 + i) * 100 + canvas.width / 2;
            const y = Math.cos(time * 0.008 + i) * 80 + canvas.height / 2;
            const radius = Math.sin(time * 0.02 + i) * 50 + 100;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${0.05 + Math.sin(time * 0.01) * 0.03})`;
            ctx.fill();
        }
        
        time++;
        requestAnimationFrame(drawBackground);
    }
    
    drawBackground();
}

// 打字机效果初始化
function initTypedQuotes() {
    const typed = new Typed('#typed-quotes', {
        strings: wisdomQuotes,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// 热门问题初始化
function initHotQuestions() {
    const container = document.getElementById('hot-questions');
    
    hotQuestions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.className = 'hot-question';
        questionElement.textContent = question;
        questionElement.addEventListener('click', () => {
            document.getElementById('question-input').value = question;
            askQuestion(question);
        });
        container.appendChild(questionElement);
    });
}

// 理念卡片初始化
function initPhilosophyCards() {
    const container = document.getElementById('philosophy-cards');
    const categories = Object.keys(wisdomData);
    
    categories.forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'philosophy-card p-6 fade-in-up';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const categoryData = wisdomData[category];
        const principles = Object.values(categoryData)[0]; // 获取第一组原则
        
        card.innerHTML = `
            <div class="text-center mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-2xl font-bold">${category.charAt(0)}</span>
                </div>
                <h4 class="serif-font text-xl font-bold text-gray-800 mb-2">${category}</h4>
            </div>
            
            <div class="space-y-2 mb-4">
                ${principles.slice(0, 3).map(principle => 
                    `<div class="text-sm text-gray-600 flex items-center space-x-2">
                        <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        <span>${principle}</span>
                    </div>`
                ).join('')}
            </div>
            
            <div class="text-center">
                <button class="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors">
                    深入了解 →
                </button>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `philosophy.html?category=${encodeURIComponent(category)}`;
        });
        
        container.appendChild(card);
    });
}

// 问答功能初始化
function initQAFunction() {
    const questionInput = document.getElementById('question-input');
    const askButton = document.getElementById('ask-button');
    
    // 点击按钮提问
    askButton.addEventListener('click', () => {
        const question = questionInput.value.trim();
        if (question) {
            askQuestion(question);
        }
    });
    
    // 按Enter键提问
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const question = questionInput.value.trim();
            if (question) {
                askQuestion(question);
            }
        }
    });
}

// 提问函数
function askQuestion(question) {
    const answerContainer = document.getElementById('answer-container');
    const answerContent = document.getElementById('answer-content');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    // 显示加载指示器
    loadingIndicator.classList.remove('hidden');
    answerContainer.classList.remove('show');
    
    // 模拟思考过程
    setTimeout(() => {
        const answer = findAnswer(question);
        
        // 隐藏加载指示器
        loadingIndicator.classList.add('hidden');
        
        // 显示回答
        answerContent.innerHTML = formatAnswer(answer);
        answerContainer.classList.remove('hidden');
        
        // 添加显示动画
        setTimeout(() => {
            answerContainer.classList.add('show');
        }, 100);
        
        // 添加打字机效果
        typeAnswer(answerContent, answer.answer);
        
    }, 1500);
}

// 查找答案
function findAnswer(question) {
    // 简单的关键词匹配算法
    const questionLower = question.toLowerCase();
    
    // 直接匹配
    for (let qa of qaPairs) {
        if (question.includes(qa.question) || qa.question.includes(question)) {
            return qa;
        }
    }
    
    // 关键词匹配
    let bestMatch = null;
    let maxScore = 0;
    
    for (let qa of qaPairs) {
        let score = 0;
        for (let keyword of qa.keywords) {
            if (questionLower.includes(keyword.toLowerCase())) {
                score++;
            }
        }
        
        if (score > maxScore) {
            maxScore = score;
            bestMatch = qa;
        }
    }
    
    // 如果找到匹配，返回最佳匹配
    if (bestMatch && maxScore > 0) {
        return bestMatch;
    }
    
    // 默认回答
    return {
        question: question,
        answer: `您的问题很有深度。基于段永平的理念，我建议您从以下几个角度思考：首先，要"做对的事情，把事情做对"；其次，坚持"不懂不做"的原则；最后，保持长期主义的视角。具体情况还需要您结合自身实际深入思考。`,
        category: "通用智慧",
        keywords: ["思考", "原则", "长期"]
    };
}

// 格式化答案
function formatAnswer(qa) {
    return `
        <div class="mb-4">
            <h6 class="font-semibold text-gray-800 mb-2">问题：${qa.question}</h6>
        </div>
        <div class="text-gray-700 leading-relaxed">
            ${qa.answer}
        </div>
        <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <span>分类：${qa.category}</span>
            <span>·</span>
            <span>关键词：${qa.keywords.join('、')}</span>
        </div>
    `;
}

// 打字机效果显示答案
function typeAnswer(element, text) {
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.innerHTML = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 20);
    }, 500);
}

// 导航功能初始化
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 点击外部关闭移动端菜单
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// 滚动动画初始化
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// 粒子效果初始化
function initParticles() {
    const container = document.getElementById('particles-container');
    
    // 创建粒子
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        // 随机位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        container.appendChild(particle);
        
        // 动画
        animateParticle(particle);
    }
    
    function animateParticle(particle) {
        const duration = 3000 + Math.random() * 2000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = startX + (Math.random() - 0.5) * 20;
        const endY = startY + (Math.random() - 0.5) * 20;
        
        particle.animate([
            { 
                left: startX + '%', 
                top: startY + '%', 
                opacity: 0 
            },
            { 
                left: startX + '%', 
                top: startY + '%', 
                opacity: 1,
                offset: 0.1
            },
            { 
                left: endX + '%', 
                top: endY + '%', 
                opacity: 1,
                offset: 0.9
            },
            { 
                left: endX + '%', 
                top: endY + '%', 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        }).onfinish = () => {
            // 重新定位并重新开始动画
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            animateParticle(particle);
        };
    }
}

// 工具函数
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 导出全局函数供其他页面使用
window.WisdomApp = {
    wisdomData,
    qaPairs,
    askQuestion,
    findAnswer
};