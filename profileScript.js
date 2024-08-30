document.getElementById('profileForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const fileInput = document.getElementById('profileImage');
    const userName = document.getElementById('userName').value;
    const profilePic = document.getElementById('profilePic');
    const profileName = document.getElementById('profileName');
    
    if (fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            profilePic.src = e.target.result;
        };
        
        reader.readAsDataURL(fileInput.files[0]);
    }
    
    profileName.textContent = userName;
});
