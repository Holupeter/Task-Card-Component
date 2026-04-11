// 1. Select our elements (The "Selectors")
const todoToggle = document.getElementById('todo-toggle');
const taskTitle = document.getElementById('task-title');
const statusBar = document.querySelector('.status-bar');
const timeRemainingDisplay = document.getElementById('time-remaining');
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

// 2. Set a Fixed Due Date (For testing)
// Let's set it to tomorrow at 6:00 PM
const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 1); 
dueDate.setHours(18, 0, 0);


 // 3. Time Logic Function
 // Calculates difference between now and the due date
 
function updateTimeRemaining() {
    const now = new Date();
    const diffInMs = dueDate - now;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    let timeText = "";

    if (diffInMs <= 0) {
        timeText = "Overdue!";
    } else if (diffInHours < 1) {
        timeText = "Due now!";
    } else if (diffInHours < 24) {
        timeText = "Due tomorrow";
    } else {
        timeText = `Due in ${diffInDays} days`;
    }

    timeRemainingDisplay.innerText = timeText;
}


 // 4. Toggle Completion Logic

todoToggle.addEventListener('change', () => {
    if (todoToggle.checked) {
        taskTitle.classList.add('completed-text');
        statusBar.innerText = "Done";
        statusBar.style.background = "#55efc4"; // Change to green
    } else {
        taskTitle.classList.remove('completed-text');
        statusBar.innerText = "Pending";
        statusBar.style.background = "#6c5ce7"; // Back to purple
    }
});


 // 5. Button Actions (Dummy listeners for the task)

editBtn.addEventListener('click', () => {
    console.log("Edit clicked");
    alert("Edit mode activated!");
});

deleteBtn.addEventListener('click', () => {
    console.log("Delete clicked");
    if(confirm("Are you sure you want to delete this task?")) {
        document.querySelector('.todo-card').style.opacity = "0.5";
    }
});

// 6. Initialize the timer
updateTimeRemaining();
// Optional: Update every minute
setInterval(updateTimeRemaining, 60000);