let formInput = document.querySelector(".form-input"); //the add button
let formBtn = document.querySelector(".form-btn"); //the input task
let taskList = document.querySelector(".tasks-list"); //the whole list
let form = document.querySelector(".submit-form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); //to prevent the page from reloading
  if (formInput.value === "") return; // to prevent addding empty tasks
  //ading the tasks in the list

  taskList.insertAdjacentHTML(
    "afterbegin",
    `<li>
  <button class="check"><i class="fas fa-check"></i></button>
  <span>${formInput.value}</span>
  <button class="edit"><i class="fas fa-pencil-alt"></i></button>
  <button class="delete"><i class="fas fa-trash-alt"></i></button>
</li>`
  );

  // local storage function place

  // clearing the input field
  formInput.value = "";
});
