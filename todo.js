// selectors 

const todo_input = document.querySelector('.todo-input');
const todo_button = document.querySelector('.todo-button');
const todo_list = document.querySelector('.todo-list');
const filter_option = document.querySelector('.filter-todo');
const priority_filter = document.querySelector('.priority-filter');
// Event listeners

document.addEventListener('DOMContentLoaded', get_todo);
window.onbeforeunload = todo_button.addEventListener('click', add_todo);
todo_list.addEventListener('click', delete_check);
filter_option.addEventListener('click', filter_todo);
priority_filter.addEventListener('click', filter_priority);

// functions

// function to create todo element
function add_todo(event) {
    event.preventDefault();

    // todo div
    var priority = document.getElementById('priority-set').value;
    const todo_div = document.createElement('div');
    todo_div.classList.add('todo')
    todo_div.classList.add(priority)
        // li
    const new_todo = document.createElement('li');
    new_todo.innerText = todo_input.value;
    new_todo.classList.add('todo-item');
    todo_div.appendChild(new_todo)

    // adding todo to local storage
    save_todo(todo_input.value)

    // check button
    const completed_button = document.createElement('button');
    completed_button.innerHTML = '<i class="bi bi-check-lg"></i>';
    completed_button.classList.add('complete-button');

    todo_div.appendChild(completed_button)

    // delete button
    const trash_button = document.createElement('button');
    trash_button.innerHTML = '<i class="bi bi-trash"></i>';
    trash_button.classList.add('trash-button');

    todo_div.appendChild(trash_button)

    // appending to the todo-list
    todo_list.appendChild(todo_div)

    // clear todo input value
    todo_input.value = "";
    var p = document.getElementsByClassName('todo')
    var len = p.length
    var doc = document.querySelector('.count')
    doc.innerText = "Total number of todos - " + len;
}


// function to delete todo
function delete_check(e) {
    const item = e.target;


    // Delete todo
    if (item.classList[0] === "trash-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        var p = document.getElementsByClassName('todo')
        var len = p.length
        var doc = document.querySelector('.count')
        doc.innerText = "Total number of todos - " + (len - 1);
        remove_todo(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    // check
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}


// function to filter todo
function filter_todo(e) {
    const todos = todo_list.childNodes;
    todos.forEach(function() {
        switch (e.target.value) {
            case "all":
                document.querySelectorAll('.todo').forEach((element) => {
                    element.style.display = "flex"
                });
                break;

            case "completed":
                document.querySelectorAll('.todo').forEach((element) => {
                    element.style.display = "none"
                });

                document.querySelectorAll('.completed').forEach((element) => {
                    element.style.display = "flex"
                });
                break;

            case "uncompleted":
                document.querySelectorAll('.todo').forEach((element) => {
                    element.style.display = "flex"
                });

                document.querySelectorAll('.completed').forEach((element) => {
                    element.style.display = "none"
                });
                break;
        }
    });
}


// filter todo based on priority
function filter_priority(e) {
    const todos = todo_list.childNodes;
    todos.forEach(function() {
        switch (e.target.value) {
            case 'priority':
                document.querySelectorAll('.high').forEach((element) => {
                    element.style.display = "flex"
                });
                document.querySelectorAll('.medium').forEach((element) => {
                    element.style.display = "flex"
                });
                document.querySelectorAll('.low').forEach((element) => {
                    element.style.display = "flex"
                });
                break;
            case 'high':
                document.querySelectorAll('.high').forEach((element) => {
                    element.style.display = "flex"
                });
                document.querySelectorAll('.medium').forEach((element) => {
                    element.style.display = "none"
                });
                document.querySelectorAll('.low').forEach((element) => {
                    element.style.display = "none"
                });
                break;

            case 'medium':
                document.querySelectorAll('.high').forEach((element) => {
                    element.style.display = "none"
                });
                document.querySelectorAll('.medium').forEach((element) => {
                    element.style.display = "flex"
                });
                document.querySelectorAll('.low').forEach((element) => {
                    element.style.display = "none"
                });
                break;

            case 'low':
                document.querySelectorAll('.high').forEach((element) => {
                    element.style.display = "none"
                });
                document.querySelectorAll('.medium').forEach((element) => {
                    element.style.display = "none"
                });
                document.querySelectorAll('.low').forEach((element) => {
                    element.style.display = "flex"
                });
                break;
        }
    })
}


// function to save todo in local storage
function save_todo(todo) {
    // Check for already existing todo
    let todos;
    let p;
    if ((localStorage.getItem('todos') === null) && (localStorage.getItem('p') === null)) {
        todos = [];
        p = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        p = JSON.parse(localStorage.getItem('p'));
    }
    var priority = document.getElementById('priority-set').value
    p.push(priority)
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('p', JSON.stringify(p));
}


// finction to reteieve todo from local storage
function get_todo() {
    let todos;
    let p;
    if ((localStorage.getItem('todos') === null) && (localStorage.getItem('p') === null)) {
        todos = [];
        p = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        const todo_div = document.createElement('div');
        todo_div.classList.add("todo")
            // li
        const new_todo = document.createElement('li');
        new_todo.innerText = todo;
        new_todo.classList.add('todo-item');
        todo_div.appendChild(new_todo)

        // check button
        const completed_button = document.createElement('button');
        completed_button.innerHTML = '<i class="bi bi-check-lg"></i>';
        completed_button.classList.add('complete-button');

        todo_div.appendChild(completed_button)

        // delete button
        const trash_button = document.createElement('button');
        trash_button.innerHTML = '<i class="bi bi-trash"></i>';
        trash_button.classList.add('trash-button');

        todo_div.appendChild(trash_button)

        // appending to the todo-list
        todo_list.appendChild(todo_div)
        todo_div.classList.add(p)

        var p = document.getElementsByClassName('todo')
        var len = p.length
        var doc = document.querySelector('.count')
        doc.innerText = "Total number of todos - " + len;

    })
    pri = JSON.parse(localStorage.getItem('p'))
    for (let j = 0; j <= pri.length; j++) {
        document.getElementsByClassName('todo')[j].classList.add(pri[j])
    }

}


// function to remove todo from local storage
function remove_todo(todo) {
    // Check for already existing todo
    let todos;
    let p;
    if ((localStorage.getItem('todos') === null) && (localStorage.getItem('p') === null)) {
        todos = [];
        p = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        p = JSON.parse(localStorage.getItem('p'));
    }
    const todo_index = todo.children[0].innerText;
    todos.splice(todos.indexOf(todo_index), 1);
    p.splice(p.indexOf(todo_index), 1)
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("p", JSON.stringify(p));
}

// var p = document.getElementsByClassName('todo')
// var len = p.length
// var doc = document.querySelector('.count')
// doc.innerText = "Total number of todos - " + len;

// var qw = localStorage.getItem('p')
// undefined
// qw = JSON.parse(localStorage.getItem('p'))
// (2) ["high", "high"]
// qw[1]
// "high"
// for(let o=0; o<=qw.length; o++){
//     document.getElementsByClassName('todo')[o].classList.add(qw[o])