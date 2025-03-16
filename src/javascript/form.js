const form = document.getElementById('form_container');
const username = document.getElementById('name');
const email = document.getElementById('email');
const github = document.getElementById('github');

form.addEventListener('submit', (e) => { 
  e.preventDefault();

  checkInputs();
});

function checkInputs(){
    const nameValue = username.value;
    const emailValue = email.value;
    const githubValue = github.value;

    if(nameValue === ''){
        setErrorFor(username, 'Name cannot be blank');
    } else {
        setSuccessFor(username);
    }
}

function setErrorFor(input, message){
    const form_container = input.parentElement;
    const small = form_container.querySelector('small');

    small.innerText = message;

    form_container.class = 'form_container error';
}

function setSuccessFor(input){
    const form_container = input.parentElement;

    form_container.class = 'form_container sucess';
}