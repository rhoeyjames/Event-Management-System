export const guestListTemplate = (guests) => `
    <div class="guests-section">
        <div class="section-header">
            <h2>Guest Management</h2>
            <button class="btn primary" id="addGuestBtn">Add Guest</button>
        </div>
        
        <div class="guests-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>RSVP Status</th>
                        <th>Dietary Restrictions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${guests.map(guest => `
                        <tr>
                            <td>${guest.user.name}</td>
                            <td>${guest.user.email}</td>
                            <td>
                                <span class="status-badge ${guest.rsvpStatus}">
                                    ${guest.rsvpStatus}
                                </span>
                            </td>
                            <td>${guest.dietaryRestrictions || 'None'}</td>
                            <td>
                                <button class="btn edit-guest" data-id="${guest._id}">Edit</button>
                                <button class="btn delete-guest" data-id="${guest._id}">Remove</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
`;

export const guestFormTemplate = (guest = null) => `
    <div class="form-container">
        <h2>${guest ? 'Edit Guest' : 'Add Guest'}</h2>
        <form id="${guest ? 'editGuestForm' : 'addGuestForm'}">
            <div class="form-group">
                <label for="email">Guest Email</label>
                <input type="email" id="email" name="email" value="${guest?.user.email || ''}" required>
            </div>
            
            <div class="form-group">
                <label for="rsvpStatus">RSVP Status</label>
                <select id="rsvpStatus" name="rsvpStatus" required>
                    <option value="pending" ${guest?.rsvpStatus === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="accepted" ${guest?.rsvpStatus === 'accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="declined" ${guest?.rsvpStatus === 'declined' ? 'selected' : ''}>Declined</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="dietaryRestrictions">Dietary Restrictions</label>
                <textarea id="dietaryRestrictions" name="dietaryRestrictions">${guest?.dietaryRestrictions || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label for="specialRequirements">Special Requirements</label>
                <textarea id="specialRequirements" name="specialRequirements">${guest?.specialRequirements || ''}</textarea>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn primary">${guest ? 'Update Guest' : 'Add Guest'}</button>
                <button type="button" class="btn secondary" id="cancelBtn">Cancel</button>
            </div>
        </form>
    </div>
`; 