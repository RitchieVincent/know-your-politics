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
    } else if ((idClicked == "conservativeVote") && (clicked == "1")) {
        idClicked = "The Conservative Party";
        choiceClass = "conservativeChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
    } else if ((idClicked == "libdemVote") && (clicked == "1")) {
        idClicked = "The Liberal Democrats";
        choiceClass = "libdemChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
    } else if ((idClicked == "ukipVote") && (clicked == "1")) {
        idClicked = "The United Kingdom Independence Party";
        choiceClass = "ukipChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
    } else if ((idClicked == "noVote") && (clicked == "1")) {
        idClicked = "No preference";
        choiceClass = "noChoice";
        $(".voteChoice").append("<h4 class=" + choiceClass + ">" + idClicked + "</h4>");
        clicked = "2";
    }
});
