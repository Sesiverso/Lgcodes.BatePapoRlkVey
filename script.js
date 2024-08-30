// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuYhMag13uhVsYGo6KFkGFF5COH9fMWGI",
  authDomain: "votacao-8176a.firebaseapp.com",
  projectId: "votacao-8176a",
  storageBucket: "votacao-8176a.appspot.com",
  messagingSenderId: "444026858821",
  appId: "1:444026858821:web:a59af301c2fb43eeac222c",
  measurementId: "G-BEQ9LWFRCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// References to Firestore and Storage
const messagesRef = collection(db, "messages");

// Function to send a message
async function sendMessage(text, file) {
    try {
        let fileUrl = null;
        if (file) {
            // Upload file
            const fileRef = ref(storage, `chat-uploads/${file.name}`);
            await uploadBytes(fileRef, file);
            fileUrl = await getDownloadURL(fileRef);
        }
        
        // Add message to Firestore
        await addDoc(messagesRef, {
            text: text || '',
            fileUrl: fileUrl || '',
            timestamp: new Date()
        });
    } catch (error) {
        console.error("Error sending message: ", error);
    }
}

// Function to display messages
function displayMessages(snapshot) {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = ''; // Clear existing messages

    snapshot.forEach(doc => {
        const message = doc.data();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        
        // Add profile picture and name
        const profilePic = 'path_to_profile_picture'; // Replace with actual profile picture URL
        const name = 'User Name'; // Replace with actual user name
        messageElement.innerHTML = `
            <div class="message-header">
                <img src="${profilePic}" class="profile-pic" alt="Profile Picture">
                <span class="user-name">${name}</span>
            </div>
            <div class="message-body">
                ${message.text ? `<p>${message.text}</p>` : ''}
                ${message.fileUrl ? `<a href="${message.fileUrl}" target="_blank">View File</a>` : ''}
            </div>
        `;
        messagesDiv.appendChild(messageElement);
    });
}

// Set up Firestore listener
const messagesQuery = query(messagesRef, orderBy("timestamp"));
onSnapshot(messagesQuery, displayMessages);

// Handle sending message and file
document.getElementById("sendButton").addEventListener("click", () => {
    const messageInput = document.getElementById("messageInput");
    const fileInput = document.getElementById("fileInput");

    const text = messageInput.value;
    const file = fileInput.files[0];

    if (text || file) {
        sendMessage(text, file);
        messageInput.value = '';
        fileInput.value = ''; // Clear file input
    }
});
