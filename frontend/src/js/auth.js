const API_URL = 'http://localhost:5000/api';

export function initAuth() {
  const loginLink = document.querySelector('#loginLink');
  const registerLink = document.querySelector('#registerLink');

  loginLink.addEventListener('click', showLoginForm);
  registerLink.addEventListener('click', showRegisterForm);
}

function showLoginForm(e) {
  e.preventDefault();
  const mainContent = document.querySelector('#mainContent');
  mainContent.innerHTML = `
    <div class="form-container">
      <h2>Login</h2>
      <form id="loginForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" required>
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
    </div>
  `;

  document.querySelector('#loginForm').addEventListener('submit', handleLogin);
}

function showRegisterForm(e) {
  e.preventDefault();
  const mainContent = document.querySelector('#mainContent');
  mainContent.innerHTML = `
    <div class="form-container">
      <h2>Register</h2>
      <form id="registerForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" required>
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" required>
            <option value="guest">Guest</option>
            <option value="planner">Event Planner</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
        <button type="submit" class="btn">Register</button>
      </form>
    </div>
  `;

  document.querySelector('#registerForm').addEventListener('submit', handleRegister);
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.reload();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error logging in');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const role = document.querySelector('#role').value;

  try {
    console.log('Sending registration request:', { name, email, role }); // Debug log

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();
    console.log('Registration response:', data); // Debug log

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.reload();
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    alert('Error registering: ' + (error.message || 'Unknown error'));
  }
} 