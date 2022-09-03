const btnId = document.getElementById("post");
const inputId = document.getElementById("inputId");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");

const postTodo = async () => {
  try {
    const inputId = document.getElementById("inputId").value;
    const res = await fetch(
      "https://my-json-server.typicode.com/andriivam/Andrii_todo-list/todos",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: inputId, completed: false }),
      }
    );

    // CHECKING RESPONSE
    if (res.status === 201) {
      const data = await res.json();
      // DISPLAY OUR DATA
      tasks.innerHTML += `<div>
        <span class="spanStyle">
      ${data.title}</span>
        <span class="options">
          <i onClick = "editTask(this)" class="fa-solid fa-pen-to-square"></i>
          <i onClick = "deleteTask(this); deleteTask()" class="fa-solid fa-trash-can"></i>
        </span>
        </div>`;
      console.log(data.title);
      return data;
    } else {
      console.log(`Error while posting todo with status : ${res.status}`);
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

// function remove card from Todo list (do not remove data from server)
const deleteTask = (e) => {
  e.parentElement.parentElement.remove(inputId.value);
};

// function to clean our input area
const resetInput = () => {
  inputId.value = "";
};

// adding eventListener to the button
btnId.addEventListener("click", (e) => {
  e.preventDefault();
  postTodo();
  resetInput();
});
