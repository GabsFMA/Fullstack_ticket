const form = document.querySelector('form');
const email = document.querySelector('#email');
const imagem = document.querySelector('#image');
const name = document.querySelector('#fullName');
const gitHub = document.querySelector('#github');
const uploadIcon = document.querySelector('.input_img_section img');
const removeButton = document.querySelector('#remove');
const changeButton = document.querySelector('#change');

imagem.addEventListener('change', () => {
    if (imagem.files && imagem.files[0]) {
        const file = imagem.files[0];
        const validImageTypes = ['image/png', 'image/jpeg'];

        if (validImageTypes.includes(file.type)) {
            const reader = new FileReader();

            reader.onload = (e) => {
                uploadIcon.src = e.target.result; 
                uploadIcon.alt = 'Imagem carregada'; 
                setSuccessForImage();
            };

            reader.readAsDataURL(file); 
        } else {
            console.log('Formato de imagem inválido. Apenas PNG ou JPEG são permitidos.');
        }
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

removeButton.addEventListener('click', (e) => {
    e.preventDefault();
    uploadIcon.src = '/src/assets/images/icon-upload.svg';
    uploadIcon.alt = 'Upload icon';

    const p = document.querySelector('.input_img_section p'); 
    const buttons = document.querySelector('.input_img_section_buttons'); 

    p.style.visibility = 'visible'; 
    buttons.style.visibility = 'hidden'; 

    imagem.value = '';
});

changeButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    imagem.click();
});

function checkInputs() {
    console.log("Fui chamado");

    const emailValue = email.value.trim();
    const imagemFile = imagem.files[0];
    const nameValue = name.value.trim();    
    const gitHubValue = gitHub.value.trim();

    let emailValid = false;
    let imagemValid = false;
    let nameValid = false;
    let gitHubValid = false;

    if (emailValue === "") {
        setErrorFor(email, 'O email é obrigatório');
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, 'Insira um email válido');
    } else {
        emailValid = true;
    }

    if (nameValue === "") {
        setErrorFor(name, 'O nome é obrigatório');
    } else {
        nameValid = true;
    }

    if (gitHubValue === "") {
        setErrorFor(gitHub, 'O usuário é obrigatório');
    } else{
        gitHubValid = true;
    }

    if (imagem.files.length === 0) {
        setErrorForImage(imagem, 'É obrigatório carregar uma foto');
    } else {
        const imagemFile = imagem.files[0];
        const validImageTypes = ['image/png', 'image/jpeg'];
        if (!validImageTypes.includes(imagemFile.type)) {
            setErrorForImage(imagem, 'A imagem deve ser PNG ou JPEG');
        } else if (imagemFile.size > 500 * 1024) {
            setErrorForImage(imagem, 'A imagem deve ser menor que 500KB');
        } else {
            console.log(`Imagem válida: ${imagemFile.size / 1024} KB`);
            imagemValid = true;
        }
    }

    if (emailValid && imagemValid && nameValid && gitHubValid) {
        console.log("Dados aprovados:");
        console.log(`Imagem: ${imagemFile.name}, Tamanho: ${(imagemFile.size / 1024).toFixed(2)} KB, Tipo: ${imagemFile.type}`);
        console.log(`Nome: ${nameValue}`);
        console.log(`Email: ${emailValue}`);
        console.log(`GitHub: ${gitHubValue}`);
        window.location.href = '/src/pages/ticketPage.html';
    }
}

function setErrorFor(input, message) {
    const inputSection = input.parentElement;
    const small = inputSection.querySelector('small');

    small.innerText = message;
    inputSection.className = 'input-section error';
}

function setErrorForImage(message) {
    const formInfoSection = document.querySelector('.form_info_section'); 
    const small = formInfoSection.querySelector('small'); 

    small.innerText = message; 
    formInfoSection.className = 'form_info_section error'; 
    
}
function setSuccessForImage() {
    const p = document.querySelector('.input_img_section p'); 
    const buttons = document.querySelector('.input_img_section_buttons'); 

    p.style.visibility = 'hidden'; 
    buttons.style.visibility = 'visible'; 
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  