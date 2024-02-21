const app = document.getElementById("app");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const list = document.getElementById("list");
const removeAll = document.getElementById("removeAll");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addFromLocalStorage() {
  if (tasks.length === 0) return;
  tasks.forEach((task) => {
    displayTasks(task);
  });
}
function displayTasks(task) {
  let taskContainer = document.createElement("span");
  taskContainer.setAttribute("id", "task-container");
  let li = document.createElement("li");
  li.innerText = task.text;
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  let remvBtn = document.createElement("button");
  remvBtn.innerText = "X";
  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  taskContainer.appendChild(li);
  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(remvBtn);
  taskContainer.appendChild(editBtn);
  list.appendChild(taskContainer);
  remvBtn.addEventListener("click", () => {
    taskContainer.remove();
    tasks = tasks.filter((item) => {
      return item.id !== task.id;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  editBtn.addEventListener("click", () => {
    let pText = prompt("Enter new task name");
    if (pText != null) {
      li.innerText = pText;
    }
    tasks.forEach((item) => {
      if (item.id === task.id) {
        item.text = pText;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });
  input.value = "";
}
function addTask() {
  if (input.value === "" || input.value === " ") {
    alert("please enter a task");
    return;
  }
  const task = {
    text: input.value,
    id: Date.now(),
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(tasks);
  displayTasks(task);
}
btn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
addFromLocalStorage();
