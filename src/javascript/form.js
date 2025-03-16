const form = document.querySelector('form');
const email = document.querySelector('#email');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    console.log("Fui chamado");

    const emailValue = email.value.trim();

    if (emailValue === "") {
        setErrorFor(email, 'O email é obrigatório');
    } else if(!checkEmail(emailValue)){
        setErrorFor(email, 'Insira um email válido')
    } else {
        setSuccessFor(email);
    }
}

function setErrorFor(input, message) {
    const inputSection = input.parentElement;
    const small = inputSection.querySelector('small');

    small.innerText = message;
    inputSection.className = 'input-section error';
}

function setSuccessFor(input) {
    const inputSection = input.parentElement;
    inputSection.className = 'input-section success';
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }