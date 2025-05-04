document.addEventListener("DOMContentLoaded", () => {
  // ✅ Add task with "+ Add Task" button
  document.querySelectorAll(".add-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const column = btn.closest(".column");
      const taskText = prompt("Enter new task:");

      if (taskText && taskText.trim() !== "") {
        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.textContent = taskText.trim();
        column.insertBefore(newCard, btn); // insert before button
        updateTaskCount(column);
      }
    });
  });

  const validStatuses = ["todo", "doing", "done"];

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

  const title1 = prompt("Enter title for Task 1:");
  const description1 = prompt("Enter description for Task 1:");
  const status1 = promptForStatus(1);

  const title2 = prompt("Enter title for Task 2:");
  const description2 = prompt("Enter description for Task 2:");
  const status2 = promptForStatus(2);

  const task1 = { title: title1, description: description1, status: status1 };
  const task2 = { title: title2, description: description2, status: status2 };

  const tasks = [task1, task2];
  const doneTasks = tasks.filter((task) => task.status === "done");

  if (doneTasks.length > 0) {
    doneTasks.forEach((task) => {
      console.log(`Title: "${task.title}", Status: "${task.status}"`);
    });
  } else {
    console.log("No tasks completed, let's get to work!");
  }

  addTaskToBoard(task1);
  addTaskToBoard(task2);
});

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

function updateTaskCount(column) {
  const count = column.querySelectorAll(".card").length;
  const statusText = column.querySelector(".status-text");

  if (statusText) {
    const statusType = statusText.textContent.split(" ")[0];
    statusText.textContent = `${statusType} (${count})`;
  }
}
