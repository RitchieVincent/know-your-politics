$.fx.speeds.slow = 800; //Sets speeds of transitions
$.fx.speeds.xslow = 1200;

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
    $("#questionSection").slideDown("slow");
    $("#questionSection").addClass("" + choiceClassQuestionSection + "");
};

var clicked = "1";

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

    var questionCount = 0; //This variable stores how many questions the system has asked

    var questionsLength = Object.keys(text.questions).length;

    var randomChoice = Math.floor((Math.random() * questionsLength) + 0); //Generates a random number based on the length of the questions

    document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[randomChoice].question + "</h3>";
    questionCount++; //Raises the question count since it has displayed the first question

    var questionParty = text.questions[randomChoice].party;

    //    $(".loadingBar").addClass("loadingBarAnimate");
    //    $(".loadingBar").one($.support.transition.end,
    //        function () {
    //            $(".loadingBar").removeClass("loadingBarAnimate");
    //            alert("Time's up!");
    //            $(".loadingBar").addClass("loadingBarAnimate");
    //        });

    function randomQuestion(randomChoice) { //Runs a function that randomises the JSON objects to display a random question
        randomChoice = Math.floor((Math.random() * questionsLength) + 0); //Randomises a number based on the length of the JSON array and stores it in variable randomChoice
        document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[randomChoice].question + "</h3>";
        questionParty = text.questions[randomChoice].party; //Sets the party name of the selected question to this variable
        questionCount++; //Raises the question count by 1
    }

    var userScore = 0; //Sets the users score to 0, since it's the start of the quiz!

    $('.correctParty').fadeTo(0, 0);

    $(".choiceBtn").click(function (e) { //Runs this function when the agreeChoice or disagreeChoice button is clicked
        var id = this.id; //Sets a variable called id to the id of the clicked button (agreeChoice or disagreeChoice)
        checkQuestion(id, questionParty, choiceClass); //Calls the checkQuestion function and passes the variables as parameters
        if (questionCount < 10) { //Only displays a new question if the question count is below 10
            var wait = setTimeout(function () {
                $("#questionSection").removeClass(removedClasses);
                randomQuestion(randomChoice); //Runs the randomQuestion function, passing the randomised number to it, to create a new random number
                $(".correctParty").html(""); //Removes the content of the answer message
                $('.correctParty').fadeTo(200, 0); //Hides the white answer bar
            }, 4000);

            wait();

        } else {
            $('.choiceBtn').prop('disabled', true); //Disables the agree/disagree selection buttons so no user can re-click to answer another question
            wrongChoiceColour(questionParty, choiceClass);
        }
    });

    var removedClasses = "labourChoice conservativeChoice libdemChoice ukipChoice"; //Sets the classes to remove (All other parties)

    function wrongChoiceColour(questionParty, choiceClass) { //This function checks which party you have chosen and will remove any previous classes relating to other parties. It then replaces it with the new party class, which styles the background of the section, alerting the user to the party that question actually relates to

        if (questionParty == "labourChoice") {
            $("#questionSection").removeClass(removedClasses); //Removes old classes using the "removedClasses" variable defined above
            $("#questionSection").addClass("labourChoice"); //Adds the party class which relates to the question they have just answered
            $('.correctParty').fadeTo(500, 1); //Fades the answer to the question to "1" opacity
            $(".correctParty").html("<p>Actually, this is a Labour policy!</p>"); //Adds some text to tell the user the answer to the question
        }
        if (questionParty == "conservativeChoice") {
            $("#questionSection").removeClass(removedClasses);
            $("#questionSection").addClass("conservativeChoice");
            $('.correctParty').fadeTo(500, 1);
            $(".correctParty").html("<p>Actually, this is a Conservative policy!</p>");
        }
        if (questionParty == "libdemChoice") {
            $("#questionSection").removeClass(removedClasses);
            $("#questionSection").addClass("libdemChoice");
            $('.correctParty').fadeTo(500, 1);
            $(".correctParty").html("<p>Actually, this is a Liberal Democrat policy!</p>");
        }
        if (questionParty == "ukipChoice") {
            $("#questionSection").removeClass(removedClasses);
            $("#questionSection").addClass("ukipChoice");
            $('.correctParty').fadeTo(500, 1);
            $(".correctParty").html("<p>Actually, this is a UKIP policy!</p>");
        }
    }

    function correctAnswer() { //Shows a "Correct!" message when the user gets the answer correct
        $('.correctParty').fadeTo(500, 1);
        $(".correctParty").html("<p>Correct!</p>");
    }


    function checkQuestion(id, questionParty, choiceClass) {
        var str = questionParty; //Sets the variable to match the question's corresponding party
        var alertParty = str.replace("Choice", ""); //Sets the alertParty variable to remove the "Choice" from the "partynameChoice" string
        String.prototype.capitalise = function () { //This function capitalises the first letter, since once it's removed from the "partynameChoice" string, it is lowercase
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
        alertParty = alertParty.capitalise(); //Runs the capitalise function
        if (id == "agreeChoice") { //If the user has clicked the "Agree" button
            if (questionParty == choiceClass) { //If the question's party matches the user's chosen party
                userScore++; //Raises the user's score since they got the question correct
                correctAnswer(); //Runs the correctAnswer function to display the "Correct!" message
            } else {
                wrongChoiceColour(questionParty, choiceClass); //Calls the function above that checks the party against the question and changes the background style accordingly
                userScore--; //Lowers the user's score since they got the question incorrect
            }
        }
        if (id == "disagreeChoice") { //If the user has clicked the "Disagree" button
            if (questionParty == choiceClass) { //If the question's party does not the user's chosen party
                wrongChoiceColour(questionParty, choiceClass);
                userScore--;
            } else {
                correctAnswer();
            }
        }
    }



});
