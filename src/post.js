const btnId = document.getElementById("post");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");

// adding eventListener to the button
btnId.addEventListener("click", (e) => {
    e.preventDefault();
    inputValidation();
    postTodo();
  });

// make sure that user give input
const inputValidation = () => {
    if (inputId.value === "") {
      msg.innerHTML = "Pleas enter your task";
    } else {
      msg.innerHTML = "";
      acceptData();
    }
  };
  

// store our data
let data = {};

// accept data and store our data
const acceptData = () => {
    data['text'] = inputId.value;
    createTask();
};
 
// display our tasks
const createTask = () => {
    tasks.innerHTML += `<div>
    <span class="spanStyle">${data.text}</span>
    <span class="options">
      <i onClick = "editTask(this)" class="fa-solid fa-pen-to-square"></i>
      <i onClick = "deleteTask(this)" class="fa-solid fa-trash-can"></i>
    </span>
    </div>`;
    resetInput();
    };

// function to delete out task
const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    }

  
  // function to edit our task
  const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    inputId.value = selectedTask.children[0].innerHTML;
    selectedTask.remove();
  };

  // function to clean our input area
const resetInput = () => {
    inputId.value = '';
};

const postTodo = async () => {
  try {
    const inputId = document.getElementById("inputId").value;
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: inputId, completed: false }),
    });

    // CHECKING RESPONSE
    if (res.status === 201) {
        const data = await res.json();
        
      return data;
    } else {
      console.log(`Error while posting todo with status : ${res.status}`);
      return false;
    }
    
  } catch (err) {
    console.error(err);
  }
  createTask();
};




/*
const addTaskBtn = document.getElementById("add-task");
addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postTodo();
});
*/
