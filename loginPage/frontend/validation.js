const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let errors = []

  if (firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    )

    if (errors.length === 0) {
      try {
        const response = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: firstname_input.value,
            email: email_input.value,
            password: password_input.value
          })
        })
        const data = await response.json()
        if (response.ok) {
          alert(data.message)
          window.location.href = 'login.html'
        } else {
          error_message.innerText = data.message || 'Něco se pokazilo.'
        }
      } catch (error) {
        error_message.innerText = 'Chyba připojení na server.'
      }
    }
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value)

    if (errors.length === 0) {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email_input.value,
            password: password_input.value
          })
        })
        const data = await response.json()
        if (response.ok) {
          alert(data.message)
          // případně přesměrování nebo další akce
        } else {
          error_message.innerText = data.message || 'Neplatné přihlašovací údaje.'
        }
      } catch (error) {
        error_message.innerText = 'Chyba připojení na server.'
      }
    }
  }

  if (errors.length > 0) {
    error_message.innerText = errors.join('. ')
  }
})

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = []

  if (!firstname) {
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if (!email) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (!password) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

function getLoginFormErrors(email, password) {
  let errors = []

  if (!email) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (!password) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(i => i != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
