const form = document.querySelector('form');
const email = document.querySelector('#email');
const imagem = document.querySelector('#image');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    console.log("Fui chamado");

    const emailValue = email.value.trim();
    const imagemFile = imagem.files[0];

    if (emailValue === "") {
        setErrorFor(email, 'O email é obrigatório');
    } else if(!checkEmail(emailValue)){
        setErrorFor(email, 'Insira um email válido')
    } else {
        setSuccessFor(email);
    }

    if (imagemFile) {
        if (imagemFile.size > 500 * 1024) {
            console.log(`Imagem muito grande: ${imagemFile.size / 1024} KB`);
            setErrorForImage(imagem, 'A imagem deve ser menor que 500KB');
        } else {
            console.log(`Imagem válida: ${imagemFile.size / 1024} KB`);
            setSuccessFor(imagem);
        }
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
    const img = formInfoSection.querySelector('icon');

    small.innerText = message; 
    formInfoSection.className = 'form_info_section error'; 
    
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }