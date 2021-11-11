let formInput = document.querySelector(".form-input"); //the add button
let formBtn = document.querySelector(".form-btn"); //the input task
let taskList = document.querySelector(".tasks-list"); //the whole list ul
let form = document.querySelector(".submit-form");
let lenBtn = document.querySelector(".task-num");
let myTask; //the task
let tasks = []; //array for all tasks
let storedTasks = []; //for local storage
// add function for local storage
const addToLocalStorage = function (task) {
  storedTasks.push({ name: task, check: false, numberOfTasks: tasks.length });
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
};
// remove function from local storage
const removeFromLocalStorage = function (task) {
  storedTasks.splice(task, 1);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
};
const addTask = function (task) {
  myTask = `<li id="task-${tasks.length}">
<span class='task-container'>
<span class="task-value"> ${task} </span>
<input class='edit-input'/>
<button class="check" onclick="check(${tasks.length})"><i class="fas fa-check"></i></button>
<button class="edit" onclick="update(${tasks.length})"><i class="fas fa-pencil-alt"></i></button>
<button class="delete" onclick="deleteTask(${tasks.length})" ><i class="fas fa-trash-alt"></i></button>
</span>
</li>
`;

  tasks.push(myTask);
  taskList.insertAdjacentHTML("afterbegin", myTask);
};
form.addEventListener("submit", (e) => {
  e.preventDefault(); //to prevent the page from reloading
  if (formInput.value === "") return; // to prevent addding empty tasks
  //define task
  addTask(formInput.value);
  //add task to whole list

  // local storage function place
  addToLocalStorage(formInput.value);
  // clearing the input field
  formInput.value = "";
});

const update = (index) => {
  let editBtn = document.getElementsByClassName("edit");
  let li = document.getElementById(`task-${index}`);
  let editInput = li.querySelector(".edit-input");
  let spanBox = li.querySelector(".task-value");

  if (li.classList.contains("edit-mode")) {
    editInput.style.display = "none";
    spanBox.style.display = "inline-block";
    let newTaskValue = editInput.value;
    spanBox.innerText = newTaskValue;
    li.classList.remove("edit-mode");
  } else {
    editInput.style.display = "inline-block";
    spanBox.style.display = "none";

    editInput.value = spanBox.innerText;
    editInput.addEventListener("change", () => {
      storedTasks[index].name = editInput.value;
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    });
    li.classList.add("edit-mode");
  }
};
function check(index) {
  //add checked class to task
  let checkSpan = document.getElementById(`task-${index}`).childNodes[1]
    .childNodes[1];
  checkSpan.classList.toggle("checked");
  storedTasks[index].check = true;
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}
// Run this function when Button delete is checked

// DELETE FUNCTION
function deleteTask(index) {
  // Now we delete that tast which we have slided out
  let deletedELment = document.getElementById(`task-${index}`);
  tasks.splice(index, 1);
  let deletedTask = deletedELment.childNodes[1].childNodes[1];
  deletedELment.remove();

  removeFromLocalStorage({ name: deletedTask, check: false });
}

//DELETE ALL FUNCTION
document.querySelector(".delete-all").addEventListener("click", deleteAll);
function deleteAll() {
  document.querySelectorAll("ul li").forEach((ele) => {
    ele.remove();
  });
  storedTasks = [];
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}
lenBtn.addEventListener("click", taskNumber);
function taskNumber() {
  alert(`you have ${tasks.length} tasks`);
}

// we have tried to work on the reload but there is a problem due to the tasks array that we giong to fix
window.onload = () => {
  let printedtasks = JSON.parse(localStorage.getItem("tasks"));

  printedtasks.map((ele) => {
    addTask(ele.name);
  });
};
