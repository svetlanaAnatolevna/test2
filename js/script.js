const btn = document.getElementById('btn')
const tastInput = document.querySelector('form input[type=text]')
const form = document.querySelector('form')
const listUl = document.querySelector("#container ul")
const taskNull = document.querySelector('.taskNull')

form.addEventListener('submit', addTask);
// if (localStorage.getItem('taskHTML'))
//     listUl.innerHTML = localStorage.getItem('taskHTML')

let tasks = [];


//проверка localstorage
if (localStorage.getItem('tasks'))
    // console.log(localStorage.getItem('tasks'))
    tasks = JSON.parse(localStorage.getItem('tasks'))

tasks.forEach(item => renderTasks(item))
taskShowNo()

function taskShowNo() {
    if (tasks.length === 0) {
        let show = `<li class="taskNull">
        <img src="img/img2.jpg" alt="">
        <h2>Список дел пуст</h2>
    </li>`
        listUl.insertAdjacentHTML('afterbegin', show)
    }
    else {
        const emptyList = document.querySelector('.taskNull')
        emptyList ? emptyList.remove() : null;
    }

}

function addTask(event) {
    event.preventDefault();

    let taskText = tastInput.value
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }
    tasks.push(newTask);
    console.log(tasks);
    const cssClass = newTask.done ? 'updateList' : ''


    if (newTask.text === '') return;
    // const taskHTML = `<li  id=${newTask.id}  class=list-group-item>
    //             <div class=${cssClass}>${newTask.text}</div>
    //                 <div>
    //                 <button data-action='done' class=bt1></button>
    //                 <button data-action='delete' class=bt2></button>
    //                 </div>
    //                 </li>`
    // listUl.insertAdjacentHTML('beforeend', taskHTML)
    renderTasks(newTask);
    tastInput.value = '';
    tastInput.focus();
    taskShowNo();
    // if (listUl.children.length > 1)
    //     taskNull.classList.add('taskDisplay')
    // saveHtmlToLS()
    saveToLocalStorage();

}
listUl.addEventListener('click', deleteTask)
function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;
    const parrentNode = event.target.closest('.list-group-item');
    parrentNode.remove();
    // console.log(event.target)
    // if (listUl.children.length === 1)
    //     taskNull.classList.remove('taskDisplay')
    // saveHtmlToLS()
    // const id = parrentNode.id
    tasks = tasks.filter(item => item.id !== +parrentNode.id)
    console.log(tasks)
    taskShowNo();
    saveToLocalStorage();
}

listUl.addEventListener('click', doneTask)
function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;
    const parrentNode = event.target.closest('.list-group-item');

    const task = tasks.find(item => item.id === +parrentNode.id)
    task.done = !task.done;
    parrentNode.querySelector('div').classList.toggle('updateList');
    // saveHtmlToLS()
    // console.log(task)
    saveToLocalStorage();
}

// function saveHtmlToLS() {
//     localStorage.setItem('taskHTML', listUl.innerHTML)
// }
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTasks(item) {
    const cssClass = item.done ? 'updateList' : ''
    const taskHTML = `<li  id=${item.id}  class=list-group-item>
    <div class=${cssClass}>${item.text}</div>
        <div>
        <button data-action='done' class=bt1></button>
        <button data-action='delete' class=bt2></button>
        </div>
        </li>`
    listUl.insertAdjacentHTML('beforeend', taskHTML)
}

//===============================================
