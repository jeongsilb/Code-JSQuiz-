const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const restart = document.getElementById("restart");
const results = document.getElementById("results");
let an = [];
let q = [];

// create our questions
let questions = [
    {
        question: "What does HTML stand for?",
        imgSrc: "img/html.png",
        choiceA: "Hypertext Markup Language",
        choiceB: "Hyper Markup Language",
        choiceC: "Hypertext Marke Language",
        correct: "A",
        correctAnswer: "Hypertext Markup Language"
    }, {
        question: "What does CSS stand for?",
        imgSrc: "img/css.png",
        choiceA: "Cross Site Scripting",
        choiceB: "Cascading Style Sheet",
        choiceC: "Counter-Strike:Source",
        correct: "B",
        correctAnswer: "Cascading Style Sheet"
    }, {
        question: "What does JS stand for?",
        imgSrc: "img/js.png",
        choiceA: "Jersey Shore",
        choiceB: "Junior School",
        choiceC: "JavaScript",
        correct: "C",
        correctAnswer: "JavaScript"
    }, {
        question: "Which of the followings is not allowed in C# as access modifier?",
        imgSrc: "img/csharp.png",
        choiceA: "public",
        choiceB: "friend",
        choiceC: "internal",
        correct: "B",
        correctAnswer: "friend"
    }, {
        question: "Which of the following C# keywords has nothing to do with multithreading?",
        imgSrc: "img/csharp.png",
        choiceA: "await",
        choiceB: "sealed",
        choiceC: "Correct",
        correct: "B",
        correctAnswer: "sealed"
    }, {
        question: "What is the data type for the Id field which is automatically assigned when you setup a table ?",
        imgSrc: "img/database.jpeg",
        choiceA: "Number",
        choiceB: "Autonumber",
        choiceC: "Text",
        correct: "C",
        correctAnswer: "Text"
    }, {
        question: "What software do you use to make databases ??",
        imgSrc: "img/database.jpeg",
        choiceA: "Microsoft Access",
        choiceB: "Microsoft Word",
        choiceC: "Microsoft Excel",
        correct: "A" ,
        correctAnswer: "Microsoft Access"
    }, {
        question: "Which of the following is the default access specifier of a class member variable?",
        imgSrc: "img/js.png",
        choiceA: "Private",
        choiceB: "Public",
        choiceC: "Pretected",
        correct: "A",
        correctAnswer: "Private"
    }, {
        question: "Which of the following operator returns the type of a class in C#?",
        imgSrc: "img/js.png",
        choiceA: "sizeof",
        choiceB: "typeof",
        choiceC: "&",
        correct: "B",
        correctAnswer: "typeof"
    }, {
        question: "Multiple inheritance is different from multiple levels of inheritance?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "An object of a derived class cannot access private members of base class?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "There is no private or protected inheritance in C#.NET?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "We can derive a class from a base class even if the base class's source code is not available?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "Creating a derived class from a base class requires fundamental changes to the base class?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Correct",
        choiceC: "Correct",
        correct: "A",
        correctAnswer: "Wrong"
    }, {
        question: "It is illegal to make objects of one class as members of another class?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "Value type variables in C# are derived from the class System.ValueType?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "Which of the following converts a type to a 64-bit integer in C#?",
        imgSrc: "img/csharp.png",
        choiceA: "ToInt64",
        choiceB: "ToSbyte",
        choiceC: "Toint32",
        correct: "A",
        correctAnswer: "ToInt64"
    }, {
        question: "The comparison operators can be overloaded?",
        imgSrc: "img/csharp.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
        correctAnswer: "Correct"
    }, {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        imgSrc: "img/js.png",
        choiceA: "last()",
        choiceB: "put()",
        choiceC: "push()",
        correct: "C",
        correctAnswer: "push()"
    }, {
        question: "Which of the following is not a reserved word in JavaScript?",
        imgSrc: "img/js.png",
        choiceA: "interface",
        choiceB: "throws",
        choiceC: "program",
        correct: "C",
        correctAnswer: "program"
    }

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
    restart.addEventListener("click", quizrestart);
}
// restart quiz
function quizrestart() {
    location.reload();
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//random questions shuffle
function shuffleQuestions(items) {
    for (var i = items.length; i-- > 1;) {
        var j = Math.floor(Math.random() * i);
        var tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
    }
}
shuffleQuestions(questions);



// checkAnwer
let abc=[];

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();

    } else{
        if(answer == "A"){
            abc.push("Q: "+questions[runningQuestion].question);
            abc.push("your wrong answer: "+questions[runningQuestion].choiceA);
            abc.push("*Correct Answer:    "+questions[runningQuestion].correctAnswer);
            abc.push("========================================================");
        }
        else if(answer == "B"){
            abc.push("Q :"+questions[runningQuestion].question);
            abc.push("your wrong answer: "+questions[runningQuestion].choiceB);
            abc.push("*Correct Answer:    "+questions[runningQuestion].correctAnswer);
            abc.push("========================================================");
        }
        else if(answer == "C"){
            abc.push("Q:"+questions[runningQuestion].question);
            abc.push("your wrong answer: "+questions[runningQuestion].choiceC);
            abc.push("*Correct Answer:    "+questions[runningQuestion].correctAnswer);
            abc.push("========================================================");
        }
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// extra variables
let allQ = [];
allQ.push(questions.question);

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.gif" :
        (scorePerCent >= 60) ? "img/4.gif" :
            (scorePerCent >= 40) ? "img/3.gif" :
                (scorePerCent >= 20) ? "img/2.gif" :
                    "img/1.gif";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
    results.style.display = "block";
    results.innerHTML ="<p>you got "+score+" correct answers out of "+questions.length+"<br>==Quiz and Corrent Answer==</p>";
    DisplayAll(questions);

    let t = document.createElement("P");
        t.textContent = "    ====== your "+(questions.length-score) +" of the wrong answers====="
        t.style.color = "Red";
        results.appendChild(t);
    
    Display(abc);

    
}
var userAnswer = "";
var numCorrect = 0;

function DisplayAll(someArray) {
    someArray.forEach(element => {
        let block = document.createElement("LI");
        let p = document.createElement("P");
        block.textContent = element.question;
        block.style.color = "#ed8566";
        block.style.marginLeft= "5px";
        p.textContent = "correct answer: " + element.correctAnswer;
        p.style.color = "Green";
        p.style.marginLeft= "30px";
        results.appendChild(block);
        results.appendChild(p);
    });
}

function Display(someArray) {
        someArray.forEach(element => {
        let w = document.createElement("p");
         w.textContent = element;
         w.style.marginLeft= "30px";
         results.appendChild(w);
    })};
   /* function Test(someArray) {
        for(let i=0;i< someArray.length;i++){
            let block = document.createElement("LI");
            let p = document.createElement("P");
            block.textContent = someArray[i].question;
            block.style.color = "#ed8566";
            block.style.marginLeft= "5px";
            p.textContent = "correct answer: " + someArray[i].correctAnswer;
            p.style.color = "Green";
            p.style.marginLeft= "30px";
            let w = document.createElement("P");
            w.textContent = "wrong answer: " + someArray[i].abc[i];
            results.appendChild(block);
            results.appendChild(p);
            results.appendChild(w);
    
        }
    }*/