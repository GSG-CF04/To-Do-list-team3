let formInput = document.querySelector(".form-input"); //the add button
let formBtn = document.querySelector(".form-btn"); //the input task
let taskList = document.querySelector(".tasks-list"); //the whole list ul
let form = document.querySelector(".submit-form");
let lenBtn = document.querySelector(".task-num");
let taskNumber= document.querySelector('.number-task') //the number task
let myTask; //the task
let tasks = []; //array for all tasks
let storedTasks = []; //for local storage
// add function for local storage
const addToLocalStorage = function (task, index) {
  storedTasks.push({ name: task, check: false, numberOfTasks: index });
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
};
// remove function from local storage
const removeFromLocalStorage = function (numberOfTasks) {
  let newStoredTask = storedTasks.filter(
    (item) => item.numberOfTasks !== numberOfTasks
  );
  storedTasks = newStoredTask;
  localStorage.setItem("tasks", JSON.stringify(newStoredTask));
};
const addTask = function (task, index, checked) {
  myTask = `<li id="task-${index}">
<span class='task-container'>
<button class="check" onclick="check(${index})"><i class="fas fa-check"></i></button>
<span class="task-value  ${checked ? "checked" : ""}"> ${task} </span>
<input class='edit-input'/>
<button class="edit" onclick="update(${index})"><i class="fas fa-pencil-alt"></i></button>
<button class="delete" onclick="deleteTask(${index})" ><i class="fas fa-trash-alt"></i></button>
</span>
</li>
`;
  taskList.insertAdjacentHTML("afterbegin", myTask);
  tasks.push({ name: task, check: false, numberOfTasks: index });
};

form.addEventListener("submit", (e) => {
  e.preventDefault(); //to prevent the page from reloading
  if (formInput.value === "") return; // to prevent addding empty tasks
  //define task
  let index = tasks.length;
  addTask(formInput.value, index);
  //add task to whole list

  // local storage function place
  addToLocalStorage(formInput.value, index);
   //define Task Number 
   taskNumber.innerText=tasks.length
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
    editInput.style.marginTop = "7px";
    spanBox.style.display = "none";
    editInput.value = spanBox.innerText;
    editInput.addEventListener("change", () => {
      let objectIndex = storedTasks.findIndex((i) => i.numberOfTasks == index); //find the object index within array using the numberOfTask
      storedTasks[objectIndex].name = editInput.value;
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    });
    li.classList.add("edit-mode");
  }
};
function check(index) {
  //add checked class to task
  let checkSpan = document.getElementById(`task-${index}`).childNodes[1]
    .childNodes[3];
  checkSpan.classList.add("checked");
  let objectIndex = storedTasks.findIndex((i) => i.numberOfTasks == index);
  storedTasks[objectIndex].check = !storedTasks[objectIndex].check; // negation of previous value
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}
// Run this function when Button delete is checked

// DELETE FUNCTION
function deleteTask(numberOfTasks) {
  // Now we delete that tast which we have slided out
  let deletedELment = document.getElementById(`task-${numberOfTasks}`);
  let newTasks = tasks.filter((item) => item.numberOfTasks !== numberOfTasks);
  tasks = newTasks;
  let deletedTask = deletedELment.childNodes[1].childNodes[1];
  deletedELment.remove();
  removeFromLocalStorage(numberOfTasks);
    //define Task Number 
    taskNumber.innerText=tasks.length
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
   //define Task Number 
   taskNumber.innerText=tasks.length
}

// we have tried to work on the reload but there is a problem due to the tasks array that we giong to fix
window.onload = () => {
  let printedtasks = JSON.parse(localStorage.getItem("tasks")) || []; // Empty array in case there is no Tasks key in localStorage
  storedTasks = printedtasks;
  printedtasks.map((ele, index) => {
    addTask(ele.name, ele.numberOfTasks, ele.check);
  });
   //define Task Number 
   taskNumber.innerText=tasks.length
};
//! dark and light theme toggle

//? calling and accessing the elements
let toggleBtn = document.querySelector('.toggle-btn')
let bodyElement = document.querySelector('body')

// ? toggle the class (set and remove the class dark in every click)
function setDarkTheme(){
    bodyElement.classList.toggle('dark')
}
// ? add event listener to the btn
toggleBtn.addEventListener('click', switchTheme)

function switchTheme() {
    // Get the value of the "dark" item from the local storage on every click
  let darkMode = localStorage.getItem('dark')
  if (darkMode !== 'on') {
    //   Set the value of the item to "on" when dark mode is on
      setDarkTheme()
    darkMode = localStorage.setItem('dark', 'on')
  } else {
    //   Set the value of the item to  "null" when dark mode if off
      setDarkTheme()
    darkMode = localStorage.setItem('dark', 'off')
  }
}
// Get the value of the "dark" item from the local storage
let darkMode = localStorage.getItem('dark')
// check dark mode is on or off on page reload
if(darkMode === 'on'){
    setDarkTheme()
}
