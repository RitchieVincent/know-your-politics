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






    var text = {
        "questions": [
            {
                "question": "Labour Government will reset the energy market and freeze your energy bills until January 2017. Do you think this is a good idea?",
                "party": "labourChoice"
            },
            {
                "question": "5,000 more GPs to be trained. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "A real terms increase in NHS funding of £1 billion in 2016/17 and 2017/18",
                "party": "libdemChoice"
            },
            {
                "question": "UKIP will increase personal allowance to the level of full-time minimum wage earnings (approximately £13,500 by next election). Is this a good idea?",
                "party": "ukipChoice"
            }
        ]
    };

    var questionsLength = Object.keys(text.questions).length;

    var x = Math.floor((Math.random() * questionsLength) + 0); //Randomise questions
    document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[x].question + " " + text.questions[x].party + " " + choiceClass + "</h3>";

    $(".agreeBtn").click(function (e) {
        if (text.questions[x].party == choiceClass) {
            alert("success");
        } else {
            alert("fail");
        }
    });
    $(".disagreeBtn").click(function (e) {
        if (text.questions[x].party != choiceClass) {
            alert("success");
        } else {
            alert("fail");
        }
    });







});
