function startQuiz() {
    let timeRemaining = 0;

    // user clicks Start Quiz which hides container and displays quiz container
    const startButtonEl = document.getElementById("startButton");
    const timeRemainingEl = document.getElementById("time-remaining");
    const finalScoreEl = document.getElementById("finalScore");
    const numQuestions = questions.length;
    const quizContainerEl = document.getElementById("quizBox");
    const landingContainerEl = document.getElementById("landingContainer");
    const finalContainerEl = document.getElementById("finalContainer");
    const highScoreContainerEl = document.getElementById("highScoreContainer");
    const submitButtonEl = document.getElementById("enterInitials");
    const highScoreButtonEl = document.getElementById("highScoreButton");

    let highScores = [];
        // to store and retrieve arrays in/from localStorage
    if (JSON.parse(localStorage.getItem('scores')) !== null) {
        highScores = JSON.parse(localStorage.getItem("scores"));
    }

    function startQuiz() {
        let rowEl = null;
        let colEl = null;
        let headerEl = null;
        let buttonEl = null;
        quizContainerEl.setAttribute("class", "container");
        let currentQuestion = 1;
        let score = 0;

        timeRemaining = numQuestions * 15;
        timeRemainingEl.setAttribute("value", timeRemaining);

        let myInterval = setInterval(function() {
            if (timeRemaining < 1) {
                clearInterval(myInterval);
                quizContainerEl.setAttribute("class", "container d-none");
                finalContainerEl.setAttribute("class", "container");
                return;
            }
            timeRemaining = timeRemaining - 1;
            timeRemainingEl.setAttribute("value", timeRemaining);
        }, 1000);
        let clickTimeout = false;
    function generateQuestion(questionNum) {
        quizContainerEl.innerHTML = "";
        rowEl = document.createElement("div");
        rowEl.setAttribute("class", "row");
        quizContainerEl.append(rowEl);

        colEl = document.createElement("div");
        colEl.setAttribute("class", "col-0 col-sm-2");
        rowEl.append(colEl);

        colEl = document.createElement("div");
        colEl.setAttribute("class","col-12 col-sm-8");
        rowEl.append(colEl);

        colEl = document.createElement("div");
        colEl.setAttribute("class","col-0 col-sm-2");
        rowEl.append(colEl);

        colEl = rowEl.children[1];
        rowEl = document.createElement("div");
        rowEl.setAttribute("class","row mb-3");
        colEl.append(rowEl);

        colEl = document.createElement("div");
        colEl.setAttribute("class","col-12");
        rowEl.append(colEl);

        headerEl = document.createElement("h2");
        headerEl.innerHTML = questions[questionNum-1].title;
        colEl.append(headerEl);

        colEl = quizContainerEl.children[0].children[1];
        for (let i = 0; i < 4; i++) {
            let rowEl = document.createElement("div");
            rowEl.setAttribute("class","row mb-1");
            colEl.append(rowEl);

            let colEl2 = document.createElement("div");
            colEl2.setAttribute("class","col-12");
            rowEl.append(colEl2);

            buttonEl = document.createElement("button");
            buttonEl.setAttribute("class","btn btn-primary");
            buttonEl.setAttribute("type","button");
            buttonEl.innerHTML = questions[currentQuestion-1].choices[i];
            colEl2.append(buttonEl);
            buttonEl.addEventListener("click", function() {
                if (clickTimeout) {
                    return;
                }
                clickTimeout = true;
                clearInterval(myInterval);
                let colEl = quizContainerEl.children[0].children[1];
                let rowEl = document.createElement("div");
                rowEl.setAttribute("class", "row border-top");
                colEl.append(rowEl);

                colEl = document.createElement("div");
                colEl.setAttribute("class","col-12");
                rowEl.append(colEl);

                let parEl = document.createElement("p");
                colEl.append(parEl);
                if (this.innerHTML === questions[currentQuestion - 1].answer) {
                    parEl.innerHTML = "Correct!";
                } else {
                    parEl.innerHTML = "Incorrect";
                    timeRemaining = timeRemaining - 15;
                    if (timeRemaining < 0) {
                        timeRemaining = 0;
                    }
                    timeRemainingEl.setAttribute("value",timeRemaining);
                }
                currentQuestion++;
                if (currentQuestion>questions.length) {
                    score = timeRemaining;
                }
                setTimeout(function() {
                    if (currentQuestion > questions.length) {
                        quizContainerEl.setAttribute("class", "container d-none");
                        finalContainerEl.setAttribute("class", "container");
                        finalScoreEl.setAttribute("value", score);
                    } else {
                        generateQuestion(currentQuestion);
                        clickTimeout = false;
                        myInterval = setInterval(function() {
                            if (timeRemaining < 1) {
                                clearInterval(myInterval);
                                quizContainerEl.setAttribute("class", "container d-none");
                                finalContainerEl.setAttribute("class", "container");
                                return;
                            }
                            timeRemaining = timeRemaining - 1;
                            timeRemainingEl.setAttribute("value", timeRemaining);
                        }, 1000);
                    }
                }, 2000);
            });
        }
    }
    function saveHighScore() {
        let initialsEl = document.getElementById("nameEntry");
        let newHighScore = {
            initials: initialsEl.value,
            highScore: score
        };
        console.log(newHighScore);
        highScores.push(newHighScore);
        console.log(highScores);
        localStorage.setItem("scores", JSON.stringify(highScores));
    }
    submitButtonEl.addEventListener("click", saveHighScore);

    generateQuestion(currentQuestion);
    }

    startButtonEl.addEventListener("click", startQuiz);

    highScoreButtonEl.addEventListener("click", function() {
        landingContainerEl.setAttribute("class", "container d-none");
        quizContainerEl.setAttribute("class", "container d-none");
        finalContainerEl.setAttribute("class", "container d-none");
        highScoreContainerEl.setAttribute("class", "container");
        let colEl = document.getElementById("highScoreTable");
        for (i = 0; i < highScores.length; i++) {
            let rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row mb-1");
            colEl.append(rowEl);

            let colEl2 = document.createElement("div");
            colEl2.setAttribute("class", "col-12 text-center");
            rowEl.append(colEl2);

            let parEl = document.createElement("div");
            parEl.innerHTML = "Initials: " + highScores[i].initials + "  Score: " + highScores[i].highScore;
            colEl2.append(parEl);
        }
    });
}

initQuiz();