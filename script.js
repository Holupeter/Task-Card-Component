/**
 STATE MANAGEMENT
 */
let state = {
    title: "Refactor Solar Module API",
    description: "Optimize the data fetching logic for the energy monitoring dashboard to reduce latency by 20%. This includes refactoring the backend hooks and ensuring the frontend components handle the stream correctly.",
    priority: "Low",
    status: "Pending",
    dueDate: new Date(Date.now() + 86400000) // Default: 24h from load
};

// SELECTORS
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

const todoToggle = document.getElementById('todo-toggle');
const statusControl = document.getElementById('status-control');
const expandToggle = document.getElementById('expand-toggle');
const collapsibleSection = document.getElementById('collapsible-section');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.querySelector('.delete');

const editTitleInput = document.getElementById('edit-title');
const editDescInput = document.getElementById('edit-description');
const editPriorityInput = document.getElementById('edit-priority');
const editDateInput = document.getElementById('edit-due-date');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

/**
 CORE UI UPDATE
 */
function updateUI() {
    const card = document.querySelector('.todo-card');

    // Update Text Content
    taskTitle.innerText = state.title;
    taskDescription.innerText = state.description;
    priorityBadge.innerText = state.priority;
    statusBar.innerText = state.status;
    statusControl.value = state.status;
    todoToggle.checked = state.status === "Done";

    // Visual State: Completion
    if (state.status === "Done") {
        taskTitle.classList.add('completed-text');
        statusBar.style.background = "var(--success)";
    } else {
        taskTitle.classList.remove('completed-text');
        statusBar.style.background = state.status === "In Progress" ? "var(--info)" : "var(--accent)";
    }

    // Visual State: Priority & status
    updatePriorityVisuals(card);
    updateStatusVisuals(card);
    updateTimeLogic();
    handleExpandLogic();
}

function handleExpandLogic() {
    // "Default collapsed if description exceeds certain length"
    const isLong = state.description.length > 100;
    
    if (!isLong) {
        expandToggle.style.display = 'none';
        collapsibleSection.classList.remove('collapsed');
    } else {
        expandToggle.style.display = 'flex';
    }
}

function updatePriorityVisuals(card) {
    const p = state.priority.toLowerCase();
    
    // priorityIndicator now refers to the main wrapper with the testid
    priorityIndicator.className = `priority-wrapper priority-${p}`;
    
    // Update nested elements
    const dot = priorityIndicator.querySelector('.priority-dot');
    const badge = priorityIndicator.querySelector('.priority-badge');
    
    if (dot) dot.className = `priority-dot dot-${p}`;
    if (badge) badge.className = `priority-badge badge-${p}`;
    
    state.priority === "High" ? card.classList.add('priority-high-card') : card.classList.remove('priority-high-card');
}

function updateStatusVisuals(card) {
    state.status === "In Progress" ? card.classList.add('status-in-progress-card') : card.classList.remove('status-in-progress-card');
}

function updateTimeLogic() {
    const now = new Date();
    const diffInMs = state.dueDate - now;
    const isOverdue = diffInMs <= 0;

    if (state.status === "Done") {
        timeRemainingDisplay.innerText = "Completed";
        overdueIndicator.classList.add('hidden');
        return;
    }

    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' };
    dueDateElement.innerText = `Due ${state.dueDate.toLocaleString('en-US', options)}`;

    const diffInMins = Math.floor(Math.abs(diffInMs) / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (isOverdue) {
        overdueIndicator.classList.remove('hidden');
        timeRemainingDisplay.innerText = diffInHours >= 1 ? `Overdue by ${diffInHours}h` : `Overdue by ${diffInMins}m`;
    } else {
        overdueIndicator.classList.add('hidden');
        if (diffInDays >= 1) timeRemainingDisplay.innerText = `Due in ${diffInDays}d`;
        else if (diffInHours >= 1) timeRemainingDisplay.innerText = `Due in ${diffInHours}h`;
        else timeRemainingDisplay.innerText = `Due in ${diffInMins}m`;
    }
}

/**
 EVENT LISTENERS
 */
editBtn.addEventListener('click', () => {
    editTitleInput.value = state.title;
    editDescInput.value = state.description;
    editPriorityInput.value = state.priority;
    const localISO = new Date(state.dueDate.getTime() - state.dueDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    editDateInput.value = localISO;

    viewMode.classList.add('hidden');
    editForm.classList.remove('hidden');
    editTitleInput.focus();
});

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    state.title = editTitleInput.value;
    state.description = editDescInput.value;
    state.priority = editPriorityInput.value;
    state.dueDate = new Date(editDateInput.value);
    
    closeEditMode();
});

cancelBtn.addEventListener('click', closeEditMode);

function closeEditMode() {
    viewMode.classList.remove('hidden');
    editForm.classList.add('hidden');
    updateUI();
    editBtn.focus();
}

deleteBtn.addEventListener('click', () => {
    const confirmation = confirm("Are you sure you want to delete this task? This action cannot be undone.");
    if (confirmation) {
        // Dummy 
        alert("Task deleted (Simulated)");
    }
});

expandToggle.addEventListener('click', () => {
    const isExpanded = expandToggle.getAttribute('aria-expanded') === 'true';
    expandToggle.setAttribute('aria-expanded', !isExpanded);
    collapsibleSection.classList.toggle('collapsed');
    expandToggle.innerText = isExpanded ? 'Show More' : 'Show Less';
});

function syncStatus(newStatus) {
    state.status = newStatus;
    updateUI();
}

todoToggle.addEventListener('change', () => syncStatus(todoToggle.checked ? "Done" : "Pending"));
statusControl.addEventListener('change', () => syncStatus(statusControl.value));

// Init
updateUI();
setInterval(updateUI, 30000); 
 
