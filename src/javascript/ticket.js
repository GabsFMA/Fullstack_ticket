document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const { day, month, year } = getCurrentDate();

    if (userData) {
       
        document.querySelector('.congrats span').textContent = userData.name;
       
        document.querySelector('.email_message span').textContent = userData.email;
        
        document.querySelector('.user_github span').textContent = `${userData.github}`;

        document.querySelector('.ticket_id p').textContent = createRandomId(6);

        document.querySelector('.location').textContent = `${day} de ${month}, ${year} / Salvador, BA`;
    
        const userPicture = document.querySelector('.user_picture img');
        userPicture.src = userData.image;
        userPicture.alt = `Foto de ${userData.name}`;

        document.querySelector('.user_name span').textContent = userData.name;
    }
});

function createRandomId(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "#";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
function getCurrentDate() {
    const today = new Date();

    const day = today.getDate(); 
    const month = today.toLocaleString('default', { month: 'long' }); 
    const year = today.getFullYear(); 

    return { day, month, year };
}

window.addEventListener('beforeunload', () => {
  sessionStorage.clear();
});