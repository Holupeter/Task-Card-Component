/**
 STATE MANAGEMENT
 We keep our 'Source of Truth' here.
 */
let state = {
    title: "Refactor Solar Module API",
    description: "Optimize the data fetching logic for the energy monitoring dashboard to reduce latency by 20%. This includes refactoring the backend hooks and ensuring the frontend components handle the stream correctly.",
    priority: "Low",
    status: "Pending",
    dueDate: new Date(Date.now() + 86400000) // Default to 24 hours from now
};

// SELECTORS - View Components
const viewMode = document.getElementById('view-mode');
const editForm = document.getElementById('edit-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const priorityBadge = document.querySelector('.priority-badge');
const priorityIndicator = document.getElementById('priority-indicator');
const statusBar = document.querySelector('.status-bar');
const timeRemainingDisplay = document.getElementById('time-remaining');
const dueDateElement = document.querySelector('[data-testid="test-todo-due-date"]');
const overdueIndicator = document.getElementById('overdue-indicator');

// SELECTORS - Interactive Elements
const todoToggle = document.getElementById('todo-toggle');
const statusControl = document.getElementById('status-control');
const expandToggle = document.getElementById('expand-toggle');
const collapsibleSection = document.getElementById('collapsible-section');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');

// SELECTORS - Form Inputs
const editTitleInput = document.getElementById('edit-title');
const editDescInput = document.getElementById('edit-description');
const editPriorityInput = document.getElementById('edit-priority');
const editDateInput = document.getElementById('edit-due-date');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

/**
 UI UPDATE
 */
function updateUI() {
    // Basic Content
    taskTitle.innerText = state.title;
    taskDescription.innerText = state.description;
    priorityBadge.innerText = state.priority;
    statusBar.innerText = state.status;
    statusControl.value = state.status;
    todoToggle.checked = state.status === "Done";

    // Visual State Changes
    updatePriorityVisuals();
    updateTimeAndOverdue();
    
    // "Done" state logic
    if (state.status === "Done") {
        taskTitle.classList.add('completed-text');
        statusBar.style.background = "var(--success)";
    } else {
        taskTitle.classList.remove('completed-text');
        statusBar.style.background = state.status === "In Progress" ? "var(--info)" : "var(--accent)";
    }
}

/**
 PRIORITY & TIME LOGIC
 */
function updatePriorityVisuals() {
    // Clear old classes
    priorityIndicator.className = 'priority-dot';
    const p = state.priority.toLowerCase();
    priorityIndicator.classList.add(`priority-${p}-dot`);
}

function updateTimeAndOverdue() {
    const now = new Date();
    const diffInMs = state.dueDate - now;
    const isOverdue = diffInMs <= 0;

    // Handle "Done" stop condition
    if (state.status === "Done") {
        timeRemainingDisplay.innerText = "Completed";
        overdueIndicator.classList.add('hidden');
        return;
    }

    // Format Due Date
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' };
    dueDateElement.innerText = `Due ${state.dueDate.toLocaleString('en-US', dateOptions)}`;

    // Overdue Logic
    if (isOverdue) {
        overdueIndicator.classList.remove('hidden');
        timeRemainingDisplay.classList.add('is-overdue');
    } else {
        overdueIndicator.classList.add('hidden');
        timeRemainingDisplay.classList.remove('is-overdue');
    }

    // Friendly Time Text
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (isOverdue) {
        const absMins = Math.abs(diffInMins);
        const absHours = Math.abs(diffInHours);
        timeRemainingDisplay.innerText = absHours >= 1 
            ? `Overdue by ${absHours} ${absHours === 1 ? 'hour' : 'hours'}` 
            : `Overdue by ${absMins} mins`;
    } else if (diffInDays >= 1) {
        timeRemainingDisplay.innerText = `Due in ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
    } else if (diffInHours >= 1) {
        timeRemainingDisplay.innerText = `Due in ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`;
    } else {
        timeRemainingDisplay.innerText = `Due in ${diffInMins} mins`;
    }
}

/**
 EVENT LISTENERS
 */

// Expand/Collapse
expandToggle.addEventListener('click', () => {
    const isExpanded = expandToggle.getAttribute('aria-expanded') === 'true';
    expandToggle.setAttribute('aria-expanded', !isExpanded);
    collapsibleSection.classList.toggle('collapsed');
    expandToggle.innerText = isExpanded ? 'Show More' : 'Show Less';
});

// Edit Mode Switch
editBtn.addEventListener('click', () => {
    editTitleInput.value = state.title;
    editDescInput.value = state.description;
    editPriorityInput.value = state.priority;
    // Format date for datetime-local input
    const localDate = new Date(state.dueDate.getTime() - state.dueDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    editDateInput.value = localDate;

    viewMode.classList.add('hidden');
    editForm.classList.remove('hidden');
    editTitleInput.focus();
});

// Save & Cancel
saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    state.title = editTitleInput.value;
    state.description = editDescInput.value;
    state.priority = editPriorityInput.value;
    state.dueDate = new Date(editDateInput.value);
    
    viewMode.classList.remove('hidden');
    editForm.classList.add('hidden');
    updateUI();
    editBtn.focus();
});

cancelBtn.addEventListener('click', () => {
    viewMode.classList.remove('hidden');
    editForm.classList.add('hidden');
    editBtn.focus();
});

// Status Sync
function syncStatus(newStatus) {
    state.status = newStatus;
    updateUI();
}

todoToggle.addEventListener('change', () => syncStatus(todoToggle.checked ? "Done" : "Pending"));
statusControl.addEventListener('change', () => syncStatus(statusControl.value));

// Interval
setInterval(updateUI, 60000);
updateUI();