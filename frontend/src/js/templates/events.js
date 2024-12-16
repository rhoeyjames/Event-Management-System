export const eventListTemplate = (events) => `
    <div class="events-section">
        <div class="section-header">
            <h2>Events Management</h2>
            <button class="btn primary" id="createEventBtn">Create New Event</button>
        </div>
        
        <div class="events-grid">
            ${events.map(event => `
                <div class="event-card">
                    <div class="event-header">
                        <h3>${event.title}</h3>
                        <span class="event-status ${event.status}">${event.status}</span>
                    </div>
                    <div class="event-details">
                        <p><i class="far fa-calendar"></i> ${new Date(event.date).toLocaleDateString()}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p><i class="fas fa-dollar-sign"></i> Budget: $${event.budget}</p>
                    </div>
                    <div class="event-actions">
                        <button class="btn view-event" data-id="${event._id}">View Details</button>
                        <button class="btn edit-event" data-id="${event._id}">Edit</button>
                        <button class="btn delete-event" data-id="${event._id}">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

export const eventFormTemplate = (event = null) => `
    <div class="form-container">
        <h2>${event ? 'Edit Event' : 'Create New Event'}</h2>
        <form id="${event ? 'editEventForm' : 'createEventForm'}">
            <div class="form-group">
                <label for="title">Event Title</label>
                <input type="text" id="title" name="title" value="${event?.title || ''}" required>
            </div>
            
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" required>${event?.description || ''}</textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="date">Date & Time</label>
                    <input type="datetime-local" id="date" name="date" 
                        value="${event?.date ? new Date(event.date).toISOString().slice(0, 16) : ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" value="${event?.location || ''}" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="budget">Budget</label>
                    <input type="number" id="budget" name="budget" value="${event?.budget || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="status">Status</label>
                    <select id="status" name="status" required>
                        <option value="planning" ${event?.status === 'planning' ? 'selected' : ''}>Planning</option>
                        <option value="ongoing" ${event?.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                        <option value="completed" ${event?.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${event?.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn primary">${event ? 'Update Event' : 'Create Event'}</button>
                <button type="button" class="btn secondary" id="cancelBtn">Cancel</button>
            </div>
        </form>
    </div>
`; 