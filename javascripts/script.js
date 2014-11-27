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

    var questionCount = 0;//This variable stores how many questions the system has asked

    var questionsLength = Object.keys(text.questions).length;

    var randomChoice = Math.floor((Math.random() * questionsLength) + 0); //Randomise questions
    document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[randomChoice].question + " " + text.questions[randomChoice].party + " " + choiceClass + "</h3>";
    questionCount++;//Raises the question count since it has displayed the first question

    var questionParty = text.questions[randomChoice].party;

    function randomQuestion(randomChoice) { //Runs a function that randomises the JSON objects to display a random question
        randomChoice = Math.floor((Math.random() * questionsLength) + 0); //Randomises a number based on the length of the JSON array and stores it in variable randomChoice
        document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[randomChoice].question + " " + text.questions[randomChoice].party + " " + choiceClass + "</h3>";
        questionParty = text.questions[randomChoice].party; //Sets the party name of the selected question to this variable
        questionCount++; //Raises the question count by 1
    }

    var userScore = 0;//Sets the users score to 0, since it's the start of the quiz!

    var timeoutQuestion;
    function delayedAlert() {
      timeoutQuestion = window.setTimeout(showAlert, 2000);
    }

    function showAlert() {
      alert("Time's up!");
      randomQuestion(randomChoice);//Runs the random choice function, passing the randomised number to it, to create a new random number
    }



    $(".choiceBtn").click(function (e) {//Runs this function when the agreeChoice or disagreeChoice button is clicked
        var id = this.id;//Sets a variable called id to the id of the clicked button (agreeChoice or disagreeChoice)
        checkQuestion(id, questionParty, choiceClass);//Calls the checkQuestion function and passes the variables as parameters
        if(questionCount<10){ //Only displays a new question if the question count is below 10
            delayedAlert();

            
        }else{
            alert("finished");
        }
        
    });

    function wrongChoiceColour(questionParty, choiceClass){ //This function checks which party you have chosen and will remove any previous classes relating to other parties. It then replaces it with the new party class, which styles the background of the section, alerting the user to the party that question actually relates to
        var removedClasses = "labourChoice conservativeChoice libdemChoice ukipChoice"; //Sets the classes to remove (All other parties)
        if(questionParty=="labourChoice"){
            $("#questionSection").removeClass(removedClasses);//Removes old classes using the "removedClasses" variable defined above
            $("#questionSection").addClass("labourChoice");//Adds the party class which relates to the question they have just answered
        }
        if(questionParty=="conservativeChoice"){
            $("#questionSection").removeClass(removedClasses);
            $("#questionSection").addClass("conservativeChoice");
        }
        if(questionParty=="libdemChoice"){
            $("#questionSection").removeClass(removedClasses);
            $("#questionSection").addClass("libdemChoice");
        }
        if(questionParty=="ukipChoice"){
            $("#questionSection").removeClass(removedClasses);
            $("#questionSection").addClass("ukipChoice");
        }
    }

    function checkQuestion(id, questionParty, choiceClass) {
        if (id == "agreeChoice") { //If the user has clicked the "Agree" button
            if (questionParty == choiceClass) {//If the question's party matches the user's chosen party
                userScore++; //Raises the user's score since they got the question correct
                alert(userScore);
            } else {
                wrongChoiceColour(questionParty, choiceClass);//Calls the function above that checks the party against the question and changes the background style accordingly
                userScore--;//Lowers the user's score since they got the question incorrect
                alert(userScore);
            }
        }
        if (id == "disagreeChoice") { //If the user has clicked the "Disagree" button
            if (questionParty == choiceClass) {//If the question's party does not the user's chosen party
                userScore--;
                wrongChoiceColour(questionParty, choiceClass);
                alert(userScore);
            } else {
                alert(userScore);
            }
        }
    }









});
