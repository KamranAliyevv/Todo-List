const form=document.querySelector("#todo-form");
const addBtn=document.querySelector(".add");
let allSelectBtn=document.querySelector("#selectAll");
let storage=window.localStorage;



let arr=(JSON.parse(storage.getItem("todo"))) ? JSON.parse(storage.getItem("todo")) : [];

window.addEventListener("load",function(){
    if(arr.length>0){
        document.querySelector(".clear").removeAttribute("disabled");
        arr.forEach(el=>{
            createElement(el[0],el[1])
        })
    }
})


form.addEventListener("submit",function(e){
    e.preventDefault();
    const input=document.querySelector("#todo-input");
    let allSelectBtn=document.querySelector("#selectAll");
    let inputValue=input.value.trim();
    if(inputValue.length>0){
        let emptyArr=[];
        emptyArr.push(inputValue);
        emptyArr.push("false");
        arr.push(emptyArr);
        createElement(inputValue);
        document.querySelector(".clear").removeAttribute("disabled");
        input.value="";
        localStorage.setItem("todo",JSON.stringify(arr));
        if(allSelectBtn.checked) allSelectBtn.checked=false;
    }
})

function createElement(value,checked="false"){
    let todoList=document.querySelector("#todo-list");
    let todoItem=document.createElement("div");
    todoItem.classList.add("todo-item");
    let input=document.createElement("input");
    input.setAttribute("id","check");
    input.setAttribute("type","checkBox");
    (checked==true) ? input.setAttribute("checked",true) : null;
    todoItem.append(input)
    let text=document.createElement("p");
    text.innerText=value;
    todoItem.append(text)
    let btns=document.createElement("div");
    btns.classList.add("changed-btns");
    // let editBtn=document.createElement("button");
    // editBtn.classList.add("edit");
    // editBtn.innerText="Edit";
    // btns.append(editBtn);
    let deleteBtn=document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText="Delete";
    btns.append(deleteBtn);
    todoItem.append(btns);
    todoList.append(todoItem);

    clearElements();
}


    let list=document.querySelector("#todo-list");
    
        list.addEventListener("click",function(e){
            if(e.target.className=="delete"){
            deleteBtn=e.target;
            let text=deleteBtn.parentElement.previousElementSibling.innerText;
            deleteBtn.closest(".todo-item").remove();
          arr.forEach((el,index)=>{
              if(el[0]==text){
                  arr.splice(index,1)
              }
          })
            if(list.children.length==0){
               document.querySelector(".clear").setAttribute("disabled",true);
            }
            storage.setItem("todo",JSON.stringify(arr))
        }
        })


        list.addEventListener("click",function(e){
            if(e.target.id=="check"){
                let check=e.target;
            if(check.checked){
                check.nextElementSibling.classList.add("todo-checked")
            }
            else{
                check.nextElementSibling.classList.remove("todo-checked")
            }
        }
    })

function clearElements(){
    let clearBtn=document.querySelector(".clear");
    clearBtn.addEventListener("click",function(){
        let todoList=document.querySelector("#todo-list");
        todoList.innerHTML="";
        this.setAttribute("disabled",true);
        storage.removeItem("todo")
    })
}


    allSelectBtn.addEventListener("click",function(){
        let check=document.querySelectorAll("#check");

        check.forEach((el,index)=>{
            if(el.checked!=allSelectBtn.checked){
          el.click();
            }
        })
    })