$(".headerDownArrow").click(function () {
    $('html,body').animate({
            scrollTop: $(".wellLabour").offset().top - 100
        },
        'slow');
});

$(".partyBtn").click(function (e) {
    var idClicked = e.target.id;
    alert(idClicked);
});
