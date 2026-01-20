// Estatísticas dinâmicas (simulação de dados em tempo real)
const stats = {
    activeUsers: 1247,
    totalSales: 589,
    activeBots: 2841,
    rating: 4.9
};

// Inicializar estatísticas
function initStats() {
    // Animar números
    animateCounter('activeUsers', stats.activeUsers);
    animateCounter('totalSales', stats.totalSales);
    animateCounter('activeBots', stats.activeBots);
    animateCounter('rating', stats.rating, 1); // 1 decimal
    
    // Simular atualizações em tempo real
    setInterval(() => {
        updateStats();
    }, 5000); // Atualizar a cada 5 segundos
    
    // Observar elementos da timeline
    observeTimeline();
}

// Animar contadores
function animateCounter(elementId, finalValue, decimals = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startValue = 0;
    const duration = 2000; // 2 segundos
    const increment = finalValue / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= finalValue) {
            element.textContent = finalValue.toFixed(decimals);
            element.classList.add('animated');
            clearInterval(timer);
        } else {
            element.textContent = startValue.toFixed(decimals);
        }
    }, 16);
}

// Atualizar estatísticas (simulação)
function updateStats() {
    // Pequenas variações aleatórias para simular dados em tempo real
    const variations = {
        activeUsers: Math.floor(Math.random() * 10) - 5,
        totalSales: Math.floor(Math.random() * 3),
        activeBots: Math.floor(Math.random() * 20) - 10
    };
    
    // Atualizar valores
    stats.activeUsers = Math.max(1200, stats.activeUsers + variations.activeUsers);
    stats.totalSales += variations.totalSales;
    stats.activeBots = Math.max(2800, stats.activeBots + variations.activeBots);
    
    // Atualizar elementos (sem animação para não distrair)
    document.getElementById('activeUsers').textContent = stats.activeUsers;
    document.getElementById('totalSales').textContent = stats.totalSales;
    document.getElementById('activeBots').textContent = stats.activeBots;
}

// Observar timeline para animação
function observeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Atualizar a função setupEventListeners para incluir as estatísticas
function setupEventListeners() {
    // ... código anterior ...
    
    // Inicializar estatísticas quando a página carregar
    initStats();
}

// Adicione também ao final do arquivo script.js (antes das chaves fechando):
// Chamar initStats quando a página carregar
window.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    initStats();
});

// Função para simular "pessoas online agora"
function simulateOnlineUsers() {
    const onlineElement = document.createElement('div');
    onlineElement.className = 'online-users';
    onlineElement.innerHTML = `
        <div class="online-users-content">
            <i class="fas fa-user-friends"></i>
            <span class="online-count">24</span>
            <span>pessoas online agora</span>
        </div>
    `;
    
    document.body.appendChild(onlineElement);
    
    // Adicionar estilo dinâmico
    const style = document.createElement('style');
    style.textContent = `
        .online-users {
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--gradient);
            color: white;
            padding: 12px 20px;
            border-radius: 50px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        }
        
        .online-users-content {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .online-count {
            font-weight: 800;
            font-size: 16px;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes pulseOnline {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .online-users:hover {
            animation: pulseOnline 0.5s ease;
        }
    `;
    
    document.head.appendChild(style);
    
    // Atualizar contador periodicamente
    setInterval(() => {
        const count = Math.floor(Math.random() * 10) + 20; // 20-30 pessoas
        onlineElement.querySelector('.online-count').textContent = count;
    }, 30000); // A cada 30 segundos
}

// Chamar a simulação após um tempo
setTimeout(simulateOnlineUsers, 3000);
