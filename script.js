const addForm = document.getElementById("addForm");
const titleInput = document.getElementById("titleInput");
const priorityInput = document.getElementById("priorityInput");
const hoursInput = document.getElementById("hoursInput");
const taskList = document.getElementById("tasklist");
const filters = document.getElementById("filters");
const total = document.getElementById("total");
const doneCount = document.getElementById("doneCount");
const pendingHours = document.getElementById("pendingHours");
const percent = document.getElementById("percent");
const bar = document.getElementById("bar");

const tasks = [];
let currentFilter = "all";
addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value;
  const priority = priorityInput.value;
  const hours = Number(hoursInput.value);

  const newtask = {
    title,
    priority,
    hours,
    status: "pending",
  };
  tasks.push(newtask);
  titleInput.value = "";
  renderTasks();
});
function renderTasks() {
  taskList.innerHTML = "";

  total.textContent = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done");
  doneCount.textContent = doneTasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const pendingHoursValue = pendingTasks.reduce(
    (sum, task) => task.hours + sum,
    0,
  );
  pendingHours.textContent = pendingHoursValue + "h";
  const percentOfTask =
    tasks.length === 0 ? 0 : (doneTasks.length / tasks.length) * 100;
  percent.textContent = percentOfTask + "%";
  bar.style.width = percentOfTask + "%";

  const filteredTasks = tasks.filter((task) => {
    return currentFilter === "all" || task.status === currentFilter;
  });
  filteredTasks.forEach((task, index) => {
    //li yaratish
    const li = document.createElement("li");
    li.classList.add("task");
    const title = document.createElement("span");
    title.classList.add("task-title");
    title.textContent = task.title;

    const hours = document.createElement("span");
    hours.classList.add("hours");
    hours.textContent = `${task.hours}h`;

    const badge = document.createElement("span");
    badge.classList.add("badge", task.priority);
    badge.textContent = task.priority;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    //button yaratish
    const button = document.createElement("button");
    button.classList.add("delete")
    button.textContent = "Delete";
    li.append(checkbox);
    li.append(title);
    li.append(badge);
    li.append(hours);
    li.append(button);


    //li ga qushish
    li.append(checkbox);
    li.append(button);
    taskList.append(li);
    //checkboxni check qilish
    if (task.status === "done") {
      checkbox.checked = true;
    }
    //checkbox ni statusini uzgartirish
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        task.status = "done";
      } else {
        task.status = "pending";
      }
      renderTasks();
    });

    button.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });
  });
}

filters.addEventListener("click", (event) => {
  const status = event.target.dataset.status;
  currentFilter = status;
  renderTasks();
});
