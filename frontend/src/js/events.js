const API_URL = 'http://localhost:5000/api';

export function initEvents() {
  const eventsLink = document.querySelector('#eventsLink');
  eventsLink.addEventListener('click', showEvents);
}

async function showEvents(e) {
  e.preventDefault();
  const mainContent = document.querySelector('#mainContent');
  
  try {
    const response = await fetch(`${API_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const events = await response.json();
    
    mainContent.innerHTML = `
      <div class="events-container">
        <h2>Events</h2>
        <button class="btn" id="createEventBtn">Create New Event</button>
        <div class="events-list">
          ${events.map(event => `
            <div class="event-card">
              <h3>${event.title}</h3>
              <p>${event.description}</p>
              <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
              <p>Location: ${event.location}</p>
              <p>Budget: $${event.budget}</p>
              <p>Status: ${event.status}</p>
              <button class="btn view-event" data-id="${event._id}">View Details</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.querySelector('#createEventBtn').addEventListener('click', showCreateEventForm);
    document.querySelectorAll('.view-event').forEach(btn => {
      btn.addEventListener('click', () => viewEvent(btn.dataset.id));
    });
  } catch (error) {
    mainContent.innerHTML = '<p>Error loading events</p>';
  }
}

function showCreateEventForm() {
  const mainContent = document.querySelector('#mainContent');
  mainContent.innerHTML = `
    <div class="form-container">
      <h2>Create New Event</h2>
      <form id="createEventForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" required>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="datetime-local" id="date" required>
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input type="text" id="location" required>
        </div>
        <div class="form-group">
          <label for="budget">Budget:</label>
          <input type="number" id="budget" required>
        </div>
        <button type="submit" class="btn">Create Event</button>
      </form>
    </div>
  `;

  document.querySelector('#createEventForm').addEventListener('submit', handleCreateEvent);
}

async function handleCreateEvent(e) {
  e.preventDefault();
  const eventData = {
    title: document.querySelector('#title').value,
    description: document.querySelector('#description').value,
    date: document.querySelector('#date').value,
    location: document.querySelector('#location').value,
    budget: document.querySelector('#budget').value
  };

  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      showEvents(e);
    } else {
      alert('Error creating event');
    }
  } catch (error) {
    alert('Error creating event');
  }
}

async function viewEvent(eventId) {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const event = await response.json();
    
    const mainContent = document.querySelector('#mainContent');
    mainContent.innerHTML = `
      <div class="event-details">
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
        <p>Location: ${event.location}</p>
        <p>Budget: $${event.budget}</p>
        <p>Status: ${event.status}</p>
        
        <h3>Guests</h3>
        <div class="guests-list">
          ${event.guests.map(guest => `
            <div class="guest-card">
              <p>Name: ${guest.user.name}</p>
              <p>RSVP Status: ${guest.rsvpStatus}</p>
            </div>
          `).join('')}
        </div>
        
        <h3>Vendors</h3>
        <div class="vendors-list">
          ${event.vendors.map(vendor => `
            <div class="vendor-card">
              <p>Company: ${vendor.companyName}</p>
              <p>Service: ${vendor.serviceType}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (error) {
    alert('Error loading event details');
  }
} 