let quizcount = 0;
let score = 0;

const ques = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const answerEls = document.querySelectorAll(".answer");
const list = document.getElementById("list");
const sbmt = document.getElementById("submit");

document.getElementById("quiz").style.height = "28vh";
list.classList.add("hide");
sbmt.innerHTML = `Start Quiz`;
ques.innerHTML = "<h2>Welcome to the Quiz!";

const startQuiz = () => {
  list.classList.remove("hide");
  sbmt.innerHTML = `Submit and Next`;
  ques.innerHTML = "Question";
  document.getElementById("quiz").style.height = "auto";
};

sbmt.addEventListener("click", startQuiz);


const deselectAnswers = () => {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
    console.log("Options Deselected")
  });
};
function getSelected() {
   let answer = undefined;

  answerEls.forEach((answerEl) => {
    
    if (answerEl.checked===true) {
      answer = answerEl.id;
      console.log("Answer Selected= ",answerEl.id);
    }
  });

  return answer;
}

var myArray =[a_text,b_text,c_text,d_text]
var arr =[];
const max=3
const min=0
n=4;
while(arr.length<n)
{
    val=Math.floor(Math.random()*(max-min+1))+min;
    if(arr.indexOf(val)===-1)
    {
        arr.push(val)
    }
}
var myData=[]
const len=10;


function quizFlow() {
  
  fetch(
      
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
  )
    .then((response) => {
        console.log("started fetching")
      return response.json();
    })
    .then((data) => {
        myArray.push(data);
        
        console.log(data);
        ques.innerHTML = data["results"][quizcount]["question"];
        myArray[arr[0]].innerHTML = data["results"][quizcount]["correct_answer"];
        myArray[arr[1]].innerHTML = data["results"][quizcount]["incorrect_answers"][0];
        myArray[arr[2]].innerHTML = data["results"][quizcount]["incorrect_answers"][1];
        myArray[arr[3]].innerHTML = data["results"][quizcount]["incorrect_answers"][2];
    })
    .catch((err) => {
      console.log(err);
    });
    
}

sbmt.addEventListener('click',quizFlow)

sbmt.addEventListener("click", () => {

  let ans=getSelected();
  console.log(ans);
  if (ans!=undefined) 
  {
    if(quizcount<len)
    {
        
        console.log("QuizCount=", quizcount)
        quizFlow();
        var fin=myArray[arr[0]].id
        console.log("final=",fin[0]);
    if (ans ===  fin[0]){
      score++;
      console.log("score= ", score);
    }
    deselectAnswers();
    }
    quizcount++;
  

  }
  if (quizcount === len) {
    deselectAnswers();
    document.getElementById("quiz").style.height = "17vh";
    document.getElementById(
      "quiz"
    ).innerHTML = `<div class="end"><h2>Quiz ended and your score is ${score} out of ${len}</div>
    <button type="button" onclick="window.location.reload()">Restart Quiz</button>`;
  }


});
