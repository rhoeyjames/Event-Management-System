import { initAuth } from './auth.js';
import { initEvents } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initEvents();
  
  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (token) {
    document.querySelector('#loginLink').style.display = 'none';
    document.querySelector('#registerLink').style.display = 'none';
  } else {
    document.querySelector('#eventsLink').style.display = 'none';
  }
}); 