// FIXED VERSION - Interactive E-Bot with easier toggle, auto-open, typing indicator
// Copy this to script.js if needed, or test this.

const weatherData = {
    newyork: { condition: 'sunny', temp: '25°C', description: 'Sunny', forecast: 'Clear skies! 🌞' },
    london: { condition: 'rainy', temp: '15°C', description: 'Rainy', forecast: 'Showers 🌧️' },
    tokyo: { condition: 'cloudy', temp: '20°C', description: 'Cloudy', forecast: 'Partly cloudy ☁️' }
};

let userHistory = JSON.parse(sessionStorage.getItem('weatherHistory')) || [];
let botTyping = false;

const cards = document.querySelectorAll('.weather-card');
const body = document.body;
const popup = document.getElementById('forecast-popup');
const popupCity = document.getElementById('popup-city');
const popupForecast = document.getElementById('popup-forecast');
const closePopup = document.querySelector('.close');
const eBot = document.getElementById('e-bot');
const eBotBody = document.querySelector('.e-bot-body');
const toggleIcon = document.querySelector('.toggle-icon');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');
const toggleHistory = document.getElementById('toggle-history');

let confettiCtx;

document.addEventListener('DOMContentLoaded', function() {
    console.log('E-Bot Init started');
    setupConfetti();
    setupEvents();
    updateHistoryDisplay();
    console.log('E-Bot Init complete');
});

function setupConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:1001;width:100%;height:100%;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confettiCtx = ctx;
}

function setupEvents() {
    // FIXED: Toggle on entire bot when closed, header always
    eBot.addEventListener('click', function(e) {
        console.log('Bot click detected');
        if (!eBot.classList.contains('e-bot-open')) {
            openBot();
        }
    });

    eBot.querySelector('.e-bot-header').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleBot();
    });

    cards.forEach(card => card.addEventListener('click', function() {
        exploreCity(card.dataset.city);
    }));

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => e.key === 'Enter' && sendMessage());

    toggleHistory.addEventListener('click', toggleHistorySection);

    closePopup.addEventListener('click', () => popup.classList.add('hidden'));
    popup.addEventListener('click', e => e.target === popup && popup.classList.add('hidden'));

    chatInput.focus();
}

function toggleBot() {
    console.log('Toggling bot');
    eBot.classList.toggle('e-bot-open');
    eBotBody.classList.toggle('hidden');
}

function openBot() {
    console.log('Opening bot');
    eBot.classList.add('e-bot-open');
    eBotBody.classList.remove('hidden');
    toggleIcon.style.transform = 'rotate(180deg)';
    chatInput.focus();
}

function exploreCity(city) {
    const data = weatherData[city];
    body.className = data.condition + '-theme';
    popupCity.textContent = data.description.toUpperCase();
    popupForecast.textContent = data.forecast;
    popup.classList.remove('hidden');

    const timestamp = new Date().toLocaleString();
    const item = { city: city.toUpperCase(), temp: data.temp, time: timestamp };
    if (!userHistory.some(h => h.city === item.city)) {
        userHistory.unshift(item);
        sessionStorage.setItem('weatherHistory', JSON.stringify(userHistory));
        updateHistoryDisplay();
        if (!eBot.classList.contains('e-bot-open')) openBot();
        setTimeout(() => addBotMessage(`Great! ${item.city} ${data.description.toLowerCase()}. History updated! ${userHistory.length}/3`), 500);
        if (userHistory.length === 3) celebrate();
    }
}

function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addUserMessage(msg);
    chatInput.value = '';
    chatInput.focus();

    botTyping = true;
    addTypingIndicator();
    const lower = msg.toLowerCase();
    setTimeout(() => {
        botTyping = false;
        document.querySelector('.typing-indicator')?.remove();
        if (lower.includes('history')) {
            toggleHistorySection();
            addBotMessage('Your history below! 📜');
        } else if (lower.includes('motivate')) {
            addBotMessage(`You&apos;ve explored ${userHistory.length}/3 cities! Amazing! 🌟`);
        } else {
            addBotMessage('Hi! Try "history" or "motivate". Click cities to start! 🤖');
        }
    }, 1000 + Math.random()*1000);
}

function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'message user-message';
    div.textContent = `You: ${text}`;
    chatMessages.appendChild(div);
    scrollChat();
}

function addBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'message bot-message';
    div.innerHTML = `<strong>E-Bot:</strong> ${text}`;
    chatMessages.appendChild(div);
    scrollChat();
}

function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'message bot-message typing-indicator';
    div.innerHTML = '<strong>E-Bot:</strong> Typing<span>.</span><span>.</span><span>.</span>';
    chatMessages.appendChild(div);
    scrollChat();
}

function scrollChat() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function toggleHistorySection() {
    historySection.classList.toggle('hidden');
}

function updateHistoryDisplay() {
    historyList.innerHTML = userHistory.slice(0,5).map(item => `
        <div class="history-item">
            <i class="fas fa-map-marker-alt"></i>
            <div><strong>${item.city}</strong><br><small>${item.temp} - ${item.time}</small></div>
        </div>
    `).join('') || '<p style="padding:20px;color:#666">No history. Explore! 🚀</p>';
}

function celebrate() {
    addBotMessage('🎉 Weather Master! All 3 cities done! 🏆');
    // Simple confetti
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
    let pieces = 100;
    function anim() {
        confettiCtx.clearRect(0,0,confettiCtx.canvas.width,confettiCtx.canvas.height);
        for(let i=0;i<pieces;i++) {
            const x = Math.random()*confettiCtx.canvas.width;
            const y = Math.random()*confettiCtx.canvas.height - confettiCtx.canvas.height;
            confettiCtx.fillStyle = colors[Math.floor(Math.random()*4)];
            confettiCtx.fillRect(x, y, 4, 4);
        }
        pieces > 0 && (pieces--, requestAnimationFrame(anim));
    }
    anim();
}

