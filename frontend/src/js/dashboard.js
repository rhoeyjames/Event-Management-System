import { API_URL } from './config.js';

export function initDashboard() {
    const dashboardLink = document.querySelector('#dashboardLink');
    dashboardLink.addEventListener('click', showDashboard);
}

async function showDashboard() {
    const mainContent = document.querySelector('#mainContent');
    
    try {
        const [eventsData, budgetData, tasksData] = await Promise.all([
            fetchEvents(),
            fetchBudgetData(),
            fetchTasks()
        ]);

        mainContent.innerHTML = `
            <div class="dashboard">
                <div class="dashboard-card">
                    <h3>Event Overview</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">${eventsData.upcoming}</div>
                            <div class="stat-label">Upcoming Events</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${eventsData.total}</div>
                            <div class="stat-label">Total Events</div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="eventsChart"></canvas>
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3>Budget Overview</h3>
                    <div class="budget-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${budgetData.usagePercentage}%"></div>
                        </div>
                        <p>Budget Used: $${budgetData.used} / $${budgetData.total}</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="budgetChart"></canvas>
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3>Upcoming Tasks</h3>
                    <ul class="task-list">
                        ${tasksData.map(task => `
                            <li class="task-item">
                                <span>${task.title}</span>
                                <span>${new Date(task.dueDate).toLocaleDateString()}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="dashboard-card">
                    <h3>Calendar</h3>
                    <div id="calendar" class="calendar-widget"></div>
                </div>
            </div>
        `;

        initializeCharts(eventsData, budgetData);
        initializeCalendar();
    } catch (error) {
        console.error('Error loading dashboard:', error);
        mainContent.innerHTML = '<p>Error loading dashboard</p>';
    }
}

async function fetchEvents() {
    const response = await fetch(`${API_URL}/events/stats`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

async function fetchBudgetData() {
    const response = await fetch(`${API_URL}/events/budget`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

async function fetchTasks() {
    const response = await fetch(`${API_URL}/events/tasks`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

function initializeCharts(eventsData, budgetData) {
    // Events Chart
    new Chart(document.getElementById('eventsChart'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Events per Month',
                data: eventsData.monthlyCount,
                backgroundColor: '#007bff'
            }]
        }
    });

    // Budget Chart
    new Chart(document.getElementById('budgetChart'), {
        type: 'pie',
        data: {
            labels: ['Used', 'Remaining'],
            datasets: [{
                data: [budgetData.used, budgetData.total - budgetData.used],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        }
    });
}

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: async (fetchInfo, successCallback, failureCallback) => {
            try {
                const response = await fetch(`${API_URL}/events/calendar`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const events = await response.json();
                successCallback(events);
            } catch (error) {
                failureCallback(error);
            }
        }
    });
    calendar.render();
} 