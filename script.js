let formInput = document.querySelector(".form-input"); //the add button
let formBtn = document.querySelector(".form-btn"); //the input task
let taskList = document.querySelector(".tasks-list"); //the whole list
let form = document.querySelector(".submit-form");
let myTask; //the task
let tasks = []; //array for all tasks
form.addEventListener("submit", (e) => {
  e.preventDefault(); //to prevent the page from reloading
  if (formInput.value === "") return; // to prevent addding empty tasks
  //define task
  myTask = `<li id="task-${tasks.length}">
  <span>
  <span class="task-value"> ${formInput.value} </span>
  <input class='edit-input'/>
  <button class="check" onclick="check(${tasks.length})"><i class="fas fa-check"></i></button>
  <button class="edit" onclick="update(${tasks.length})"><i class="fas fa-pencil-alt"></i></button>
  <button class="delete" onclick="deleteTask(${tasks.length})" ><i class="fas fa-trash-alt"></i></button>
  </span>
  </li>
  `;
  tasks.push(myTask);
  //add task to whole list
  taskList.insertAdjacentHTML("afterbegin", myTask);
  // local storage function place

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
    li.classList.add("edit-mode");
  }
};
function check(index) {
  //add checked class to task
  let checkSpan=document.getElementById(`task-${index}`).childNodes[1].childNodes[1];
   checkSpan.classList.toggle('checked')
}
// Run this function when Button delete is checked

// DELETE FUNCTION
function deleteTask(index) {

  // Now we delete that tast which we have slided out
  document.getElementById(`task-${index}`).remove();
  //tasks.pop(myTask);

}

//DELETE ALL FUNCTION
document.querySelector('.delete-all').addEventListener('click', deleteAll)
function deleteAll(){
document.querySelectorAll('li').forEach((ele)=>{ele.remove()})

//tasks = []

}

let lenBtn=document.querySelector('.task-num')
lenBtn.addEventListener('click',taskNumber)
function taskNumber(){
  let ul =document.querySelector('ul')
  let list=document.querySelectorAll('ul li')
   alert(`you have ${list.length} task`)
}