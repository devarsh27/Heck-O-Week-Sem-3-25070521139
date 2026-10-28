// FIXED Interactive E-Bot - Now responds reliably
const weatherData = {
    newyork: { condition: 'sunny', temp: '25°C', description: 'Sunny', forecast: 'Clear skies ahead! Perfect day 🌞' },
    london: { condition: 'rainy', temp: '15°C', description: 'Rainy', forecast: 'Showers today ☔' },
    tokyo: { condition: 'cloudy', temp: '20°C', description: 'Cloudy', forecast: 'Partly cloudy ☁️' }
};

let userHistory = JSON.parse(sessionStorage.getItem('weatherHistory')) || [];
let botTyping = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ E-Bot loading...');
    setupElements();
    updateHistory();
    console.log('✅ E-Bot ready!');
});

function setupElements() {
    const eBot = document.getElementById('e-bot');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const historyList = document.getElementById('history-list');
    const cards = document.querySelectorAll('.weather-card');
    const body = document.body;
    const popup = document.getElementById('forecast-popup');

    // Easy toggle - click anywhere on closed bot
    eBot.addEventListener('click', function(e) {
        if (!eBot.classList.contains('e-bot-open') && !e.target.closest('.e-bot-body')) {
            eBot.classList.add('e-bot-open');
            document.querySelector('.e-bot-body').classList.remove('hidden');
            document.querySelector('.toggle-icon').style.transform = 'rotate(180deg)';
            chatInput.focus();
            console.log('🔓 Bot opened');
        }
    });

    // City clicks
    cards.forEach(card => card.addEventListener('click', () => {
        const city = card.dataset.city;
        const data = weatherData[city];
        body.className = data.condition + '-theme';
        document.getElementById('popup-city').textContent = data.description.toUpperCase();
        document.getElementById('popup-forecast').textContent = data.forecast;
        popup.classList.remove('hidden');
        
        // History
        if (!userHistory.some(h => h.city === city.toUpperCase())) {
            userHistory.unshift({city: city.toUpperCase(), temp: data.temp, time: new Date().toLocaleString()});
            sessionStorage.setItem('weatherHistory', JSON.stringify(userHistory));
            updateHistory();
            addMessage(`Great! ${city.toUpperCase()} added to history (${userHistory.length}/3) 👏`, 'bot');
            if (userHistory.length === 3) confetti();
        }
        openBot();
    }));

    // Chat send
    function sendChat() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMessage(msg, 'user');
        chatInput.value = '';
        chatInput.focus();
        
        // Typing...
        botTyping = true;
        const typingDiv = addTyping();
        setTimeout(() => {
            botTyping = false;
            typingDiv.remove();
            const lower = msg.toLowerCase();
            let response = '';
            if (lower.includes('history')) {
                response = 'Your history shown! 📜';
            } else if (lower.includes('motivate')) {
                response = `Excellent explorer! ${userHistory.length}/3 cities done 🌟`;
            } else if (lower.includes('hi') || lower.includes('hello')) {
                response = 'Hi! Ready to explore weather? 😊';
            } else {
                response = 'Try "history", "motivate" or click cities! 🤖';
            }
            addMessage(response, 'bot');
        }, 1200);
    }
    sendBtn.onclick = chatInput.onkeypress = e => (e.type === 'click' || e.key === 'Enter') && sendChat();
    
    // History toggle
    document.getElementById('toggle-history').onclick = () => historySection.classList.toggle('hidden');
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.innerHTML = `<strong>${sender === 'user' ? 'You' : 'E-Bot'}:</strong> ${text}`;
    document.getElementById('chat-messages').appendChild(div);
    div.scrollIntoView();
}

function addTyping() {
    const div = document.createElement('div');
    div.className = 'message bot-message';
    div.textContent = 'E-Bot: Typing';
    document.getElementById('chat-messages').appendChild(div);
    div.scrollIntoView();
    return div;
}

function updateHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = userHistory.slice(0,5).map(item => 
        `<div class="history-item"><i class="fas fa-map-marker-alt"></i>${item.city} ${item.temp}<br><small>${item.time}</small></div>`
    ).join('') || '<p>No history yet - explore cities!</p>';
}

function confetti() {
    addMessage('🎉 Weather Master! All cities explored! 🏆', 'bot');
    // Canvas confetti
    const canvas = document.getElementById('confetti-canvas') || (() => {
        const c = document.createElement('canvas');
        c.id = 'confetti-canvas';
        c.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:1001';
        document.body.appendChild(c);
        return c;
    })();
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    let animationId;
    const animate = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<100;i++) {
            ctx.fillStyle = `hsl(${Math.random()*360},70%,60%)`;
            ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 6, 6);
        }
        animationId = requestAnimationFrame(animate);
    };
    animate();
    setTimeout(() => cancelAnimationFrame(animationId), 3000);
}

function openBot() {
    const eBot = document.getElementById('e-bot');
    eBot.classList.add('e-bot-open');
    document.querySelector('.e-bot-body').classList.remove('hidden');
    document.querySelector('.toggle-icon').style.transform = 'rotate(180deg)';
    document.getElementById('chat-input').focus();
}

// Close popup
document.querySelector('.close').onclick = () => document.getElementById('forecast-popup').classList.add('hidden');
