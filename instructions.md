create the system below using a html, css, javascript for frontend and  monggodb, express, node.js for backend
make sure to use the latest version of the technology and make sure this will be a full stack application
that will be best system for event management

event-management-system/
├── backend/
│   ├── controllers/    
│   │   ├── eventController.js
│   │   ├── guestController.js
│   │   └── vendorController.js
│   ├── models/
│   │   ├── Event.js
│   │   ├── User.js
│   │   ├── Guest.js
│   │   └── Vendor.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── guests.js
│   │   └── vendors.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── styles/
    │       └── main.css
    ├── src/
    │   ├── js/
    │   │   ├── main.js
    │   │   ├── auth.js
    │   │   ├── events.js
    │   │   ├── guests.js
    │   │   └── vendors.js
    └── package.json



Event Management System Documentation
1. Introduction
The Event Management System is a web-based application designed for event planners to streamline the organization of events. The system helps event planners manage various aspects of an event, such as guest lists, vendors, schedules, budgets, and communications. The goal of the system is to improve event planning efficiency, reduce errors, and enhance the experience for both the organizers and attendees.

2. Problem Statement
Event planners face several challenges when organizing events:

Guest Management: Keeping track of guest lists, RSVPs, and meal preferences can be tedious.
Vendor Management: Coordinating with various vendors for catering, equipment, decorations, etc., can be complex.
Schedule Management: Ensuring that all event activities are scheduled properly and run smoothly is critical.
Budget Management: Keeping the event within budget while ensuring that all needs are met.
Communication: Effective communication with guests, vendors, and staff members is essential.
The Event Management System addresses these challenges by providing a centralized platform for managing all aspects of an event.


3. Features of the Event Management System
3.1 Dashboard
Overview: Provides a summary of the upcoming events, tasks, deadlines, and key metrics.
Key Information: Includes event countdown, budget status, guest RSVP count, and vendor status.
3.2 Event Creation and Management
Event Details: Allows planners to input basic information about the event such as event name, date, location, description, and type.
Event Timeline: Create and track the event's schedule, including deadlines for tasks, activities, and milestones.
Budget Tracking: Set and monitor the event budget, track expenses, and ensure the event stays within financial constraints.

3.3 Guest Management
Guest List: Add, edit, and manage guest information including names, contact details, RSVP status, and special requests (e.g., dietary restrictions).
Invitations: Send email or SMS invitations to guests with options to RSVP directly through the system.
RSVP Management: Track and manage the RSVP status of guests, send reminders, and allow guests to update their attendance status.
Guest Preferences: Collect and store guest preferences, such as meal choices or special accommodations.
3.4 Vendor Management
Vendor Directory: Maintain a list of vendors (e.g., caterers, photographers, entertainers, etc.) with their contact details, services, pricing, and availability.
Vendor Assignments: Assign vendors to specific tasks for each event and track the status of their services.
Contracts and Payments: Manage vendor contracts, payment schedules, and monitor payment statuses.
3.5 Event Scheduling
Timelines: Create detailed event schedules with times for each activity, including setup, sessions, meals, entertainment, etc.
Real-Time Updates: Update the schedule in real-time and notify vendors, staff, and attendees of any changes.
Task Management: Assign tasks to team members, track their progress, and set reminders for upcoming tasks.
3.6 Budget and Expense Management
Set Budget: Define the total budget for the event and allocate funds to different categories (e.g., catering, venue, decorations, etc.).
Expense Tracking: Track actual expenses as they are incurred and compare them with the allocated budget to ensure cost control.
Invoice Generation: Generate and manage invoices for vendors and payments.
3.7 Communication
Internal Messaging System: Provide a platform for internal communication among team members, vendors, and other stakeholders.
Notifications: Send reminders and updates to guests, vendors, and team members about important event details or schedule changes.
Email/SMS Integration: Integration with email and SMS services for event invitations, RSVPs, updates, and alerts.
3.8 Reporting and Analytics
Event Reports: Generate detailed reports on guest RSVPs, expenses, vendor performance, and other critical event metrics.
Budget Reports: View visual reports (graphs/charts) to compare planned vs. actual budget expenses.
Guest and Vendor Analytics: Analyze attendance trends, guest preferences, and vendor performance for future event planning.
3.9 Mobile Accessibility
Mobile-Friendly Interface: The system will be responsive, allowing event planners and team members to access the platform from any mobile device.
Mobile Alerts: Event planners and team members can receive alerts and notifications about event updates directly on their smartphones.
3.10 Integration with Third-Party Tools
Payment Systems: Integration with payment gateways for easy online transactions, vendor payments, or guest donations.
Calendar Integration: Sync the event calendar with Google Calendar, Microsoft Outlook, or other calendar tools.
Social Media Integration: Option to share event details, updates, or invitations on social media platforms.
4. Technical Specifications
4.1 Frontend
Languages/Frameworks: HTML, CSS, JavaScript, Bootstrap
Frontend Frameworks: ReactJS or Angular for a dynamic user experience
Responsive Design: Mobile-first approach to ensure accessibility across all devices.
4.2 Backend
Languages/Frameworks: PHP or Node.js for backend development
Database: MySQL or MongoDB to store event, guest, vendor, and budget data
Authentication: User authentication using JWT (JSON Web Tokens) or OAuth for secure access.
API: RESTful API for handling communication between the frontend and backend.
4.3 Hosting
Platform: AWS, Google Cloud, or a similar cloud provider for hosting the application.
Domain Name: Custom domain for easy access.
5. User Roles and Permissions
5.1 Admin
Permissions: Full access to all system features, including event creation, budget management, vendor assignments, and user management.
Responsibilities: Manage the overall system, view reports, and oversee all event-related tasks.
5.2 Event Planner
Permissions: Can create and manage events, track guest lists, and vendor assignments, and monitor budgets.
Responsibilities: Plan and execute events, update schedules, send invitations, and handle communication.
5.3 Vendor
Permissions: View assigned tasks and event details, manage their own contract and payment information.
Responsibilities: Provide the services agreed upon in the contract and communicate directly with the event planner.
5.4 Guest
Permissions: Can RSVP to event invitations, update their personal details and preferences.
Responsibilities: Attend events, provide any requested details (e.g., meal preferences), and communicate their attendance status.
6. System Flow
Event Creation: The planner creates a new event, enters details, sets a budget, and assigns vendors.
Guest Invitations: The planner sends invitations to the guest list via email or SMS.
Vendor and Task Assignments: Vendors are assigned tasks, and team members are notified of their duties.
Budget Tracking: As expenses are incurred, they are logged into the system and compared against the budget.
Event Day: The system provides real-time updates, keeping everyone informed about the schedule and any changes.
Post-Event: Generate reports, including guest feedback, budget performance, and vendor evaluations.
7. Conclusion
The Event Management System is designed to simplify and optimize the process of event planning. With its comprehensive features for managing events, vendors, guests, schedules, and budgets, the system ensures that every event is executed flawlessly, leading to higher satisfaction for both event planners and attendees. By automating various processes and providing real-time updates, the system helps businesses reduce errors, save time, and deliver a seamless event experience.