// Armazenamento de votos no localStorage
if (!localStorage.getItem('voted')) {
    localStorage.setItem('voted', 'false');
}

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
    
    const material = selectedOption.value;
    localStorage.setItem('voted', 'true');
    
    // Atualiza contagem de votos (isso é apenas um exemplo, você precisaria integrar com um backend para armazenar dados reais)
    const counts = {
        'Algodão': parseInt(localStorage.getItem('count-algodao') || '0', 10),
        'Lã': parseInt(localStorage.getItem('count-la') || '0', 10),
        'Sintético': parseInt(localStorage.getItem('count-sintetico') || '0', 10)
    };
    
    counts[material]++;
    
    localStorage.setItem('count-algodao', counts['Algodão']);
    localStorage.setItem('count-la', counts['Lã']);
    localStorage.setItem('count-sintetico', counts['Sintético']);
    
    document.getElementById('count-algodao').textContent = counts['Algodão'];
    document.getElementById('count-la').textContent = counts['Lã'];
    document.getElementById('count-sintetico').textContent = counts['Sintético'];
}

// Função para enviar mensagem no chat
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    
    document.getElementById('messages').appendChild(messageElement);
    messageInput.value = '';
    
    // Rolagem automática para a mensagem mais recente
    const messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
