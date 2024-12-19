const inputTask = document.getElementById('inputTask')
const tasks = document.querySelector('.tasks')
const btn = document.getElementById('btn')
const dltbtn = document.getElementById('dltBtn')
let divelement


const getItemFromLocal = () => {
    return JSON.parse(localStorage.getItem('Todo List'))
}

const addlocaltodolisttoLocalStorage = (localTodoItems) => {
    return localStorage.setItem('Todo List', JSON.stringify(localTodoItems))
}


let localTodoItems = getItemFromLocal() || []

const showingtodoListfromLocal = (curElem) => {
    divelement = document.createElement('div')
    divelement.classList.add('todoTasks')
    divelement.innerHTML = `<p>${curElem}</p><i class="ri-close-circle-fill dltBtn"></i>`
    tasks.append(divelement)
}


const handlebtnClick = (e) => {
    e.preventDefault()
    if (inputTask.value !== "") {


        let todoItems = inputTask.value.trim()

        if (!localTodoItems.includes(todoItems)) {
            localTodoItems.push(todoItems)
            localTodoItems = [...new Set(localTodoItems)]
            localStorage.setItem('Todo List', JSON.stringify(localTodoItems))

            divelement = document.createElement('div')
            divelement.classList.add('todoTasks')
            divelement.innerHTML = `<p>${inputTask.value}</p><i class="ri-close-circle-fill dltBtn"></i>`
            tasks.append(divelement)
        }
    }
    inputTask.value = ""
}


const showtodoList = () => {
    localTodoItems.forEach((curElem) => {
        showingtodoListfromLocal(curElem)
    });
}

showtodoList()

const removetodo = (e) => {
    let dlttodoItem = e.target
    let todoToRemove = dlttodoItem.previousElementSibling.textContent
    let parentElem = dlttodoItem.parentElement

    localTodoItems = localTodoItems.filter((curTodo) => {
        return curTodo !== todoToRemove
    })

    addlocaltodolisttoLocalStorage(localTodoItems)
    parentElem.remove()

}


tasks.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.classList.contains('dltBtn')){
        removetodo(e)
    }

})



btn.addEventListener('click', (e) => {
    handlebtnClick(e)
})