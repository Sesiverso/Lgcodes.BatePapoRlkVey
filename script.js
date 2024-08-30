// Inicializa votos se não existirem
if (!localStorage.getItem('voted')) {
    localStorage.setItem('voted', 'false');
}

// Inicializa contadores de votos se não existirem
const initializeVotes = () => {
    const options = ['Tenho mas não posso levar', 'Não', 'Tenho e posso levar'];
    options.forEach(option => {
        if (!localStorage.getItem(`count-${option}`)) {
            localStorage.setItem(`count-${option}`, '0');
        }
    });
};

// Função para carregar e exibir os votos
const loadVotes = () => {
    const options = ['Tenho mas não posso levar', 'Não', 'Tenho e posso levar'];
    options.forEach(option => {
        const count = parseInt(localStorage.getItem(`count-${option}`), 10);
        document.getElementById(`count-${option}`).textContent = count;
    });
};

// Função para enviar voto
function submitVote() {
    if (localStorage.getItem('voted') === 'true') {
        alert('Você já votou!');
        return;
    }
    
    const selectedOption = document.querySelector('input[name="material"]:checked');
    if (!selectedOption) {
        alert('Selecione uma opção para votar.');
        return;
    }
    
    const option = selectedOption.value;
    localStorage.setItem('voted', 'true');
    
    const counts = {
        'Tenho mas não posso levar': parseInt(localStorage.getItem('count-Tenho mas não posso levar'), 10),
        'Não': parseInt(localStorage.getItem('count-Não'), 10),
        'Tenho e posso levar': parseInt(localStorage.getItem('count-Tenho e posso levar'), 10)
    };
    
    counts[option]++;
    
    localStorage.setItem(`count-${option}`, counts[option]);
    
    loadVotes();
}

// Função para enviar mensagem no chat
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    displayMessages();
    messageInput.value = '';
}

// Função para exibir mensagens do chat
function displayMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg;
        messagesDiv.appendChild(messageElement);
    });
    
    // Rolagem automática para a mensagem mais recente
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Carregar votos e mensagens ao carregar a página
window.onload = () => {
    initializeVotes();
    loadVotes();
    displayMessages();
};

