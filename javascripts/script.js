$.fx.speeds.slow = 800;
$.fx.speeds.xslow = 1200;

$(".headerDownArrow").click(function () {
    $('html,body').animate({
            scrollTop: $(".wellLabour").offset().top - 100
        },
        'slow');
});



var clicked = "1";

$(".partyBtn").click(function (e) {
    $("#selectedSection").slideDown("slow");
    $('html,body').animate({
            scrollTop: $("#selectedSection").offset().top
        },
        'xslow');
    var idClicked = e.target.id;
    var choiceClass = "";
    if ((idClicked == "labourVote") && (clicked == "1")) {
        idClicked = "The Labour Party";
        choiceClass = "labourChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
        $("#questionSection").slideDown("slow");
    } else if ((idClicked == "conservativeVote") && (clicked == "1")) {
        idClicked = "The Conservative Party";
        choiceClass = "conservativeChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
        $("#questionSection").slideDown("slow");
    } else if ((idClicked == "libdemVote") && (clicked == "1")) {
        idClicked = "The Liberal Democrats";
        choiceClass = "libdemChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
        $("#questionSection").slideDown("slow");
    } else if ((idClicked == "ukipVote") && (clicked == "1")) {
        idClicked = "The United Kingdom Independence Party";
        choiceClass = "ukipChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
        $("#questionSection").slideDown("slow");
    } else if ((idClicked == "noVote") && (clicked == "1")) {
        idClicked = "No preference";
        choiceClass = "noChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
        $("#questionSection").slideDown("slow");
    }









    var text = '{ "data" : [' +
        '{ "question":"Labour Government will reset the energy market and freeze your energy bills until January 2017. Do you think this is a good idea?" , "party":"labourChoice" },' +
        '{ "question":"5,000 more GPs to be trained. Do you think this is a good idea?" , "party":"conservativeChoice" },' +
        '{ "question":"A real terms increase in NHS funding of £1 billion in 2016/17 and 2017/18" , "party":"libdemChoice" },' +
        '{ "question":"UKIP will increase personal allowance to the level of full-time minimum wage earnings (approximately £13,500 by next election). Is this a good idea?" , "party":"ukipChoice" } ]}';

    var questions = JSON.parse(text);

    var x = Math.floor((Math.random() * 3) + 0);
    //Question party   questions.data[x].party
    //Choice party    choiceClass
    document.getElementById("test").innerHTML = questions.data[x].question + " " + questions.data[x].party + " " + choiceClass;

    $(".agreeBtn").click(function (e) {
        if (questions.data[x].party == choiceClass) {
            alert("success");
        }
    });
    $(".disagreeBtn").click(function (e) {
        if (questions.data[x].party != choiceClass) {
            alert("success");
        }
    });







});
