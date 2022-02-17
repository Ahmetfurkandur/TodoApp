// UI vars

const form = document.querySelector("form");
const txtNewTask = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector(".delete-all");
const taskList = document.querySelector("#task-list");
let items;

callEventListeners();
loadItems();

function callEventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {

    items = getItemsFromLocalStorage();

    items.forEach(function (item) {
        createItem(item);
    })
}
// get items from Local Storage
function getItemsFromLocalStorage(){
    if (localStorage.getItem('items')===null) {
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
}

// set item to local storage
function setItemToLocalStorage(text){
    item = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItemFromLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.forEach(function(item,index) {
        if (item === text) {
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text) {
    // creating a li tag
    const task = document.createElement("li");
    task.className = "list-group-item list-group-item-secondary";
    task.appendChild(document.createTextNode(text));

    // creating an a (anchor) tag
    const a = document.createElement("a");
    a.className = "delete-item";
    a.setAttribute("href", "#");

    a.innerHTML = '<i class="fas fa-times"></i>';

    task.appendChild(a);
    taskList.appendChild(task);
}

function addNewItem(event) {
    if (txtNewTask.value === '') {
        alert("tasks cannot be empty");
    } else {
        createItem(txtNewTask.value);

        setItemToLocalStorage(txtNewTask.value);
        txtNewTask.value = '';

    }

    event.preventDefault();
}

// delete an item
function deleteItem(event) {

    if (event.target.className === "fas fa-times") {

        if (confirm('are you sure?')) {
            event.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLocalStorage(event.target.parentElement.parentElement.textContent);
        }
    }
    event.preventDefault();
}

// delete all items
function deleteAllItems(e) {

    if (confirm('are you sure ?')) {

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}