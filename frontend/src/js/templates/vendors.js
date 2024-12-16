export const vendorListTemplate = (vendors) => `
    <div class="vendors-section">
        <div class="section-header">
            <h2>Vendor Management</h2>
            <button class="btn primary" id="addVendorBtn">Add Vendor</button>
        </div>
        
        <div class="vendors-grid">
            ${vendors.map(vendor => `
                <div class="vendor-card">
                    <div class="vendor-header">
                        <h3>${vendor.companyName}</h3>
                        <span class="vendor-type">${vendor.serviceType}</span>
                    </div>
                    <div class="vendor-details">
                        <p><i class="fas fa-phone"></i> ${vendor.contactNumber}</p>
                        <p><i class="fas fa-dollar-sign"></i> Rate: $${vendor.pricing}</p>
                    </div>
                    <div class="vendor-actions">
                        <button class="btn edit-vendor" data-id="${vendor._id}">Edit</button>
                        <button class="btn delete-vendor" data-id="${vendor._id}">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

export const vendorFormTemplate = (vendor = null) => `
    <div class="form-container">
        <h2>${vendor ? 'Edit Vendor' : 'Add Vendor'}</h2>
        <form id="${vendor ? 'editVendorForm' : 'addVendorForm'}">
            <div class="form-group">
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" value="${vendor?.companyName || ''}" required>
            </div>
            
            <div class="form-group">
                <label for="serviceType">Service Type</label>
                <select id="serviceType" name="serviceType" required>
                    <option value="catering" ${vendor?.serviceType === 'catering' ? 'selected' : ''}>Catering</option>
                    <option value="decoration" ${vendor?.serviceType === 'decoration' ? 'selected' : ''}>Decoration</option>
                    <option value="photography" ${vendor?.serviceType === 'photography' ? 'selected' : ''}>Photography</option>
                    <option value="music" ${vendor?.serviceType === 'music' ? 'selected' : ''}>Music</option>
                    <option value="venue" ${vendor?.serviceType === 'venue' ? 'selected' : ''}>Venue</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="contactNumber">Contact Number</label>
                <input type="tel" id="contactNumber" name="contactNumber" value="${vendor?.contactNumber || ''}" required>
            </div>
            
            <div class="form-group">
                <label for="pricing">Pricing</label>
                <input type="number" id="pricing" name="pricing" value="${vendor?.pricing || ''}" required>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn primary">${vendor ? 'Update Vendor' : 'Add Vendor'}</button>
                <button type="button" class="btn secondary" id="cancelBtn">Cancel</button>
            </div>
        </form>
    </div>
`; 