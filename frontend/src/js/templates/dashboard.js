export const dashboardTemplate = (eventsData, budgetData, tasksData) => `
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