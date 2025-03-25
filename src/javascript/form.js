const form = document.querySelector('form');
const email = document.querySelector('#email');
const imagem = document.querySelector('#image');
const name = document.querySelector('#fullName');
const gitHub = document.querySelector('#github');
const uploadIcon = document.querySelector('.input_img_section img');
const removeButton = document.querySelector('#remove');
const changeButton = document.querySelector('#change');

const MAX_IMAGE_SIZE = 500 * 1024; 
const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg'];

imagem.addEventListener('change', () => {
    if (imagem.files && imagem.files[0]) {
        const file = imagem.files[0];

        if (VALID_IMAGE_TYPES.includes(file.type)) {
            const reader = new FileReader();

            reader.onload = (e) => {
                uploadIcon.src = e.target.result;
                uploadIcon.alt = 'Imagem carregada';
                setSuccessForImage();
            };

            reader.readAsDataURL(file);
        } else {
            setErrorForImage('Formato de imagem inválido. Apenas PNG ou JPEG são permitidos.');
        }
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

removeButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetImageInput();
});

changeButton.addEventListener('click', (e) => {
    e.preventDefault();
    imagem.click();
});

function checkInputs() {
    const emailValue = email.value.trim();
    const nameValue = name.value.trim();
    const gitHubValue = gitHub.value.trim();

    const emailValid = validateEmail(emailValue);
    const nameValid = validateName(nameValue);
    const gitHubValid = validateGitHub(gitHubValue);
    const imagemValid = validateImage(imagem);

    if (emailValid && nameValid && gitHubValid && imagemValid) {
        saveDataToSessionStorage(emailValue, nameValue, gitHubValue, imagem.files[0]);
    }
}

function validateEmail(emailValue) {
    if (emailValue === "") {
        setErrorFor(email, 'O email é obrigatório');
        return false;
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, 'Insira um email válido');
        return false;
    } else {
        setSucessFor(email);
        return true;
    }
}

function validateName(nameValue) {
    if (nameValue === "") {
        setErrorFor(name, 'O nome é obrigatório');
        return false;
    } else {
        setSucessFor(name);
        return true;
    }
}

function validateGitHub(gitHubValue) {
    if (gitHubValue === "") {
        setErrorFor(gitHub, 'O usuário é obrigatório');
        return false;
    } else {
        setSucessFor(gitHub);
        return true;
    }
}

function validateImage(imagem) {
    const formInfoSection = document.querySelector('.form_info_section');
    const small = formInfoSection.querySelector('small');

    if (imagem.files.length === 0) {
        setErrorForImage('É obrigatório carregar uma foto');
        return false;
    } else {
        const imagemFile = imagem.files[0];
        if (!VALID_IMAGE_TYPES.includes(imagemFile.type)) {
            setErrorForImage('A imagem deve ser PNG ou JPEG');
            return false;
        } else if (imagemFile.size > MAX_IMAGE_SIZE) {
            setErrorForImage('A imagem deve ser menor que 500KB');
            return false;
        } else {
            setSuccessForImage(); 
            return true;
        }
    }
}

function saveDataToSessionStorage(emailValue, nameValue, gitHubValue, imagemFile) {
    const reader = new FileReader();
    reader.onload = () => {
        sessionStorage.setItem('userData', JSON.stringify({
            name: nameValue,
            email: emailValue,
            github: gitHubValue,
            image: reader.result
        }));
        window.location.href = '/src/pages/ticketPage.html';
    };
    reader.readAsDataURL(imagemFile);
}

function resetImageInput() {
    uploadIcon.src = '/src/assets/images/icon-upload.svg';
    uploadIcon.alt = 'Upload icon';

    const p = document.querySelector('.input_img_section p');
    const buttons = document.querySelector('.input_img_section_buttons');
    const formInfoSection = document.querySelector('.form_info_section');
    const small = formInfoSection.querySelector('small');

    small.innerText = 'Carregue sua foto (JPG ou PNG, máximo: 500KB).';
    formInfoSection.className = 'form_info_section';

    p.style.visibility = 'visible';
    buttons.style.visibility = 'hidden';

    imagem.value = '';
}

function setErrorFor(input, message) {
    const inputSection = input.parentElement;
    const small = inputSection.querySelector('small');

    small.innerText = message;
    inputSection.className = 'input-section error';
}

function setSucessFor(input) {
    const inputSection = input.parentElement;
    const small = inputSection.querySelector('small');

    small.innerText = "";
    inputSection.className = 'input-section sucess';
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
    const formInfoSection = document.querySelector('.form_info_section');
    const small = formInfoSection.querySelector('small');

    small.innerText = "";
    formInfoSection.className = 'form_info_section sucess';

    p.style.visibility = 'hidden';
    buttons.style.visibility = 'visible';
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}