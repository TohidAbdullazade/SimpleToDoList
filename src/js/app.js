// Element Section;
const form = document.querySelector('#addTodo');
const input = document.querySelector('#addInput');
const cardBody = document.querySelectorAll('.card-body')[0]
const cardBodySecond = document.querySelectorAll('.card-body')[1];
const ul = document.querySelector('.list-group');
const resetButton = document.querySelector('#resetButton');
const filterInput = document.querySelector('#filterInput');

let emptyTodo = [];


// Run to Events;
runAllEvents();

//  Output of all Events;
function runAllEvents() {
    form.addEventListener('submit', addTodo);
    cardBodySecond.addEventListener('click', removeTodo)
    document.addEventListener('DOMContentLoaded', saveItems)
    resetButton.addEventListener('click', resetAllTodos)
    
};

// Save Items When Page Loaded;
function saveItems() {
    checkTodoFromStorage();
    emptyTodo.forEach(function (todo) {
        creatingNewTodoTOUI(todo)
    });
};

// Remove Item from InterFace;
function removeTodo(e) {
    if (e.target.className === 'fa-solid fa-trash') {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeValueFromStorage(todo.textContent);
    };


};
// Remove Item from Storage;
function removeValueFromStorage(removeItem) {
    checkTodoFromStorage();
    emptyTodo.forEach((removeTodo, index) => {
        if (removeItem === removeTodo) {
            emptyTodo.splice(index, 1)
        }
        localStorage.setItem('Todo', JSON.stringify(emptyTodo));
    });
};

// Reset All Todo's
function resetAllTodos() {
    // Reset from UserInterface; 
    const removeList = document.querySelectorAll('.list-group-item')
    if (removeList.length > 0) {
        removeList.forEach(function (deleted) {
            deleted.remove();
        });
        // Reset from Local Storage  
        emptyTodo = [];
        localStorage.setItem('Todo', JSON.stringify(emptyTodo));
        popUpMessage('success', ' ')
    } else {
        popUpMessage('warning', 'must have at least one element to delete it')

    };
};

// The part where Events work && Access to common Methods;
function addTodo(e) {
    inputText = input.value.trim();
    if (inputText === null || inputText === '')
        popUpMessage('danger', 'This Field is required')
    else {
        creatingNewTodoTOUI(inputText);
        addTodoToLocalStorage(inputText);
        popUpMessage('success', 'The Task has Completed succesful')

    };
    e.preventDefault();
    input.value = ''
};

// Creating TodoList to Interface;
function creatingNewTodoTOUI(newTodo) {
    // created List;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.id = 'created-link';
    li.textContent = newTodo;

    // created Hyperlink;
    const a = document.createElement('a');
    a.href = '#';
    a.id = 'created-link'

    // created Icon;   
    const i = document.createElement('i');
    i.className = "fa-solid fa-trash";
    i.style.color = 'red'

    // adding elements to their parents;
    a.appendChild(i);
    li.appendChild(a);
    ul.appendChild(li);

};
// Creat Popup-Message;
function popUpMessage(type, message) {
    // Creating Pop-Up Element
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    cardBody.appendChild(div);

    setTimeout(function () {
        div.remove()
    }, 3000)
}

// Add Todo to Local;
function addTodoToLocalStorage(newTodo) {
    checkTodoFromStorage();
    emptyTodo.push(newTodo);
    localStorage.setItem('Todo', JSON.stringify(emptyTodo));

};

// Check Value from Local;
function checkTodoFromStorage() {
    if (localStorage.getItem('Todo') === null) {
        emptyTodo = [];
    } else {
        emptyTodo = JSON.parse(localStorage.getItem('Todo'));
    };
};

