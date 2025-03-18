const form = document.querySelector('form');
const email = document.querySelector('#email');
const imagem = document.querySelector('#image');
const name = document.querySelector('#fullName');
const gitHub = document.querySelector('#github');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
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
    }
}

function setErrorFor(input, message) {
    const inputSection = input.parentElement;
    const small = inputSection.querySelector('small');

    small.innerText = message;
    inputSection.className = 'input-section error';
}

function setErrorForImage(input, message) {
    const formInfoSection = document.querySelector('.form_info_section'); 
    const small = formInfoSection.querySelector('small'); 

    small.innerText = message; 
    formInfoSection.className = 'form_info_section error'; 
    
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }