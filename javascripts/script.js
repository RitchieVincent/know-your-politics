$(function () { //Wait for the document to be ready

    //---------------------------Variables-----------------------------
    $.fx.speeds.slow = 800; //Sets speeds of transitions
    $.fx.speeds.xslow = 1200;
    var clicked = "1";
    var questionCount = 0; //This variable stores how many questions the system has asked
    var questionsLength = Object.keys(text.questions).length; //This variable stores the length of the questions array
    var randomChoice; //This variable stores the random number
    var questionParty; //This variable stores the chosen question's corresponding party
    var labourCount = 0;
    var conservativeCount = 0;
    var libdemCount = 0;
    var ukipCount = 0;
    var correctCount = 0;
    var finalPercent = 0;
    var userScore = 0; //Sets the users score to 0, since it's the start of the quiz!
    var removedClasses = "labourChoice conservativeChoice libdemChoice ukipChoice"; //Sets the classes to remove (All other parties)
    var audioCorrect = document.getElementById("correctAudio"); //Sets the variable to the appropriate audio file
    var audioIncorrect = document.getElementById("incorrectAudio");
    var audioTimeUp = document.getElementById("timeUpAudio");
    var audioResult = document.getElementById("resultAudio");
    //---------------------------------------------------------------------------



    $(".headerDownBtn").click(function () { //Scrolls the page down when clicking the down arrow in the header
        $('html,body').animate({
                scrollTop: $(".wellLabour").offset().top - 50
            },
            'slow');
    });

    var showChoiceFctn = function (idClicked, choiceClass, imageShow, choiceClassQuestionSection) { //Shows the correct question section based on which button the user clicks
        $("#selectedSection").addClass("" + choiceClass + "");
        $(".selectedPartyTitle").append("<h1>" + idClicked + "</h1>");
        $("#" + imageShow + "").fadeIn("slow");
        clicked = "2";
        $('.partyBtn').prop('disabled', true); //Disables the party selection buttons so no user can re-click another party
        $("#questionSection").slideToggle("slow");
        $("#questionSection").addClass("" + choiceClassQuestionSection + "");
    };

    $(".partyBtn").click(function (e) {
        var idClicked = e.target.id;
        var choiceClass = "";
        if ((idClicked == "labourVote") && (clicked == "1")) {
            idClicked = "The Labour Party";
            choiceClass = "labourChoice";
            imageShow = "labourSelectedImage";
            choiceClassQuestionSection = "labourQuestionSection";
            showChoiceFctn(idClicked, choiceClass, imageShow, choiceClassQuestionSection);
        } else if ((idClicked == "conservativeVote") && (clicked == "1")) {
            idClicked = "The Conservative Party";
            choiceClass = "conservativeChoice";
            imageShow = "conservativeSelectedImage";
            choiceClassQuestionSection = "conservativeQuestionSection";
            showChoiceFctn(idClicked, choiceClass, imageShow, choiceClassQuestionSection);
        } else if ((idClicked == "libdemVote") && (clicked == "1")) {
            idClicked = "The Liberal Democrats";
            choiceClass = "libdemChoice";
            imageShow = "libdemSelectedImage";
            choiceClassQuestionSection = "libdemQuestionSection";
            showChoiceFctn(idClicked, choiceClass, imageShow, choiceClassQuestionSection);
        } else if ((idClicked == "ukipVote") && (clicked == "1")) {
            idClicked = "The United Kingdom Independence Party";
            choiceClass = "ukipChoice";
            imageShow = "ukipSelectedImage";
            choiceClassQuestionSection = "ukipQuestionSection";
            showChoiceFctn(idClicked, choiceClass, imageShow, choiceClassQuestionSection);
        } else if ((idClicked == "noVote") && (clicked == "1")) {
            idClicked = "No preference";
            choiceClass = "noChoice";
            imageShow = "novoteSelectedImage";
            choiceClassQuestionSection = "novoteQuestionSection";
            showChoiceFctn(idClicked, choiceClass, imageShow, choiceClassQuestionSection);
        }

        $("#selectedSection").slideDown("slow");

        $('html,body').animate({
                scrollTop: $("#selectedSection").offset().top
            },
            'xslow');


        function newQuestion() {
            if (questionCount < 10) { //Only displays a new question if the question count is below 10
                var wait = setTimeout(function () {
                    $("#questionSection").removeClass(removedClasses);
                    randomQuestion(); //Runs the randomQuestion function, passing the randomised number to it, to create a new random number
                    timer();
                    $(".correctParty").html(""); //Removes the content of the answer message
                    $('.correctParty').fadeTo(200, 0); //Hides the white "Correct" or "Actually this is..." loadingBarAnimate
                }, 4000); //Waits 4 seconds before running this function

                wait(); //Runs the wait function above

            } else {
                $('.choiceBtn').prop('disabled', true); //Disables the agree/disagree selection buttons so no user can re-click to answer another question
                $("#questionSection").slideToggle(3000, function () {
                    resultDisplay();
                });
            }
        }


        function timer() {
            $(".loadingBar").addClass("loadingBarAnimate");
            $(".loadingBar").one($.support.transition.end,
                function () {
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    wrongChoiceColour("timeUp", "");
                    newQuestion();
                });
        }

        timer(); //Runs the timer function to start the timer
        randomQuestion(); //Runs the random question function to display the first question

        function randomQuestion() { //Runs a function that randomises the JSON objects to display a random question
            randomChoice = Math.floor((Math.random() * questionsLength) + 0); //Randomises a number based on the length of the JSON array and stores it in variable randomChoice
            document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[randomChoice].question + "</h3>";
            questionParty = text.questions[randomChoice].party; //Sets the party name of the selected question to this variable
            questionCount++; //Raises the question count by 1
            if (text.questions[randomChoice].party == "labourChoice") {
                labourCount++;
            }
            if (text.questions[randomChoice].party == "conservativeChoice") {
                conservativeCount++;
            }
            if (text.questions[randomChoice].party == "libdemChoice") {
                libdemCount++;
            }
            if (text.questions[randomChoice].party == "ukipChoice") {
                ukipCount++;
            }
            $('.choiceBtn').prop('disabled', false); //Re-enables the choice button once the new question is displayed
        }



        function zeroCheck(partyName) { //This function checks if the finalPercent value is not a NaN% (Not a Number) error
            if (isNaN(finalPercent)) { //Checks if it's not a number (Which it will be if there have been no questions of the chosen party asked)
                finalPercent = 0; //Sets the finalPercent to 0 to prevent errors
            }
        }

        function resultDisplay() {
            audioResult.play();
            $("#resultSection").slideDown("xslow", function () {
                window.scrollTo(0, document.body.scrollHeight); //This scrolls the view to the bottom of the page, to show the results to the user easier
            });
            if (choiceClass == "labourChoice") {
                finalPercent = (correctCount / labourCount) * 100; //Takes the amount correctly answered and the amount asked and calculates the percent correctly answered
                finalPercent = finalPercent.toFixed(); //This converts the number to 0 decimal places
                zeroCheck(labourCount); //Runs the zeroCheck function
                $(".scoreNumber").html("<p>You got " + finalPercent + "% of the Labour questions correct.</p>"); //Displays the percent correct to the user
                $(".scoreNumber").append("<p>Your overall score is: " + userScore + "</p>");
            }
            if (choiceClass == "conservativeChoice") {
                finalPercent = (correctCount / conservativeCount) * 100;
                finalPercent = finalPercent.toFixed();
                zeroCheck(conservativeCount);
                $(".scoreNumber").html("<p>You got " + finalPercent + "% of the Conservative questions correct.</p>");
                $(".scoreNumber").append("<p>Your overall score is: " + userScore + "</p>");
            }
            if (choiceClass == "libdemChoice") {
                finalPercent = (correctCount / libdemCount) * 100;
                finalPercent = finalPercent.toFixed();
                zeroCheck(libdemCount);
                $(".scoreNumber").html("<p>You got " + finalPercent + "% of the Liberal Democrat questions correct.</p>");
                $(".scoreNumber").append("<p>Your overall score is: " + userScore + "</p>");
            }
            if (choiceClass == "ukipChoice") {
                finalPercent = (correctCount / ukipCount) * 100;
                finalPercent = finalPercent.toFixed();
                zeroCheck(ukipCount);
                $(".scoreNumber").html("<p>You got " + finalPercent + "% of the UKIP questions correct.</p>");
                $(".scoreNumber").append("<p>Your overall score is: " + userScore + "</p>");
            }
        }



        $(".choiceBtn").click(function (e) { //Runs this function when the agreeChoice or disagreeChoice button is clicked
            $('.choiceBtn').prop('disabled', true); //Disables the choice button (although temporarily) until the next question is displayed
            var id = this.id; //Sets a variable called id to the id of the clicked button (agreeChoice or disagreeChoice)
            checkQuestion(id, questionParty, choiceClass); //Calls the checkQuestion function and passes the variables as parameters
            newQuestion();
        });



        function wrongChoiceColour(questionParty, choiceClass) { //This function checks which party you have chosen and will remove any previous classes relating to other parties. It then replaces it with the new party class, which styles the background of the section, alerting the user to the party that question actually relates to
            if (questionParty == "labourChoice") {
                $("#questionSection").removeClass(removedClasses); //Removes old classes using the "removedClasses" variable defined above
                $("#questionSection").addClass("labourChoice"); //Adds the party class which relates to the question they have just answered
                $('.correctParty').fadeTo(500, 1); //Fades the answer to the question to "1" opacity over 500 miliseconds
                $(".correctParty").html("<p>Actually, this is a Labour policy!</p>"); //Adds some text to tell the user the answer to the question
                audioIncorrect.play(); //Plays the "incorrectAudio" file
            }
            if (questionParty == "conservativeChoice") {
                $("#questionSection").removeClass(removedClasses);
                $("#questionSection").addClass("conservativeChoice");
                $('.correctParty').fadeTo(500, 1);
                $(".correctParty").html("<p>Actually, this is a Conservative policy!</p>");
                audioIncorrect.play();
            }
            if (questionParty == "libdemChoice") {
                $("#questionSection").removeClass(removedClasses);
                $("#questionSection").addClass("libdemChoice");
                $('.correctParty').fadeTo(500, 1);
                $(".correctParty").html("<p>Actually, this is a Liberal Democrat policy!</p>");
                audioIncorrect.play();
            }
            if (questionParty == "ukipChoice") {
                $("#questionSection").removeClass(removedClasses);
                $("#questionSection").addClass("ukipChoice");
                $('.correctParty').fadeTo(500, 1);
                $(".correctParty").html("<p>Actually, this is a UKIP policy!</p>");
                audioIncorrect.play();
            }
            if (questionParty == "timeUp") {
                $('.correctParty').fadeTo(500, 1);
                $(".correctParty").html("<p>You ran out of time!</p>");
                audioTimeUp.play(); //Plays the "timeUp" audio file
            }
        }

        function correctAnswer() { //Shows a "Correct!" message when the user gets the answer correct
            $('.correctParty').fadeTo(500, 1);
            $(".correctParty").html("<p>Correct!</p>");
            audioCorrect.play();
        }


        function checkQuestion(id, questionParty, choiceClass) {
            //            var str = questionParty; //Sets the variable to match the question's corresponding party
            //            var alertParty = str.replace("Choice", ""); //Sets the alertParty variable to remove the "Choice" from the "partynameChoice" string
            //            String.prototype.capitalise = function () { //This function capitalises the first letter, since once it's removed from the "partynameChoice" string, it is lowercase
            //                return this.charAt(0).toUpperCase() + this.slice(1);
            //            }
            //            alertParty = alertParty.capitalise(); //Runs the capitalise function
            if (id == "agreeChoice") { //If the user has clicked the "Agree" button
                if (questionParty == choiceClass) { //If the question's party matches the user's chosen party
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    userScore++; //Raises the user's score since they got the question correct
                    correctCount++;
                    correctAnswer(); //Runs the correctAnswer function to display the "Correct!" message
                } else {
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    wrongChoiceColour(questionParty, choiceClass); //Calls the function above that checks the party against the question and changes the background style accordingly
                    userScore--; //Lowers the user's score since they got the question incorrect
                }
            }
            if (id == "disagreeChoice") { //If the user has clicked the "Disagree" button
                if (questionParty == choiceClass) { //If the question's party matches the user's chosen party
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    wrongChoiceColour(questionParty, choiceClass);
                    userScore--;
                } else {
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    userScore++;
                    correctAnswer();
                }
            }
        }



    });

}); //End document ready
