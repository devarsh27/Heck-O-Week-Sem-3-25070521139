let taskCount = 0;

function addTask(){

let input = document.getElementById("taskInput");
let taskText = input.value;

if(taskText === "") return;

let li = document.createElement("li");

li.innerHTML = `
<span onclick="completeTask(this)">${taskText}</span>
<button class="delete" onclick="deleteTask(this)">X</button>
`;

document.getElementById("taskList").appendChild(li);

taskCount++;
document.getElementById("taskCount").innerText = taskCount;

input.value="";
}

function completeTask(task){
task.classList.toggle("completed");
}

function deleteTask(btn){

btn.parentElement.remove();

taskCount--;
document.getElementById("taskCount").innerText = taskCount;

}