const form = document.querySelector("#todo-form");
const addBtn = document.querySelector(".add");
let list = document.querySelector("#todo-list");
let allSelectBtn = document.querySelector("#selectAll");
let storage = window.localStorage;
let arr = (JSON.parse(storage.getItem("todo"))) ? JSON.parse(storage.getItem("todo")) : [];

window.addEventListener("load", function() {
    if (arr.length > 0) {
        document.querySelector(".clear").removeAttribute("disabled");
        arr.forEach((el, index) => {
            createElement(el[0], el[1], el[2]);
            checkLineThough(el[1], index);
        })
        checkAll();
    }
})


// Click Add Button

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const input = document.querySelector("#todo-input");
    let allSelectBtn = document.querySelector("#selectAll");
    let inputValue = input.value.trim();

    if (inputValue.length > 0) {
        let emptyArr = [];
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = (date.getDay() < 10) ? "0" + date.getDay() : date.getDay();
        let hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
        let minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        let dateAdd = `${day}-${month}-${year} ${hour}:${minute}`;

        emptyArr=[inputValue,false,dateAdd];
        arr.push(emptyArr);

        createElement(inputValue, false, dateAdd);

        document.querySelector(".clear").removeAttribute("disabled");
        input.value = "";
        localStorage.setItem("todo", JSON.stringify(arr));
        if (allSelectBtn.checked) allSelectBtn.checked = false;
    }
})


// When Clicked Add Button Create Element

function createElement(value, checked = false, date) {

    let todoList = document.querySelector("#todo-list");
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    let input = document.createElement("input");
    input.setAttribute("id", "check");
    input.setAttribute("type", "checkBox");
    (checked == true) ? input.setAttribute("checked", true): null;
    todoItem.append(input)

    let text = document.createElement("p");
    text.classList.add("text");
    text.innerText = value;
    todoItem.append(text)

    let btns = document.createElement("div");
    btns.classList.add("changed-btns");

    // let editBtn=document.createElement("button");
    // editBtn.classList.add("edit");
    // editBtn.innerText="Edit";
    // btns.append(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "X"
    // let icon=document.createElement("i");
    // icon.classList.add("fas", "fa-trash-alt")
    // deleteBtn.append(icon);


    let dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.innerText = date;

    btns.append(dateDiv);
    btns.append(deleteBtn);

    todoItem.append(btns);
    todoList.append(todoItem);

    clearElements();
    checkAll();
}



// Click Delete Button

list.addEventListener("click", function(e) {
    if (e.target.className == "delete") {
        deleteBtn = e.target;
        let index = (Array.from(deleteBtn.closest("#todo-list").children).indexOf(deleteBtn.closest(".todo-item")))
        console.log(index)
        deleteBtn.closest(".todo-item").remove();
        arr.forEach((el, i) => {
            if (index == i) {
                arr.splice(index, 1)
            }
        })
        if (list.children.length == 0) {
            document.querySelector(".clear").setAttribute("disabled", true);
        }
        storage.setItem("todo", JSON.stringify(arr))
    }
})


// click todo lists checkbox input

list.addEventListener("click", function(e) {

    if (e.target.id == "check") {
        let check = e.target;
        let index = (Array.from(check.closest("#todo-list").children).indexOf(e.target.closest(".todo-item")))
        if (check.checked) {
            check.nextElementSibling.classList.add("todo-checked")
        } else {
            check.nextElementSibling.classList.remove("todo-checked")
        }
        arr.forEach((el, i) => {
            if (index == i) {
                el[1] = !el[1];
            }
        })
        checkAll();
        storage.setItem("todo", JSON.stringify(arr))
    }
})



// Click All Select Button

allSelectBtn.addEventListener("click", function() {
    let check = document.querySelectorAll("#check");

    check.forEach(el => {
        if (el.checked != allSelectBtn.checked) {
            el.click();
        }
    })
})


//  Click Clear Button

function clearElements() {
    let clearBtn = document.querySelector(".clear");
    clearBtn.addEventListener("click", function() {
        let todoList = document.querySelector("#todo-list");
        todoList.innerHTML = "";
        this.setAttribute("disabled", true);
        arr = [];
        storage.removeItem("todo")
    })
}

//  Check Text Line Through

function checkLineThough(el, index) {
    let todoItem = document.querySelectorAll(".text");
    if (el) {
        todoItem[index].classList.add("todo-checked")
    } else {
        todoItem[index].classList.remove("todo-checked")
    }
}

// Check All Check Button

function checkAll() {
    let allCheck = true;
    arr.forEach((el) => {
        if (!el[1]) allCheck = false;
        if (allCheck) {
            allSelectBtn.setAttribute("checked", true)
        } else {
            allSelectBtn.removeAttribute("checked")
        }
    })
}