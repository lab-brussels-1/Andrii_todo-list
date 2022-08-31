
const postTodo =  async () => 
{
    try
    {
        let newTask = document.getElementById("userInput").value
        const res = await fetch('http://localhost:3000/todos',
        {
            method: 'POST',
            headers: 
            {
                'Content-type': 'application/json',
            },
            body : JSON.stringify({title : newTask , completed : false})
        });
    
        // CHECKING RESPONSE 
        if (res.status === 201)
        {
            const data = await res.json();
           // CREATING OUR LIST 
        const container = document.getElementById("taskList");
        const newLi = document.createElement("ul");
        const newLiItem = document.createElement("li");
            newLiItem.innerHTML = data.title;
            newLi.appendChild(newLiItem)
            container.appendChild(newLi)
            return data;
        }
        else
        {
            console.log(`Error while posting todo with status : ${res.status}`);
            return false;
        }
    }
    catch(err)
    {
        console.error(err);
    }
}

const addTaskBtn = document.getElementById("add-task");
addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postTodo();
});