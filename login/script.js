const loginbtn = document.querySelector('#login')
const registerbtn = document.querySelector('#register')
const loginform = document.querySelector('.login-form')
const registerform = document.querySelector('.register-form')

loginbtn.addEventListener('click', () => {
    loginbtn.style.backgroundColor = '#21264D';
    registerbtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';

    loginform.style.left = '50%';
    registerform.style.left = '50%';

    loginform.style.opacity = 1;
    registerform.style.opacity = 0;
})

registerbtn.addEventListener('click', () => {
    loginbtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    registerbtn.style.backgroundColor = '#21264D';

    loginform.style.left = '150%';
    registerform.style.left = '50%';

    loginform.style.opacity = 0;
    registerform.style.opacity = 1;
})