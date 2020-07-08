const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

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
        const optionIndex = availableOptions[Math.floor(Math.random()*availableQuestions.length)];
        //get the position of optionindex from the available questions
        const index2 = availableOptions.indexOf(optionIndex);
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
    //geet the answer by comparing the id of clicked option 
    if(id === currentQuestion.answer){
        //set the green clr to the correct option 
        element.classList.add("correct");
    }
    else{
        //set the red clr to the incorrect option 
        element.classList.add("wrong");
        //if the answer is incorrect then show the correct ans by adding green clr 
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt( optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();

}
//make all the options unclickable once the user select any option 
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-clicked");
    }
};

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
    }
    else{
        getNewQuestion();
    }
}

window.onload = function(){
    //first we will set all the question in availableQuestions  array
    setAvailableQuestions();
    //second we will getQuestion() function
    getNewQuestion(); 
}