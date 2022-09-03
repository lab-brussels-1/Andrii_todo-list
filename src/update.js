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