const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctanswers = 0;
let attempt = 0;

//push the question into availableQuestions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]) 
    }
} 
//set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the position of questionIndex from the availableQuestions array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the questionIndex from the availableQuestions  array ,so that the question does not repeat
    availableQuestions.splice(index1 , 1);
    //set options
    //get the length of options
    const optionLen = currentQuestion.options.length;
    //push options into availableQuestions array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }  

    let animationDelay = 0.15;
    //create options in html
    optionContainer.innerHTML=" ";
    for(let i=0; i<optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        //get the position of optionindex from the available questions
        const index2 = availableOptions.indexOf(optionIndex);
        console.log(optionIndex);
        console.log(index2);
        //get position of of optionIndex from the availableOptions,so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className= "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick" ,"getResult(this)");
    }
    questionCounter++
}

//get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    //get the answer by comparing the id of clicked option 
    if(id === currentQuestion.answer){
        //set the green color to the correct option 
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctanswers++;
    }
    else{
        //set the red color to the incorrect option 
        element.classList.add("wrong");
         //add the indicator to incorrect mark
         updateAnswerIndicator("wrong");
        //if the answer is incorrect then show the correct ans by adding green clr 
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt( optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct")
            }
        }
    }
    attempt++;
    unclickableOptions();

}
//make all the options unclickable once the user select any option 
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-clicked");
    }
}

function answersIndicator(){
    const totalQuestion = quiz.length;
    answersIndicatorContainer.innerHTML = '';
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
    var icon;
    if(markType === "correct"){
        icon = '<i class="fa fa-check" aria-hidden="true"></i>';
    }
    else{
        icon = '<i class="fa fa-times" aria-hidden="true"></i>';
    }
    answersIndicatorContainer.children[questionCounter-1].innerHTML = icon;

}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}
 
function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctanswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctanswers;
    const percent = (correctanswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percent.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctanswers +"/" + quiz.length;

}

function resetQuiz(){
    questionCounter = 0;
    correctanswers = 0;
    attempt = 0;
}

function tryAgain(){
    //hide the result box
    resultBox.classList.add("hide");
    //show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    //hide result box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}
// STARTING POINT
function startQuiz(){
    //hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    //first we will set all the question in availableQuestions  array
    setAvailableQuestions();
    //second we will getQuestion() function
    getNewQuestion(); 
    //to create indicator of answers
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}