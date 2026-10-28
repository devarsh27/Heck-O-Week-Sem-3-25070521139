const quiz = [
{
question:"Which language is used for web structure?",
options:["Python","HTML","Java","C++"],
answer:1
},
{
question:"Which is used for styling?",
options:["HTML","CSS","Python","SQL"],
answer:1
},
{
question:"Which language adds interactivity?",
options:["JavaScript","C","Java","Python"],
answer:0
},
{
question:"Which tag is used for image?",
options:["<img>","<pic>","<image>","<src>"],
answer:0
},
{
question:"Which company developed JavaScript?",
options:["Netscape","Google","Microsoft","IBM"],
answer:0
}
]

let currentQuestion = 0
let score = 0

const questionEl = document.getElementById("question")
const options = document.querySelectorAll(".option")
const level = document.getElementById("level")

function loadQuiz(){

let q = quiz[currentQuestion]

questionEl.innerText = q.question

options.forEach((btn,i)=>{
btn.innerText = q.options[i]
})

}

function checkAnswer(selected){

if(selected == quiz[currentQuestion].answer){
score++
alert("✅ Correct!")
}else{
alert("❌ Wrong!")
}

}

function nextQuestion(){

currentQuestion++
level.innerText = currentQuestion+1

if(currentQuestion < quiz.length){
loadQuiz()
}
else{
document.querySelector(".quiz-container").style.display="none"
document.getElementById("result").innerHTML=
"🎉 Quiz Finished <br> Your Score : "+score+" / 5"
}

}

loadQuiz()

const motivation = document.getElementById("motivation")

function checkAnswer(selected){

if(selected == quiz[currentQuestion].answer){
score++
motivation.innerText = "🔥 Amazing! Keep going!"
alert("✅ Correct!")
}
else{
motivation.innerText = "💪 Don't give up! Try next!"
alert("❌ Wrong!")
}

}
