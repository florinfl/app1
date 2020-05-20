


function liTemplate(item){
    return `<li data-id="${item._id}">
<span class="spanItem">${item.text}</span>
<button class="editMe">Edit</button>
<button class="deleteMe">Delete</button>
</li> \n\n`
}

let listItems = itemsArray.map(function(item){
    return liTemplate(item)
}).join("")

document.querySelector("#ulTodo").insertAdjacentHTML("beforeend",listItems)




document.querySelector("#inputTodo").value = `newitem ${Date.now()}`

document.querySelector("#todoForm").addEventListener('submit',function(e){
    e.preventDefault()
   
    let valTodo =  document.querySelector("#inputTodo").value 

    axios.post('/adauga',{text:valTodo}).then(function(response){
        console.log(response)
        let itemResponse = response.data.ops[0]
        let listUl = document.querySelector("#ulTodo")

        let newItem =  liTemplate(itemResponse)

        listUl.insertAdjacentHTML("beforeend",newItem)

    }).catch(function(err){

    })
})



document.querySelector("#ulTodo").addEventListener('click',function(e){
    //alert('clicked')
    let id = e.target.parentNode.getAttribute('data-id')

    if(e.target.classList.contains('deleteMe'))
    {
        axios.post('/delete',{id:id}).then(function(response)
        {
            e.target.parentNode.remove()
            console.log(response.data.ok)
        }).catch(function(err){
            console.log(err)
        })
        
    }

    if(e.target.classList.contains('editMe'))
    {
        let newVal = prompt("noua valoare",`newVal ${Date.now()}`)
        axios.post('/edit',{id:id,newVal:newVal}).then(function(response)
        {
            e.target.parentNode.querySelector(".spanItem").innerText = newVal
            console.log(response.data.value)
        }).catch(function(err){
            console.log(err)
        })
        
    }

})