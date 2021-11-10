let formInput = document.querySelector(".form-input"); //the add button
let formBtn = document.querySelector(".form-btn"); //the input task
let taskList = document.querySelector(".tasks-list"); //the whole list
let form = document.querySelector(".submit-form");
let myTask ; //the task
let tasks =[]; //array for all tasks
form.addEventListener("submit", (e) => {
  e.preventDefault(); //to prevent the page from reloading
  if (formInput.value === "") return; // to prevent addding empty tasks
  //define task
  myTask = `<li id="${tasks.length}">
  <span>${formInput.value} 
  <button class="check" onclick="check(${tasks.length})"><i class="fas fa-check"></i></button>
  <button class="edit" onclick="update(${tasks.length})"><i class="fas fa-pencil-alt"></i></button>
  <button class="delete" onclick="deleteTask(${tasks.length})" ><i class="fas fa-trash-alt"></i></button>
  </span>
  </li>
  `;
  tasks.push(myTask);
  //add task to whole list
  taskList.insertAdjacentHTML("afterbegin",myTask);
  // local storage function place

  // clearing the input field
  formInput.value = "";
});

function check(index){
  //add checked class to task
  document.getElementById(index).classList.add('checked')
}