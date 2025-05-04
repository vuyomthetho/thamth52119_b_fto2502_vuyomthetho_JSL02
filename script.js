// Wait until everything on the page is loaded before running the code
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Add a task when the "+ Add Task" button is clicked
  document.querySelectorAll(".add-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const column = btn.closest(".column"); // Find the column this button is in
      const taskText = prompt("Enter new task:"); // Ask user to type the task

      // Only create a task if something was entered
      if (taskText && taskText.trim() !== "") {
        const newCard = document.createElement("div"); // Make a new task box
        newCard.className = "card";
        newCard.textContent = taskText.trim();
        column.insertBefore(newCard, btn); // Place the task above the button
        updateTaskCount(column); // Update the number next to the column title
      }
    });
  });

  // These are the only allowed task statuses
  const validStatuses = ["todo", "doing", "done"];

  // Ask user for a task status until they enter a valid one
  function promptForStatus(taskNumber) {
    let status;
    do {
      status = prompt(
        `Enter status for Task ${taskNumber} (todo, doing, done):`
      );
      if (status) status = status.toLowerCase();
      if (!validStatuses.includes(status)) {
        alert("Invalid status. Please enter: todo, doing, or done.");
      }
    } while (!validStatuses.includes(status));
    return status;
  }

  // Ask the user to enter details for two tasks
  const title1 = prompt("Enter title for Task 1:");
  const description1 = prompt("Enter description for Task 1:");
  const status1 = promptForStatus(1);

  const title2 = prompt("Enter title for Task 2:");
  const description2 = prompt("Enter description for Task 2:");
  const status2 = promptForStatus(2);

  // Store the tasks as objects
  const task1 = { title: title1, description: description1, status: status1 };
  const task2 = { title: title2, description: description2, status: status2 };

  const tasks = [task1, task2];

  // Filter out the tasks that are marked as "done"
  const doneTasks = tasks.filter((task) => task.status === "done");

  // Log the completed tasks or show a message if none are done
  if (doneTasks.length > 0) {
    doneTasks.forEach((task) => {
      console.log(`Title: "${task.title}", Status: "${task.status}"`);
    });
  } else {
    console.log("No tasks completed, let's get to work!");
  }

  // Add both tasks to the board visually
  addTaskToBoard(task1);
  addTaskToBoard(task2);
});

/**
 * Adds a task to the correct column based on its status
 */
function addTaskToBoard(task) {
  const column = document.querySelector(
    `.column[data-status="${task.status}"]`
  );

  if (column) {
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.textContent = task.title;

    const addBtn = column.querySelector(".add-task-btn");
    column.insertBefore(newCard, addBtn);
    updateTaskCount(column);
  }
}

/**
 * Updates the number of tasks shown in the column header
 */
function updateTaskCount(column) {
  const count = column.querySelectorAll(".card").length;
  const statusText = column.querySelector(".status-text");

  if (statusText) {
    const statusType = statusText.textContent.split(" ")[0]; // Get column name
    statusText.textContent = `${statusType} (${count})`; // Add count next to it
  }
}
