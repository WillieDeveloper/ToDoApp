const inputElement = document.querySelector('#input');
const todoListElement = document.querySelector('#list');
const doneAllButton = document.querySelector('#doneAction');
const restoreAllButton = document.querySelector('#restoreAction');
const deleteAllButton = document.querySelector('#removeAction');
const selectAllButton = document.querySelector('#selectAllAction').lastElementChild;
let todoList = [];

inputElement.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.keyCode === 13) && inputElement.value !== '') {
        todoList.push({
            task: inputElement.value,
            done: false,
            selected: false,
        });
        inputElement.value = '';

        setNewTask();
    }
});

doneAllButton.addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = true;
            todoItem.selected = false;
        }
    }

    setNewTask();
});

restoreAllButton.addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = false;
            todoItem.selected = false;
        }
    }

    setNewTask();
});

deleteAllButton.addEventListener('click', () => {
    todoList = todoList.filter(todoItem => !todoItem.selected);

    setNewTask();
});

selectAllButton.addEventListener('click', () => {
    for (const todoItem of todoList) {
        todoItem.selected = true;
    }

    setNewTask();
});

const setNewTask = () => {
    todoListElement.innerHTML = '';
    for (const todoItem of todoList) {
        const liElement = document.createElement('li');
        liElement.className = 'list-group-item';
        todoListElement.append(liElement);

        const checkElement = document.createElement('input');
        checkElement.type = 'checkbox';
        checkElement.setAttribute('id', todoItem.task);
        checkElement.checked = todoItem.selected;
        liElement.append(checkElement);

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', todoItem.task);
        labelElement.className = 'ml-3';
        if (todoItem.done) {
            labelElement.className += ' todoDone';
        }
        labelElement.innerText = todoItem.task;
        liElement.append(labelElement);

        const doneButton = document.createElement('button');
        doneButton.type = 'button';
        doneButton.className = 'btn btn-outline-primary';
        doneButton.innerText = 'Done';
        doneButton.style = 'float: right';
        liElement.append(doneButton);

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'btn btn-outline-danger';
        removeButton.innerText = 'Remove';
        removeButton.style = 'float: right';
        liElement.append(removeButton);
        
        checkElement.addEventListener('change', () => {
            todoItem.selected = checkElement.checked;
        });

        doneButton.addEventListener('click', () => {
            todoItem.done = true;
            setNewTask();
        });

        removeButton.addEventListener('click', () => {
            todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem);
            setNewTask();
        });
    }
    
}