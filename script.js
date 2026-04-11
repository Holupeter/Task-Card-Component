// 1. Select our elements
const todoToggle = document.getElementById('todo-toggle');
const taskTitle = document.getElementById('task-title');
const statusBar = document.querySelector('.status-bar');
const timeRemainingDisplay = document.getElementById('time-remaining');
const dueDateElement = document.querySelector('[data-testid="test-todo-due-date"]');
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

// 2. Set a Dynamic Due Date (Exactly 24 hours from "Now")
const dueDate = new Date();
dueDate.setHours(dueDate.getHours() + 24); 


// 3. Update the UI with the Correct Date, Time & Countdown
 
function updateDisplay() {
    const now = new Date();
    const diffInMs = dueDate - now;
    
    // Update the Due Date with TIME (e.g., Due Apr 12, 2026, 1:00 PM) 
    const dateOptions = { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
    };
    
    // Format the date and time beautifully
    const formattedDateTime = dueDate.toLocaleString('en-US', dateOptions);
    dueDateElement.innerText = `Due ${formattedDateTime}`;
    
    // Semantic datetime attribute for machines
    dueDateElement.setAttribute('datetime', dueDate.toISOString());

    // Update the "Time Remaining" logic 
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    let timeText = "";

    if (diffInMs <= 0) {
        timeText = "Overdue!";
    } else if (diffInHours < 1) {
        timeText = "Due now!";
    } else if (diffInHours < 24) {
        const hoursLeft = Math.max(1, diffInHours);
        // Pluralization for hours
        timeText = `Due in ${hoursLeft} ${hoursLeft === 1 ? 'hour' : 'hours'}`;
    } else {
        // Pluralization for days
        timeText = `Due in ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
    }

    timeRemainingDisplay.innerText = timeText;
    
}

// 4. Toggle Completion Logic

todoToggle.addEventListener('change', () => {
    if (todoToggle.checked) {
        taskTitle.classList.add('completed-text');
        statusBar.innerText = "Done";
        statusBar.style.background = "#10b981"; // Sage Green
    } else {
        taskTitle.classList.remove('completed-text');
        statusBar.innerText = "Pending";
        statusBar.style.background = "#0f172a"; // Deep Slate
    }
});


// 5. Button Actions
 
editBtn.addEventListener('click', () => alert("Edit mode activated!"));
deleteBtn.addEventListener('click', () => {
    if(confirm("Are you sure?")) document.querySelector('.todo-card').style.opacity = "0.5";
});

// 6. Initialize and start the interval
updateDisplay();
setInterval(updateDisplay, 60000);