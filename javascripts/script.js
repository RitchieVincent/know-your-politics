$(function () { //Wait for the document to be ready

    //---------------------------Variables---------------------------------------
    $.fx.speeds.slow = 800; //Sets speeds of transitions
    $.fx.speeds.xslow = 1200;
    var clicked = "1";
    var questionCount = 0; //stores how many questions the system has asked
    var questionsLength = Object.keys(text.questions).length; //stores the length of the questions array
    var randomChoice; //stores the random number
    var choiceClass = ""; //stores the user's chosen party class
    var questionParty; //stores the chosen question's corresponding party
    var labourCount = 0; //The partyCount variables store how many of that party's questions have been asked
    var labourCountChosen = 0; //The partyCountChosen variables store how many times the user clicks agree on the wrong party, and that party's name
    var conservativeCount = 0;
    var conservativeCountChosen = 0;
    var libdemCount = 0;
    var libdemCountChosen = 0;
    var ukipCount = 0;
    var ukipCountChosen = 0;
    var correctCount = 0;
    var finalPercent = 0;
    var userScore = 0; //Sets the users score to 0, since it's the start of the quiz!
    var removedClasses = "labourChoice conservativeChoice libdemChoice ukipChoice"; //Sets the classes to remove (All other parties)
    var audioCorrect = document.getElementById("correctAudio"); //Sets the variable to the appropriate audio file
    var audioIncorrect = document.getElementById("incorrectAudio");
    var audioTimeUp = document.getElementById("timeUpAudio");
    var audioResult = document.getElementById("resultAudio");
    var randomArrayCount = 0; //Stores a number that the function is on when looping through the random question array
    var y = []; //Sets the random question array to blank, which will later be filled with a randomly sorted array of numbers
    //---------------------------------------------------------------------------




    $(".downButton").click(function () { //Scrolls the page down when clicking the down arrow in the header or the button in the modal
        $('html,body').animate({
            scrollTop: $(".wellLabour").offset().top - 50
        },
        'slow');
    });

    setTimeout(function () {
        $('#instructionsModal').modal({
            backdrop: "static",
            keyboard: false
        })
    }, 2000);



    var showChoiceFctn = function (idClicked, choiceClass, imageShow, choiceClassQuestionSection) { //Shows the correct question section based on which button the user clicks
        $("#selectedSection").addClass("" + choiceClass + "");
        $(".selectedPartyTitle").append("<h1>" + idClicked + "</h1>");
        $("#" + imageShow + "").fadeIn("slow");
        clicked = "2"; //Ensures the user cannot run the partyBtn Click function again
        $('.partyBtn').prop('disabled', true); //Disables the party selection buttons so no user can re-click another party
        $("#questionSection").slideToggle("slow");
        $("#questionSection").addClass("" + choiceClassQuestionSection + "");
    };

    $(".partyBtn").click(function (e) {
        var idClicked = e.target.id;
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
                $("#questionSection").slideUp(3000, function () {
                    resultDisplay();
                });
            }
        }


        function timer() {
            $(".loadingBar").addClass("loadingBarAnimate");
            $(".loadingBar").one($.support.transition.end,
                function () {
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    $('.choiceBtn').prop('disabled', true);
                    wrongChoiceColour("timeUp", "");
                    newQuestion();
                });
        }

        timer(); //Runs the timer function to start the timer
        scramble = function(x) { //Takes the array of numbers (x) and randomises them, storing them in a new array (y). This is used to stop the same question appearing twice.
            while(x.length > 0) y.push(x.splice(Math.floor(Math.random() * x.length), 1)[0]);
            return y;
        }
        scramble([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]);//Runs the above function with the values as (x). It goes up to 39 because there are 40 questions in total
        randomQuestion(); //Runs the random question function to display the first question

        function randomQuestion() { //Runs a function that randomises the JSON objects to display a random question
            randomChoice = y[randomArrayCount];//Stores the random question as the first object in the new randomly sorted array
            randomArrayCount++;//Raises the counter by 1, so the next question will be the next object in the array
            document.getElementById("theQuestions").innerHTML = "<h3>" + text.questions[randomChoice].question + "</h3><p>Do you agree with this policy?</p>";
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

        function drawChart(labourCountChosen, ukipCountChosen, libdemCountChosen, conservativeCountChosen) { //Draws the results chart
            var data = google.visualization.arrayToDataTable([
                ['Party', 'Amount agreed with'], //Sets the options to partyName, partyCountChosen
                ['Labour', labourCountChosen],
                ['UKIP', ukipCountChosen],
                ['Liberal democrat', libdemCountChosen],
                ['Conservative', conservativeCountChosen],
            ]);
            var options = {
                pieHole: 0.5,
                pieSliceTextStyle: {
                    color: 'black',
                },
                colors: ['#e74c3c', '#9b59b6', '#F7E041', '#3498db'],
                backgroundColor: '#009688',
                pieSliceBorderColor: '#009688',
                legend: 'none',
                chartArea: {
                    top: 0,
                    height: 300
                },
                height: 300
            };

            var chart = new google.visualization.PieChart(document.getElementById('resultsChart'));
            chart.draw(data, options);
        }

        function displayScores(finalPercent, userScore) {
            $(".scoreNumber").html("<p>You got " + finalPercent + "% of the " + idClicked + " questions correct.</p>"); //Displays the percent correct to the user
            drawChart(labourCountChosen, ukipCountChosen, libdemCountChosen, conservativeCountChosen); //Runs the draw chart function

            if(labourCountChosen >= conservativeCountChosen && labourCountChosen >= libdemCountChosen && labourCountChosen >= ukipCountChosen){
                if(choiceClass == "labourChoice"){
                    $(".resultsLinks").append("<p>You seem to know a lot about your party. Well done!</p>");
                } else{
                    $(".resultsLinks").append("<p>You seemed to agree with The Labour party quite a lot. <a href='http://www.labour.org.uk/issues' target='_blank'>Click here to read more about this party.</a></p>");
                }
            }
            if(conservativeCountChosen >= labourCountChosen && conservativeCountChosen >= libdemCountChosen && conservativeCountChosen >= ukipCountChosen){
                if(choiceClass == "conservativeChoice"){
                    $(".resultsLinks").append("<p>You seem to know a lot about your party. Well done!</p>");
                } else{
                    $(".resultsLinks").append("<p>You seemed to agree with The Conservative party quite a lot. <a href='https://www.conservatives.com/Plan.aspx' target='_blank'>Click here to read more about this party.</a></p>");
                }
            }
            if(libdemCountChosen >= conservativeCountChosen && libdemCountChosen >= labourCountChosen && libdemCountChosen >= ukipCountChosen){
                if(choiceClass == "libdemChoice"){
                    $(".resultsLinks").append("<p>You seem to know a lot about your party. Well done!</p>");
                } else{
                    $(".resultsLinks").append("<p>You seemed to agree with The Liberal Democrats party quite a lot. <a href='http://www.libdems.org.uk/issues' target='_blank'>Click here to read more about this party.</a></p>");
                }
            }
            if(ukipCountChosen >= conservativeCountChosen && ukipCountChosen >= libdemCountChosen && ukipCountChosen >= labourCountChosen){
                if(choiceClass == "ukipChoice"){
                    $(".resultsLinks").append("<p>You seem to know a lot about your party. Well done!</p>");
                } else{
                    $(".resultsLinks").append("<p>You seemed to agree with UKIP quite a lot. <a href='http://www.ukip.org/policies_for_people' target='_blank'>Click here to read more about this party.</a></p>");
                }
            }

            $(".moreResults").append("<p>Your overall score is: " + userScore + "</p><hr/>");
            if(userScore < 0){
                $(".moreResults").append("<p>Your overall score is negative. What this means is that you tended to either agree with parties that were not the one you support, or you disagreed with your the policies of the party you support. Maybe you don't Know Your Politics as well as you thought!</p><hr/>");
            }if(userScore == 0){
                $(".moreResults").append("<p>Your overall score is neutral. What this means is that you tended to agree with some and disagree with other policies relating to your party. You Know Your Politics a bit, but not much!</p><hr/>");
            }if(userScore >= 1){
                $(".moreResults").append("<p>Your overall score is positive. What this means is that you tended to agree with your chosen party. You seem to Know Your Politics!</p><hr/>");
            }
            $(".moreResults").append("<p><img src='img/labourIcon.png' class='resultIcon'/> You got " + labourCountChosen + "/" + labourCount + " Labour party questions correct.</p>");
            $(".moreResults").append("<p><img src='img/conservativeIcon.png' class='resultIcon'/> You got " + conservativeCountChosen + "/" + conservativeCount + " Conservative party questions correct.</p>");
            $(".moreResults").append("<p><img src='img/libdemIcon.png' class='resultIcon'/> You got " + libdemCountChosen + "/" + libdemCount + " Liberal Democrat party questions correct.</p>");
            $(".moreResults").append("<p><img src='img/ukipIcon.png' class='resultIcon'/> You got " + ukipCountChosen + "/" + ukipCount + " UKIP questions correct.</p>");
            $( ".moreResultsBtn" ).click(function() {
                $( ".moreResultsSection" ).slideToggle( "slow", function() {
                    window.scrollTo(0, document.body.scrollHeight);
                });
            });
        }

        function resultDisplay() {
            audioResult.play();
            $("#resultSection").slideDown("xslow", function () { //This function animates the resultSection down, and then scrolls the view to the top of the resultSection
                $('html,body').animate({
                    scrollTop: $("#resultSection").offset().top
                },
                'slow');
            });
            if (choiceClass == "labourChoice") {
                finalPercent = (correctCount / labourCount) * 100; //Takes the amount correctly answered and the amount asked and calculates the percent correctly answered
                finalPercent = finalPercent.toFixed(); //This converts the number to 0 decimal places
                zeroCheck(labourCount); //Runs the zeroCheck function
                displayScores(finalPercent, userScore); //runs the displayScores function
            }
            if (choiceClass == "conservativeChoice") {
                finalPercent = (correctCount / conservativeCount) * 100;
                finalPercent = finalPercent.toFixed();
                zeroCheck(conservativeCount);
                displayScores(finalPercent, userScore);
            }
            if (choiceClass == "libdemChoice") {
                finalPercent = (correctCount / libdemCount) * 100;
                finalPercent = finalPercent.toFixed();
                zeroCheck(libdemCount);
                displayScores(finalPercent, userScore);
            }
            if (choiceClass == "ukipChoice") {
                finalPercent = (correctCount / ukipCount) * 100;
                finalPercent = finalPercent.toFixed();
                zeroCheck(ukipCount);
                displayScores(finalPercent, userScore);
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

        function totalCount(questionParty) { //This function stores the total number of questions asked and answered with the choice agree. Will be used for charts in the results section
            if (questionParty == "labourChoice") {
                labourCountChosen++;
            }
            if (questionParty == "conservativeChoice") {
                conservativeCountChosen++;
            }
            if (questionParty == "libdemChoice") {
                libdemCountChosen++;
            }
            if (questionParty == "ukipChoice") {
                ukipCountChosen++;
            }
        }


        function checkQuestion(id, questionParty, choiceClass) {
            if (id == "agreeChoice") { //If the user has clicked the "Agree" button
                if (questionParty == choiceClass) { //If the question's party matches the user's chosen party
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    userScore++; //Raises the user's score since they got the question correct
                    correctCount++; //Raises the user's corrected answers score
                    totalCount(questionParty); //Runs the totalCount function
                    correctAnswer(); //Runs the correctAnswer function to display the "Correct!" message
                } else {
                    $(".loadingBar").removeClass("loadingBarAnimate");
                    wrongChoiceColour(questionParty, choiceClass); //Calls the function above that checks the party against the question and changes the background style accordingly
                    totalCount(questionParty);
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


    $('#logo').addClass('animated rubberBand');
    $('.headerTitle').addClass('animated bounceInUp');
    $('.headerTitle2').addClass('animated bounceInLeft');
    $('.headerTitle3').addClass('animated bounceInRight');
    $('.headerDownBtn').addClass('animated flip');
    $('#aboutLink').addClass('animated fadeInRight');
    $('#contactLink').addClass('animated fadeInLeft');
    $('#aboutLink').removeClass('invisible');
    $('#contactLink').removeClass('invisible');

    //Opentip tooltips---------------------------------------------------------------------

    Opentip.styles.labourStyle = {
        className: "labourTooltip",
        delay: 0,
        tipJoint: "bottom",
        extends: "glass",
        stemLength: 0
    };
    Opentip.styles.conservativeStyle = {
        className: "conservativeTooltip",
        delay: 0,
        tipJoint: "bottom",
        extends: "glass",
        stemLength: 0
    };
    Opentip.styles.libdemStyle = {
        className: "libdemTooltip",
        delay: 0,
        tipJoint: "bottom",
        extends: "glass",
        stemLength: 0
    };
    Opentip.styles.ukipStyle = {
        className: "ukipTooltip",
        delay: 0,
        tipJoint: "bottom",
        extends: "glass",
        stemLength: 0
    };


    new Opentip(".law", "The Labour Party Website", {
        style: "labourStyle"
    })
    new Opentip(".laf", "The Labour Party Facebook page", {
        style: "labourStyle"
    })
    new Opentip(".lat", "The Labour Party Twitter page", {
        style: "labourStyle"
    })
    new Opentip(".cow", "The Conservative Party Website", {
        style: "conservativeStyle"
    })
    new Opentip(".cof", "The Conservative Party Facebook page", {
        style: "conservativeStyle"
    })
    new Opentip(".cot", "The Conservative Party Twitter page", {
        style: "conservativeStyle"
    })
    new Opentip(".liw", "The Liberal Democrat Party Website", {
        style: "libdemStyle"
    })
    new Opentip(".lif", "The Liberal Democrat Party Facebook page", {
        style: "libdemStyle"
    })
    new Opentip(".lit", "The Liberal Democrat Party Twitter page", {
        style: "libdemStyle"
    })
    new Opentip(".ukw", "The UKIP Website", {
        style: "ukipStyle"
    })
    new Opentip(".ukf", "The UKIP Facebook page", {
        style: "ukipStyle"
    })
    new Opentip(".ukt", "The UKIP Twitter page", {
        style: "ukipStyle"
    })
    //    new Opentip("#theQuestions", "You only have 10 seconds!", {
    //        target: ".loadingBarHolder",
    //        targetJoint: "top right",
    //        tipJoint: "top left",
    //        extends: "dark",
    //        stemLength: 0,
    //        delay: 0,
    //        className: "timerTooltip",
    //        hideDelay: 2
    //    })

    //-------------------------------------------------------------------------------------


}); //End document ready
