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
                "question": "The Government will reset the energy market and freeze your energy bills until January 2017. Do you think this is a good idea?",
                "party": "labourChoice"
            },
            {
                "question": "The party leader promises a £2.5bn fund to transform the NHS. Do you think this is a good idea?",
                "party": "labourChoice"
            },
            {
                "question": "Do you support public sector job cuts?",
                "party": "labourChoice"
            },
            {
                "question": "There will be a guarenteed place in education or training for all 16 and 17 year olds. Do you agree with this?",
                "party": "labourChoice"
            },
            {
                "question": "This party will ensure all people who suspect they have cancer to get tested, getting results within one week. Do you agree with this?",
                "party": "labourChoice"
            },
            {
<<<<<<< HEAD
=======
                "question": "This party wants to ensure every teacher has a teaching qualification. Do you agree with this?",
                "party": "labourChoice"
            },
            {
                "question": "This party wants to cut pension tax relief for higher earners. Do you agree with this?",
                "party": "labourChoice"
            },
            {
>>>>>>> origin/master
                "question": "There will be 5,000 more GPs trained. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "All patients will have access to a GP from 8am to 8pm, seven days a week by 2020. Do you think this is a good idea?",
<<<<<<< HEAD
=======
                "party": "conservativeChoice"
            },
            {
                "question": "This party is cutting income tax and freezing fuel duty. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party is cutting jobs tax. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party is cutting corporation tax. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party will enforce public sector job cuts. Do you think this is a good idea?",
>>>>>>> origin/master
                "party": "conservativeChoice"
            },
            {
                "question": "This party is cutting income tax and freezing fuel duty. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party is cutting jobs tax. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party is cutting corporation tax. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party will introduce a scheme that means it will always pay more to be in work than on benefits. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party has a plan to help small business and enterprises succeed, thus creating more jobs. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party wants to clamp down on \"benefits tourism\" and \"health tourism\" - so that we only those who want to work hard and contribute to our society are welcomed. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party wants to introduce a new citizenship test with British values at its heart. Do you think this is a good idea?",
                "party": "conservativeChoice"
            },
            {
                "question": "This party will increase NHS funding by £1bn in 2016/17 and 2017/18. Do you agree with this?",
                "party": "libdemChoice"
            },
            {
                "question": "This party will allocate an additional £500 million for mental health services. Do you think this is a good idea?",
                "party": "libdemChoice"
            },
            {
                "question": "All patients will be issued with a \"Care footprint\", detailing the costs of their care. Do you think this is a good idea?",
                "party": "libdemChoice"
            },
            {
                "question": "This party wants to raise the threshold at which people start paying income tax from £6,475 to £10,000. Do you think this is a good idea?",
                "party": "libdemChoice"
            },
            {
                "question": "This party will increase personal allowance to the level of full-time minimum wage earnings. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party wants to ensure that the NHS stays free for all UK residents. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party oposes current plans to charge patients for visitin their GP. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party wants to maintain the system of providing pensioner bus passes. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party wants to encourage local councils to provide more free parking for the high street. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party wants to scrap the current target of 50% of school leavers going to university. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party wants to ensure that students from the EU will pay the same student fee rates as International students. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party will guarantee those who have served in the Armed Forces for a minimum of 12 years a job in the police force, prison service or border force. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party supports a diverse energy market including coal, nuclear, shale gas, geo-thermal, tidal, solar, conventional gas and oil. Do you think this is a good idea?",
                "party": "ukipChoice"
            },
            {
                "question": "This party wants to abolish inheritance tax. Is this a good idea?",
                "party": "ukipChoice"
            }
        ]
    };

    var questionsLength = Object.keys(text.questions).length;

    var x = Math.floor((Math.random() * questionsLength) + 0); //Randomise questions
    document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[x].question + " " + text.questions[x].party + " " + choiceClass + "</h3>";

    var questionParty = text.questions[x].party;

    function randomQuestion(x) {
        x = Math.floor((Math.random() * questionsLength) + 0);
        document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[x].question + " " + text.questions[x].party + " " + choiceClass + "</h3>";
        questionParty = text.questions[x].party;
    }

<<<<<<< HEAD
    var userScore = 0;
=======
>>>>>>> origin/master

    $(".choiceBtn").click(function (e) {
        var id = this.id;
        var counter = $('#percentBox').val();
<<<<<<< HEAD
        checkQuestion(id, questionParty, choiceClass);
        randomQuestion(x);
    });

    function checkQuestion(id, questionParty, choiceClass) {
        if (id == "agreeChoice") {
            if (questionParty == choiceClass) {
                userScore++;
                alert(userScore);
            } else {
                userScore--;
                alert(userScore);
=======
        checkQuestion(id, questionParty, choiceClass, counter);
        randomQuestion(x);
    });

    function checkQuestion(id, questionParty, choiceClass, counter) {
        if (id == "agreeChoice") {
            if (questionParty == choiceClass) {
                counter++;
                $('#percentBox').val(counter);
            } else {
                counter--;
                $('#percentBox').val(counter);
>>>>>>> origin/master
            }
        }
        if (id == "disagreeChoice") {
            if (questionParty == choiceClass) {
<<<<<<< HEAD
                userScore--;
                alert(userScore);
            } else {
                alert(userScore);
=======
                counter--;
                $('#percentBox').val(counter);
            } else {
                $('#percentBox').val(counter);
>>>>>>> origin/master
            }
        }
    }









});
