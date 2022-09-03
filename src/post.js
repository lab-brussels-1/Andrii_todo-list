const btnId = document.getElementById("post");
const inputId = document.getElementById("inputId");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");


// make sure that user give input
const inputValidation = () => {
  if (inputId.value === "") {
    msg.innerHTML = "Pleas enter your task";
  } else {
    msg.innerHTML = "";
  }
};

const postTodo = async () => {
  try {
    const inputId = document.getElementById("inputId").value;
    const res = await fetch(`https://my-json-server.typicode.com/lab-brussels-1/Andrii_todo-list/todos`,
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
          <i onClick = "editTask(this); updateTodo()" class="fa-solid fa-pen-to-square"></i>
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

const updateTodo =  async (id) => 
{
    try
    {
        const res = await fetch(`https://my-json-server.typicode.com/lab-brussels-1/Andrii_todo-list/todos/${id}`)
        
    
        // CHECKING RESPONSE
        if (res.status === 200)
        {
            const data = await res.json(); 

            // We need to update the date and send a PUT request 
            const response = await fetch(`https://my-json-server.typicode.com/lab-brussels-1/Andrii_todo-list/todos/${id}`,
            {
                method: 'PUT',
                headers: 
                {
                    'Content-type': 'application/json',
                },
                    // Spread operator if you don't know what it is let me know 
                body : JSON.stringify({...data, title : inputId , completed : false})
            });    

            if(response.status === 200)
            {
                const newData = await response.json();
                console.log(newData);
                return newData;
            }
            else
            {
                console.log(`Error while updating a todo with status : ${response.status}`); 
                return false;
            }
           
        }
        else
        {
            console.log(`Error while getting a  todo with status : ${res.status}`);           
        }
    }
    catch(err)
    {
        console.error(err);
    }
};

// function remove card from Todo list (do not remove data from server)
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  data("data", JSON.stringify(data));
};

// function to clean our input area
const resetInput = () => {
  inputId.value = "";
};



// function to edit our task
const editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  inputId.value = selectedTask.children[0].innerHTML;
 // deleteTask(deleteTodo(inputId.value));
 updateTodo();
};

// adding eventListener to the button
btnId.addEventListener("click", (e) => {
  e.preventDefault();
  inputValidation();
  postTodo();
  resetInput();
});



