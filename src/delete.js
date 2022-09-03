//import { resetInput } from '../handlers/handlers.js';
const deleteTodo = async (id) => {
  try {
    const res = await fetch(
      `${"https://my-json-server.typicode.com/andriivam/Andrii_todo-list/todos"}/${id}`,
      {
        method: "DELETE",
      }
    );
    // CHECKING RESPONSE
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      console.log(`Error while deleting todo with status : ${res.status}`);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteTodo(inputId.value);
  deleteValidation();
});

const deleteValidation = () => {
  if (inputId.value === "") {
    const msg = document.getElementById("msg");
    msg.innerHTML = "Pleas enter id of task to be deleted";
  } else {
    msg.innerHTML = "Task was deleted";
  }
};
