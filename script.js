import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCuYhMag13uhVsYGo6KFkGFF5COH9fMWGI",
    authDomain: "votacao-8176a.firebaseapp.com",
    projectId: "votacao-8176a",
    storageBucket: "votacao-8176a.appspot.com",
    messagingSenderId: "444026858821",
    appId: "1:444026858821:web:a59af301c2fb43eeac222c",
    measurementId: "G-BEQ9LWFRCS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Envia uma mensagem para o Firebase
const sendMessage = (message, imageUrl = null) => {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
        message: message,
        imageUrl: imageUrl,
        timestamp: Date.now()
    });
};

// Exibe as mensagens do Firebase
const loadMessages = () => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const messageData = childSnapshot.val();
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <p>${messageData.message}</p>
                ${messageData.imageUrl ? `<img src="${messageData.imageUrl}" alt="Uploaded Image">` : ''}
                <span class="timestamp">${new Date(messageData.timestamp).toLocaleTimeString()}</span>
            `;
            messagesContainer.appendChild(messageElement);
        });
    });
};

// Envia uma mensagem com imagem
const uploadImage = (file) => {
    const imageRef = storageRef(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            const message = document.getElementById('message').value;
            sendMessage(message, downloadURL);
            document.getElementById('message').value = '';
            document.getElementById('imageUpload').value = '';
        });
    });
};

// Manipula o envio do formulário
document.getElementById('chatForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const messageInput = document.getElementById('message');
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (file) {
        uploadImage(file);
    } else {
        sendMessage(messageInput.value);
        messageInput.value = '';
    }
});

// Carrega as mensagens ao iniciar
loadMessages();
