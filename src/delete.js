const deleteTodo = async (id) => {

  try {
   
    const res = await fetch(`${"http://localhost:3000/todos"}/${id}`, {
      method : "DELETE",
    });
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

const btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", (e) => {
    e.preventDefault();
   deleteTodo(newTask = document.getElementById("userInput").value);
 
});
