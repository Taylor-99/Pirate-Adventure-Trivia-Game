
// class to create pirates
class Pirates {
    constructor(name, crew, position){
        this.name = name;
        this.crew = crew
        this.position = position;
        this.health = 100;
    }
}

// class to create the player as the captain
class Captain extends Pirates{
    constructor(name, crew, position){
        super(name, crew, position)
        this.doubloons = 0;
        this.crewMembers = [];
        this.weapon = [["Fist", 5]];
    }

    //gives the player a random number of doubloons as rewards during the game so that they have enough to use the help after the first level. Takes in the input of the current level the player is on
    getDoubloons(useLevel){

        //for each level a random number is generated within different ranges and then rounded up to a while number to return 
        if(useLevel === 1){
            return Math.round(Math.random() * (2000 - 500) + 500);
        }
        else if(useLevel === 2){
            return Math.round(Math.random() * (3000 - 1500) + 1500);
        }
        else if(useLevel === 3){
            return Math.round(Math.random() * (4000 - 2500) + 2500);
        }
        else if(useLevel === 4){
            return Math.round(Math.random() * (5000 - 3500) + 3500);
        }
        else if(useLevel === 5){
            return Math.round(Math.random() * (6000 - 4500) + 4500);
        }
        else if(useLevel === 6){
            return Math.round(Math.random() * (9000 - 6500) + 6500);
        }
        else if(useLevel === 6){
            return Math.round(Math.random() * (11000 - 8500) + 8500);
        }
    }
}

//class to create the bad pirates throughout the game
class BadPirates extends Pirates{
    constructor(name, crew, position, meetingText){
        super(name, crew, position)
        this.meetingText = meetingText;
    }
}

// This function gives the user basic info about the game and ask if they would like to continue on to the game
function introduction(){

    //takes the intro div from the html file
    let introSection = document.getElementById("intro");

    //makes the background for the intro div container white
    introSection.style.backgroundColor = "white";

    //creates a p element in the html document
    let introText = document.createElement("p");

    //adds the created p element to the intro div container and gives the element an id called intro-text
    introSection.appendChild(introText);
    introText.setAttribute("id", "intro-text");

    //text is put into the created p element thewelcomes the player to the game
    introText.innerHTML = "<p>Yo-ho, matey! Welcome to the treacherous seas of the Pirate Adventure Trivia Game! <br><br> Embark on a daring voyage full of swashbuckling exploits, hidden treasures, and perilous encounters. As the captain of your own ship, you'll navigate through mysterious islands and engage in fierce battles by answering trivia questions along the way.<br><br> Prepare to make crucial decisions that will shape your pirate legacy. Will you play and be a legendary captain known throughout the seas, or quit now and stay ashore?</p>";

    //a div container is created
    let introButtons = document.createElement("div");

    // the created div container is added into the introSection div container and is given an id called intro-buttons
    introSection.appendChild(introButtons);
    introButtons.setAttribute("class", "intro-button");

    //creates an input button, setting the id as "yes-play" to be called on later and making the value "prepare to sail into the unknown" that the player will see
    let playButton = document.createElement("input");
    playButton.setAttribute("id", "yes-play");
    playButton.setAttribute("type", "button");
    playButton.setAttribute("value", "Prepare to sail into the unknown!");

    //sets the color of the button to green
    playButton.style.backgroundColor = "#90EE90";

    //creates another input button, setting the id to "no-quit" to be called on later and making the value "I'll stay ashore for now" that the player will see
    let quitButton = document.createElement("input");
    quitButton.setAttribute("id", "no-quit");
    quitButton.setAttribute("type", "button");
    quitButton.setAttribute("value", "I'll stay ashore for now.");

    //sets the color of the button to red
    quitButton.style.backgroundColor = "#FF7F7F";

    //adds the two created buttons to the created "intro-button" div
    introButtons.appendChild(playButton);
    introButtons.appendChild(quitButton);

    // event listener for the "intro-button" div
    introButtons.addEventListener("click", function(event) {

        //stops default action 
        event.preventDefault();
        //creating a variable for the event.target
        let playOption = event.target;

        //criteria for the event listener to run
        if(playOption.tagName !== "INPUT" && playOption.getAttribute("type") !== "button"){
            return;
        }

        //getting the id attribute of the event that was pressed
        let playChoice = playOption.getAttribute("id");

        //conditions to decide where the player will go next

        //if the id of the button pressed was "yes-play" it will remove the created p element anf the created div container with the buttons and moves on to the next function to continue the game
        if(playChoice === "yes-play"){

            //the p element and the button div container is removed from the html
            introText.remove();
            introButtons.remove();
            //the getNames function takes in the introSection as a parameter
            getNames(introSection);
        }
        //if the id of the button pressed was "no-quit" it will remove the created p element and the created div container with the buttons and moves on to the ending function of the game to end the game
        else if(playChoice === "no-quit"){

            //the p element and the button div container is removed from the html
            introText.remove();
            introButtons.remove();

            //the endGame function takes in the word "beginning" as a parameter
            endGame("beginning");
        }
    })
};

//The getNames function gets inputs, the player names and what the player wants to call their pirate crew, from the user at the beginning of the game to use during the game. it takes in the "intro" div from the html as an input 
function getNames(nameSection){

    //creates a p element 
    let nameText = document.createElement("p");

    //adds the p element to the "intro" div and sets the id attribute to "intro-text"
    nameSection.appendChild(nameText);
    nameText.setAttribute("id", "intro-text");

    //text is input input into the created p element that ask the user their name
    nameText.innerHTML = "Welcome aboard, matey! <br><br>As captain,ye shall navigate treacherous waters, face legendary battles, and uncover untold riches.<br><br>But wait, what shall we call you matey?"

    // a div container is created, given the id attribute "get-info" and adds it to the 
    let inputName = document.createElement("div");
    inputName.setAttribute("id", "get-info");
    nameSection.appendChild(inputName);

    //a "captain" label is creates for the input and paces it with the text input. It is then added to the "get-info" div container
    let nameInputLabel = document.createElement("label");
    nameInputLabel.setAttribute("for", "name");
    nameInputLabel.innerHTML = "Captain";
    inputName.appendChild(nameInputLabel);

    //a text input is created with "name" as a placeholder and sets the id attribute as "captain-name" to be called on later. It is then added to the "get-info" div container
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.setAttribute("id", "captain-name");
    inputName.appendChild(nameInput);

    //a button input is created with "Submit" as the value and is then added to the "get-info" div container
    let nameSubmit = document.createElement("input");
    nameSubmit.setAttribute("type", "button");
    nameSubmit.setAttribute("value", "Submit");
    inputName.appendChild(nameSubmit);

    //the submit input button color is changed to green
    nameSubmit.style.backgroundColor = "#90EE90";

    // a variable is created to hold the player name as input
    let captainName = "";

    // an event listener is added to the submit button when it is clicked
    nameSubmit.addEventListener("click", function(event) {

        // when the button is clicked it stops defaut events from happening and stopps the event from being called again
        event.preventDefault();
        event.stopPropagation();

        //the event target is assigned to a variable 
        let gotName = event.target;

        //criteria for the event listener to run
        if(gotName.tagName !== "INPUT" || gotName.getAttribute("type") !== "button"){
            return;
        }

        //takes the value from the text input and saves it to the captain name variable
        captainName = nameInput.value;

        //the name text input is removed and the submut button is removed from the "get-info" div container
        nameInput.remove();
        nameSubmit.remove();

        // the p element text is replaced to ask the player what they would name their crew
        nameText.innerHTML = `Ahoy Captain ${captainName}, What is the name of yer noble crew as ye sail the open seas and seek treasures untold on this grand adventure?`

        // changes the lable to crew name for the new input
        nameInputLabel.setAttribute("for", "name");
        nameInputLabel.innerHTML = "Crew Name: ";

        //creates a new text input to collect the name of the players pirate crew, with a pkaceholder "Crew Name" and is assigned the id attribute "crew-name" to be used later. It is then added to the "get-info" div container
        let crewNameInput = document.createElement("input");
        crewNameInput.setAttribute("type", "text");
        crewNameInput.setAttribute("placeholder", "Crew Name");
        crewNameInput.setAttribute("id", "crew-name");
        inputName.appendChild(crewNameInput);

        // a new submit button is created for the crew name text input and is added to the "get-info" div container
        let crewNameSubmit = document.createElement("input");
        crewNameSubmit.setAttribute("type", "button");
        crewNameSubmit.setAttribute("value", "Submit");
        inputName.appendChild(crewNameSubmit);
   
        //the submit button color is set to green
        crewNameSubmit.style.backgroundColor = "#90EE90";

        //a crew name variable is created to hold the crew name value
        let crewName = "";

        // an event listener is added to the crew name submit button when the button is clicked
        crewNameSubmit.addEventListener("click", function(event) {

            // when the button is clicked it stops defaut events from happening and stopps the event from being called again
            event.preventDefault();
            event.stopPropagation();

            //the event target is assigned to a variable
            let gotCrewName = event.target;

            //criteria for the event listener to run
            if(gotCrewName.tagName !== "INPUT" || gotCrewName.getAttribute("type") !== "button"){
                return;
            }

            // takes the value from the crew name input and saves it to the crewName variable
            crewName = crewNameInput.value;

            //the name text input is removed and the submut button is removed from the "get-info" div container 
            nameText.remove();
            inputName.remove();

            //creates a variable that holds the player name and their creww name in an array
            let inputNames = [captainName, crewName]

            //startGame function is called with the name arrays and the section as an input for the function
            startGame(inputNames, nameSection);

        });
    });

}

//this function gives the player the basic ifo about the game and asks if they want to continue further or quit the game. It takes in the input of the array that contains the player name and thier pirate crew name and the "intro" div containers
function startGame(playerNames, startSection){


    // a p element is created and given the id attribute of "intro-text". It is then added to the "intro" div
    let startText = document.createElement("p");
    startText.setAttribute("id", "intro-text");
    startSection.appendChild(startText);

    //Text is added into the created p element that tells the player about the basics of the game
    startText.innerHTML = `Avast, Captain ${playerNames[0]}! The ship awaits, and the horizon beckons.<br><br>Instructions:<br><br>You will be traveling to 7 destinations where you will battle bad pirates. For each battle you will answer 10 trivia questions and if you get 4 questions wrong, you will lose the battle. At the end of each battle you will have the chance to win doubloons (money), a new crew member and/or a weapon depending on the number of answers you got correct.<br><br>Adventure awaits! (You can quit anytime during the game)`

    //a div container is creates to hold the buttons and is given the id attribute "get-info". It is then added to the "intro" div
    let startButtons = document.createElement("div");
    startButtons.setAttribute("id", "get-info");
    startSection.appendChild(startButtons);

    //creates a input button element that will ask if the player wants to continue on to the game. It is given the id attribute "yes-start" that will be used later
    let startButton = document.createElement("input");
    startButton.setAttribute("id", "yes-start");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("value", "Hoist the Jolly Roger and set sail!");

    // the button color is set to green
    startButton.style.backgroundColor = "#90EE90";

    //another input button element is created that will ask is the player wants to exit the game. it is given th id attribute "no-dontStart" that will be used later
    let dontStartButton = document.createElement("input");
    dontStartButton.setAttribute("id", "no-dontStart");
    dontStartButton.setAttribute("type", "button");
    dontStartButton.setAttribute("value", "Plant me flag on land");

    //the color of theis buton is set to red
    dontStartButton.style.backgroundColor = "#FF7F7F";

    //both of the buttons are added to the created div container for the buttons
    startButtons.appendChild(startButton);
    startButtons.appendChild(dontStartButton);

    //an event listener is added to the created div container for the buttons 
    startButtons.addEventListener("click", function(event) {

        // when the button is clicked it stops defaut events from happening and stopps the event from being called again
        event.preventDefault();
        event.stopPropagation();

        //the event target is assigned to a variable
        let continueOption = event.target;

        //criteria for the event listener to run
        if(continueOption.tagName !== "INPUT" || continueOption.getAttribute("type") !== "button"){
            return;
        }

        //getting the id attribute of the event that was pressed
        let continueChoice = continueOption.getAttribute("id");

        //conditions to decide where the player will go next

        // if the event target has the id of "yes-start" it will remove the text and the button container from the html. It then creates the the captain object using the captain class. It then calls the destination function to continue the game 
        if(continueChoice === "yes-start"){

            //the p element and the button div container is removed from the html
            startText.remove();
            startButtons.remove();

            //a variable is assigned to to create the players captain object using the Captain class
            let playerCaptain = new Captain(`Captain ${playerNames[0]}`, playerNames[1], "Captain");

            // destination function is called taking in the player captain object with the starting level and the starting array number as inputs
            destination(playerCaptain, 1, 0);
        }
        // if the event target has the id "no-dontStart" it will remove the text and the button contaoner from the html. It then calls the endgame 
        else if(continueChoice === "no-dontStart"){

            //the p element and the button div container is removed from the html
            startText.remove();
            startButtons.remove();

            //the endGame function takes in the word "beginning" as a parameter
            endGame("beginning");
        }
    });
}

// The destination function shows the main game screen to the user with the player states and their member and weapon inventory. It takes the input of the player object, the current level the player is on and the array number for the global variables
function destination(captain, level, arrayNum){

    //creates a bad pirate object with the current array number for the global variables
    let badPirate = new Pirates(opponentArr[arrayNum][0], opponentArr[arrayNum][1], opponentArr[arrayNum][2], opponentArr[arrayNum][3]);

    //the "player-info", "main-text", "member-inventory", "weapon-inventory" sections in the html get the class "hidden" removed from them so that they become visable to the player
    let infoSection = document.getElementById("player-info");
    infoSection.classList.remove("hidden");
    let mainSection = document.getElementById("main-text");
    mainSection.classList.remove("hidden");
    let  memberSection = document.getElementById("member-inventory");
    memberSection.classList.remove("hidden");
    let inventorySection = document.getElementById("weapon-inventory");
    inventorySection.classList.remove("hidden");

    //from the "player-info" section the span elements are called from the html file
    let insertCaptainName = document.getElementById("name");
    let insertCrewName = document.getElementById("crew-name");
    let insertDoubloons = document.getElementById("money");
    let insertHealth = document.getElementById("health");

    //the player information from the player object is inserted into the called span elements
    insertCaptainName.innerHTML = `${captain.name}`;
    insertCrewName.innerHTML = `${captain.crew}`;
    insertDoubloons.innerHTML = `${captain.doubloons}`;
    insertHealth.innerHTML = `${captain.health}`;

    //from the "main-text" section the span elements for the "level" p element is called
    let levelNumber = document.getElementById("level-number");
    let destinationLocation = document.getElementById("destination");
    //the font weight of the "destination" element font weight is changed
    destinationLocation.style.fontWeight = "normal"

    //The information about the level and destination that the player is on is input into the "level-number" and "destination" span elements
    levelNumber.innerHTML = level;
    destinationLocation.innerHTML = destinations[arrayNum].island;

    //the container div "destination-info" in the "main-text" is called
    let continueDestination = document.getElementById("destination-info");
    
    // the "destination-text" element is called and text is added into it from the destination global variable
    let destinationText = document.getElementById("destination-text");
    destinationText.innerHTML = `Land ho, ${captain.name}! ${destinations[arrayNum].text}`

    // gets the input button element from the html by the id "currentDestination" and sets the value to the current destination using the arrayNum variable and the global destination variable. It then sets the color of the button to green
    let destinationButton = document.getElementById("currentDestination");
    destinationButton.setAttribute("value", `Explore the ${destinations[arrayNum].island}`);

    //the color for the button is changed to green
    destinationButton.style.backgroundColor = "#90EE90";

    //continueToNextDestination function is called when the destinationButton event listener is clicked, it takes the event as the input
    function continueToNextDestination(event){

        // when the button is clicked it stops defaut events from happening and stopps the event from being called again
        event.preventDefault();
        event.stopPropagation();

        //the event target is assigned to a variable
        let continueEvent = event.target;

        //criteria for the event listener to run
        if(continueEvent.tagName !== "INPUT" || continueEvent.getAttribute("type") !== "button"){
            return;
        }

        //The event listener for the destinationButton is removed so when the button is used again multiple buttons dont appear.
        destinationButton.removeEventListener("click", continueToNextDestination)

        //the text is input with the different text for each bad pirate the player battles
        destinationText.innerHTML = `Shiver me timbers, ${captain.name}! ${opponentArr[arrayNum][3]} <br><br> Continue on to the trivia game to battle it out`
        
        //gets the input button from the html with the id "currentdestination" and the value that the user would see is "continue to Trivia"
        let continueButton = document.getElementById("currentDestination");
        continueButton.setAttribute("value", "Continue to Trivia");

        //the color of the button is changed to green
        continueButton.style.backgroundColor = "#90EE90";

        // continueToTrivia is called when the input button is pressed and takes in the input of an event
        function continueToTrivia(newEvent){

            // when the button is clicked it stops defaut events from happening and stopps the event from being called again
            newEvent.preventDefault();
            newEvent.stopPropagation();

            //the event target is assigned to a variable
            let continueEvent = newEvent.target;
    
            //criteria for the event listener to run
            if(continueEvent.tagName !== "INPUT" || continueEvent.getAttribute("type") !== "button"){
                return;
            }

            // the event listener for the continue to trivia button is removed so that multiple buttons don't appear and it can be used again in the future
            continueButton.removeEventListener("click", continueToTrivia);

            //the text is replaced for future use
            destinationText.replaceChildren();
            
            //the "destination-info" div is hidden so that the other elements can show during the game
            continueDestination.classList.add("hidden");

            //the triviaGame is called to start the trivia battle for the player, it takes in the player captain element, the bad pirate, the level they are on and the current array number
            triviaGame(captain, badPirate, level, arrayNum);
        }

        //an event listener is added to the input button so when it is clicked it will go to the function continueToTrivia
        continueButton.addEventListener("click", continueToTrivia);
    };

    // an event listener is added to the destination button that was called from the html and the continueToNextDestination function is called when the button is clicked
    destinationButton.addEventListener("click", continueToNextDestination);
}

//triviaGame gets the screen ready for the trivia questions taking in the input of the player captain element, the bad pirate element, the level they are on and the current array number
function triviaGame(playingCaptain, playingBadPirate, startingLevel, arrayNum1){

    // the "trivia-text" div container is called from the html document and made visable to the player
    let triviaScreen = document.getElementById("trivia-text");
    triviaScreen.classList.remove("hidden");

    // the span elements for "player-name", "player-health", "weapon", "opponent-name", and "opponent-health" is called from the html document
    let playerNameTrivia = document.getElementById("player-name");
    let playerhealthTrivia = document.getElementById("player-health");
    let playerweaponTrivia = document.getElementById("weapon");
    let opponentNameTrivia = document.getElementById("opponent-name");
    let opponentHealthTrivia = document.getElementById("opponent-health");

    //inputs are added to the span elements that will show and change throughout the game
    playerNameTrivia.innerHTML = `${playingCaptain.name} `;
    playerhealthTrivia.innerHTML = `${playingCaptain.health}`;
    playerweaponTrivia.innerHTML = `${playingCaptain.weapon[playingCaptain.weapon.length - 1][0]} `;
    opponentNameTrivia.innerHTML = `${playingBadPirate.name} `;
    opponentHealthTrivia.innerHTML = `${playingBadPirate.health}`;

    //the starting elements for the game that will restart for each level

    //starting number of questions player got correct
    let startCorrect = 0;

    //starting question number for the global triviaQandA variable
    let startQuestionNum = 1;

    //starting number of questions player got wrong
    let startWrong = 0;

    //the newQuetion function is called taking the first section of questions for the trivia game, the starting  correct number, the starting question number, the starting wrong number, the level number, the player captain element, the bad pirate and the array number for the level as inputs
    newQuestion(triviaQandA[arrayNum1], startCorrect, startQuestionNum, startWrong, startingLevel, playingCaptain, playingBadPirate, arrayNum1)

}

//This function creates and shows a new question on the screen everytime the function is called. it takes the current trivia section, the current correct number, the current question number, the current wrong number, the level number, the player captain element, the bad pirate and the array number for the level as input.
function newQuestion(triviaQandAArr, numCorrect, questionNum, numWrong, currentLevel, currentCaptain, currentBadPirate, arrayNum2){

    //gets the "question-number" element from the html document and inputs updated text evertime the function is called
    let questionNumber = document.getElementById("question-number");
    questionNumber.innerHTML = `${questionNum} / 10`;

    //gets the "trivia-question" element from the html document and inputs updated text evertime the function is called
    let triviaQuestion = document.getElementById("trivia-question");
    triviaQuestion.innerHTML = `${triviaQandAArr[questionNum-1].question}`

    //a div container with the id "answer-buttons" is called from the html document
    let answerButtons = document.getElementById("answer-buttons");

    //four input buttons are created for the four options for the current trivia question and is updated every question. it is then added to the "answer-button" div container
    let optionASubmit = document.createElement("input");
    optionASubmit.setAttribute("type", "button");
    optionASubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[0]}`);
    answerButtons.appendChild(optionASubmit);

    let optionBSubmit = document.createElement("input");
    optionBSubmit.setAttribute("type", "button");
    optionBSubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[1]}`);
    answerButtons.appendChild(optionBSubmit);

    let optionCSubmit = document.createElement("input");
    optionCSubmit.setAttribute("type", "button");
    optionCSubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[2]}`);
    answerButtons.appendChild(optionCSubmit);

    let optionDSubmit = document.createElement("input");
    optionDSubmit.setAttribute("type", "button");
    optionDSubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[3]}`);
    answerButtons.appendChild(optionDSubmit);

    //function for the "answer-buttons" event listener that takes in the event as an input
    function getAnswer(event){

        // when the button is clicked it stops defaut events from happening and stopps the event from being called again
        event.preventDefault();
        event.stopPropagation();

        //the event target is assigned to a variable
        let answerEvent = event.target;

        //criteria for the event listener to run
        if(answerEvent.tagName !== "INPUT" || answerEvent.getAttribute("type") !== "button"){
            return;
        }

        //setting the value of the players answer to ta variable that will be used to check later
        let answerChoice = answerEvent.getAttribute("value");

        //the checkAnswer function is called to check if the player answerd right. The function takes the player choice, the current questions answer, the current number correct and the current number wrong, the current question number, the current trivia question section, the "answer-buttons" div container, the function for the event listener for the "answer-buttons" event listener, the player captain object, the ad pirate object and the current array number as inputs 
        checkAnswer(answerChoice, triviaQandAArr[questionNum-1].answer, numCorrect, numWrong, questionNum, triviaQandAArr, answerButtons, currentLevel, getAnswer, currentCaptain, currentBadPirate, arrayNum2);
    }

    // and event listener is added to the "answer-buttons" to get the players answer for each question and calls the function getAnswer
    answerButtons.addEventListener("click", getAnswer);
}
// https://www.altcademy.com/blog/how-to-make-a-quiz-in-javascript/

//The function compares the player answer with the correct answer and tells the player if they got the question right or wrong. The checkAnswer function takes the player choice, the current questions answer, the current number correct and the current number wrong, the current question number, the current trivia question section, the "answer-buttons" div container, the function for the event listener for the "answer-buttons" event listener, the player captain object, the ad pirate object and the current array number as inputs 
function checkAnswer(playerAnswer, correctAnswer, correct, wrong, triviaQandANum, triviaArr, aButtons, continueLevel, answerFunction, changeCaptain, changeBadPirate, arrayNum3){

    //calls the "trivia-text" element from the html document and makes it visable to users
    let triviaTextScreen = document.getElementById("trivia-text");
    triviaTextScreen.classList.remove("hidden");

    //compares the player answer with the user answer

    //if the player answer and the answer were the same
    if(playerAnswer === correctAnswer){
        //adds one to the correct value
        correct++;
        //changes the bad pirate health by subtracting the hit power of weapon that the player is currently using
        changeBadPirate.health = changeBadPirate.health - (changeCaptain.weapon[changeCaptain.weapon.length -1][1]);

        //calls the "opponent-health" span element and updated the opponens health
        let changeBadPirateHealth = document.getElementById("opponent-health");
        changeBadPirateHealth.innerHTML = `${changeBadPirate.health}`;

        //function will display that the player got the question right
        function correctResultsScreen(){

            let inCritical = false

            if(changeBadPirate.health < 25 && continueLevel >=3){
                inCritical = true
            }

            //conditions for future levels when the pirate is in bad shape
            if(inCritical === true && triviaQandANum > 10){

                //used during the game to let the trivia battles get a lot harder 
                function powerUp(currentHealth, piratePosition){

                    //the last bad pirate they will battle will be the captain, so they get 100
                    if(piratePosition === "Captain"){
                        currentHealth = currentHealth + 100;

                        return currentHealth
                    }
                    else{
                        // any other pirate will get a random number for their power up
                        randomPowerUp = Math.round(Math.floor(Math.random() * (50 - 25) + 25))

                        currentHealth = currentHealth + randomPowerUp;

                        return currentHealth
                    }
                }

                //calls the power up function in the bad pirate class
                changeBadPirate.health = powerUp(changeBadPirate.health, changeBadPirate.position)

                let powerUpHealth = document.getElementById("opponent-health");

                powerUpHealth.innerHTML = `${changeBadPirate.health}`

                //the children of the "answer-buttons" div container is replaced
                aButtons.replaceChildren();

                //the "trivia-question" element is called and the new text is input into it
                let resultScreenCorrect = document.getElementById("trivia-question");
                resultScreenCorrect.innerHTML = `Correct<br><br>${changeBadPirate.name} took a hit<br><br> Oh No!!!, ${changeBadPirate.name}, having mended their wounds and replenished their stores, stands ready for another skirmish.<br><br>Ye be facing a resilient adversary, Captain. Prepare yer crew and weapons, for the battle ahead promises to be even more intense.`;
            }
            //if the first conditions aren't met
            else{

                //the children of the "answer-buttons" div container is replaced
                aButtons.replaceChildren();

                //the "trivia-question" element is called and the new text is input into it
                let resultScreenCorrect = document.getElementById("trivia-question");
                resultScreenCorrect.innerHTML = `Correct<br><br>${changeBadPirate.name} took a hit`;
            }
            
            // a new input button is created to take the user to the next question
            let nextButton = document.createElement("input");
            nextButton.setAttribute("type", "button");
            nextButton.setAttribute("value", `Next Question`);
            aButtons.appendChild(nextButton);
            //the button is colored green
            nextButton.style.backgroundColor = "#90EE90";
        
            //event listener when the "Next Question" button is pressed to take the user to the next question, end of level screen or the end of game screen
            nextButton.addEventListener("click", function(event){

                // when the button is clicked it stops defaut events from happening and stopps the event from being called again
                event.preventDefault();
                event.stopPropagation();

                //criteria for the event listener to run
                if(event.target.tagName !== "INPUT" || event.target.getAttribute("type") !== "button"){
                    return;
                }

                //the question number changes
                triviaQandANum = triviaQandANum + 1;
                
                //condition to keep going until the last question

                // if the is in good health, have less than 4 questions wrong, and is not the last question
                if (triviaQandANum <= 10 && wrong !== 4 && changeCaptain.health > 20){

                    //the children of the "answer-buttons" div container is replaced
                    aButtons.replaceChildren();
                    //The event listener for the "answer-button" div container is removed
                    aButtons.removeEventListener("click", answerFunction);
                    //calls the function nextQuestion with the triviasection, the current correct number, the current trivia question number, the current wrong number, the current level, the player captain object, the bad pirate object, and the array number as inputs
                    newQuestion(triviaArr, correct, triviaQandANum, wrong, continueLevel, changeCaptain, changeBadPirate, arrayNum3);
                }
                //if it was the last question
                else if(triviaQandANum === 11){

                    //the children of the "answer-buttons" div container is replaced
                    aButtons.replaceChildren();
                    //The event listener for the "answer-button" div container is removed
                    aButtons.removeEventListener("click", answerFunction);
                    //calls the triviaEndScreen function with the number of questions they got wrong, the current level, the player captain object, and the current array number as inputs
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                //if the user got 4 questions wrong
                else if(wrong === 4){
                    //the children of the "answer-buttons" div container is replaced
                    aButtons.replaceChildren();
                    //The event listener for the "answer-button" div container is removed
                    aButtons.removeEventListener("click", answerFunction);
                    //calls the triviaEndScreen function with the number of questions they got wrong, the current level, the player captain object, and the current array number as inputs
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                // if the user's health is lower than 20
                if(changeCaptain.health <= 20){

                    //calls the endScreen function with the keyWord and the captains name
                    endGame("poor health", changeCaptain.name);
                }
                
            });
        }

        //correctResultScreen function is called to display the correct screen
        correctResultsScreen()
    }
    //if the player answer and the answer were not the same
    else{

        //adds one to the correct value
        wrong++;

        //decreases the player health by 10 whenever they get the question wrong
        changeCaptain.health = changeCaptain.health - 10;

        //calls the "player-health" span element and updated the players health
        let changeCaptainHealth = document.getElementById("player-health");
        changeCaptainHealth.innerHTML = `${changeCaptain.health}`;

        function wrongResultsScreen(){

            let lowPlayerHealth = false

            if(changeCaptain.health < 30 && continueLevel >=3){
                lowPlayerHealth = true
            }

            //conditions for future levels when the pirate is in bad shape
            if(lowPlayerHealth === true && changeCaptain.doubloons > 1000 && triviaQandANum > 10){

                //used during the game to let the trivia battles get a lot harder 
                function seeDoctor(currentHealth,  currentDoubloons){

                    currentHealth = currentHealth + 25;

                    currentDoubloons = currentDoubloons - 1000

                    let healthArr = [currentHealth, currentDoubloons]

                    return healthArr;
                }

                let payforDoc = []
                //calls the seeDoctor function in the bad pirate class
                payforDoc = seeDoctor(changeCaptain.health, changeCaptain.doubloons)

                changeCaptain.health = payforDoc[0]
                changeCaptain.doubloons = payforDoc[1]

                let doctorHealth = document.getElementById("player-health");

                doctorHealth.innerHTML = `${changeCaptain.health}`

                //the children of the "answer-buttons" div container is replaced
                aButtons.replaceChildren();

                //the "trivia-question" element is called and the new text is input into it
                let resultScreenWrong = document.getElementById("trivia-question");
                resultScreenWrong.innerHTML = `Incorrect<br><br>You took a hit<br><br> Aye ${keepCaptain.name} In the midst of the battles and perils of the high seas, ye got the help of a skilled doctor. With their healing touch and vast knowledge of the medical arts, your health is on the mend.`;

            }
            else{

                //the children of the "answer-buttons" div container is replaced
                aButtons.replaceChildren();

                //the "trivia-question" element is called and the new text is input into it
                let resultScreenWrong = document.getElementById("trivia-question");
                resultScreenWrong.innerHTML = `Incorrect<br><br>You took a hit`;
            }
        

            // a new input button is created to take the user to the next question
            let nextButton = document.createElement("input");
            nextButton.setAttribute("type", "button");
            nextButton.setAttribute("value", `Next Question`);
            aButtons.appendChild(nextButton);
            //the button is colored green
            nextButton.style.backgroundColor = "#90EE90";
        
            //event listener when the "Next Question" button is pressed to take the user to the next question, end of level screen or the end of game screen
            nextButton.addEventListener("click", function(event){

                // when the button is clicked it stops defaut events from happening and stopps the event from being called again
                event.preventDefault();
                event.stopPropagation();

                //criteria for the event listener to run
                if(event.target.tagName !== "INPUT" || event.target.getAttribute("type") !== "button"){
                    return;
                }

                //the question number changes
                triviaQandANum = triviaQandANum + 1;

                //condition to keep going until the last question

                // if the is in good health, have less than 4 questions wrong, and is not the last question
                if (triviaQandANum <= 10 && wrong !== 4 && changeCaptain.health > 20){

                    //the children of the "answer-buttons" div container is replaced
                    aButtons.replaceChildren();
                    //The event listener for the "answer-button" div container is removed
                    aButtons.removeEventListener("click", answerFunction);
                    //calls the function nextQuestion with the triviasection, the current correct number, the current trivia question number, the current wrong number, the current level, the player captain object, the bad pirate object, and the array number as inputs
                    newQuestion(triviaArr, correct, triviaQandANum, wrong, continueLevel, changeCaptain, changeBadPirate, arrayNum3);
                }
                //if it was the last question
                else if(triviaQandANum === 11){

                    //the children of the "answer-buttons" div container is replaced
                    aButtons.replaceChildren();
                    //The event listener for the "answer-button" div container is removed
                    aButtons.removeEventListener("click", answerFunction);
                    //calls the triviaEndScreen function with the number of questions they got wrong, the current level, the player captain object, and the current array number as inputs
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                //if the user got 4 questions wrong
                else if(wrong === 4){

                    //the children of the "answer-buttons" div container is replaced
                    aButtons.replaceChildren();
                    //The event listener for the "answer-button" div container is removed
                    aButtons.removeEventListener("click", answerFunction);
                    //calls the triviaEndScreen function with the number of questions they got wrong, the current level, the player captain object, and the current array number as inputs
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                // if the user's health is lower than 20
                if(changeCaptain.health <= 20){

                    //calls the endScreen function with the keyWord and the captains name
                    endGame("poor health", changeCaptain.name);
                }
                
            });
        
        }
        //wrongResultScreen function is called to display the correct screen
        wrongResultsScreen()
    };
}
// https://www.altcademy.com/blog/how-to-make-a-quiz-in-javascript/

//this function shows the ending screen after the player finishes a level and shows them the rewards they earnd. The function takes the number of questions wrong, the current level, the captain object and the current array number as inputs
function triviaEndScreen(wrongCount, changeLevel, keepCaptain, arrayNum4){

    //calls the "trivia-question" element and the "answer-buttons" div container from the html document
    let rewardScreen = document.getElementById("trivia-question");
    let nextDestinationButtons = document.getElementById("answer-buttons");

    //creates two input buttons for that is the added to the "answer-button" div container
    let nextDestinationButton = document.createElement("input");
    nextDestinationButton.setAttribute("type", "button");
    nextDestinationButton.setAttribute("value", `Forward, to Next Destination`);
    nextDestinationButton.setAttribute("id", `continue-destination`); 
    nextDestinationButtons.appendChild(nextDestinationButton);
    //makes the button green
    nextDestinationButton.style.backgroundColor = "#90EE90";

    let endJourneyButton = document.createElement("input");
    endJourneyButton.setAttribute("type", "button");
    endJourneyButton.setAttribute("value", `End Journey Here`);
    endJourneyButton.setAttribute("id", `end-here`);
    nextDestinationButtons.appendChild(endJourneyButton);
    //makes the button red
    endJourneyButton.style.backgroundColor = "#FF7F7F";

    //conditions based on the level the user is on

    //if the level is less than 6
    if(changeLevel < 6){

        //get the random amount of doubloons for reward from object
        let rewardDoubloons = keepCaptain.getDoubloons(changeLevel);
        //get a new player from the global variable
        let newMember = crewArr[arrayNum4];
        //creates the new pirate member for the player
        let newCrewMember = new Pirates(newMember[0], keepCaptain.crew, newMember[1])

        //rewards based on number of questions they got wrong
        if(wrongCount === 0){

            //adds the new weapon, member and doubloons to the player captain object
            keepCaptain.weapon.push(weaponsArr[arrayNum4])
            keepCaptain.crewMembers.push(newCrewMember);
            keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons


            //updates the "reward-screen" text
            rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the rewards be plenty for a pirate of yer caliber:<br><b>**Doubloons Gained:**</b>${rewardDoubloons}<br><b>**New Crew Member:**<b>${newCrewMember.name}<br><b>**Weapon Acquired:**</b>${weaponsArr[arrayNum4][0]}<br><br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`

            //adds the new member to the screen with the "members-list" element
            let memberList = document.getElementById("member-list");
            let newMember = document.createElement("li");
            newMember.innerHTML = `&nbsp;${newCrewMember.position}, ${newCrewMember.name}`
            memberList.appendChild(newMember);

            //adds the new weapon to the screen with the "weapon-list" element
            let weaponList = document.getElementById("weapon-list");
            let newWeapon = document.createElement("li");
            newWeapon.innerHTML = `&nbsp;${weaponsArr[arrayNum4][0]}`
            weaponList.appendChild(newWeapon);
        }
        else if(wrongCount === 1 || wrongCount === 2){

            //adds the new member and doubloons to the player captain object
            keepCaptain.crewMembers.push(newCrewMember);
            keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

            //updates the "reward-screen" text
            rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the rewards be plenty for a pirate of yer caliber:<br><b>**Doubloons Gained:**</b>${rewardDoubloons}<br><b>**New Crew Member:**</b>${newCrewMember.name}<br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`

            //adds the new member to the screen with the "member-list" element
            let memberList = document.getElementById("member-list");
            let newMember = document.createElement("li");
            newMember.innerHTML = `&nbsp;${newCrewMember.position}, ${newCrewMember.name}`
            memberList.appendChild(newMember);
        }
        else if(wrongCount === 3){

            //adds the doubloons to the player captain object
            keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

            //updates the "reward-screen" text
            rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the reward be plenty for a pirate of yer caliber:<br><b>**Doubloons Gained:**</b>${rewardDoubloons}<br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`
        }
        else if(wrongCount === 4){

            //they dont get rewards

            //updates the "reward-screen" text
            rewardScreen.innerHTML = `Ahoy, ${keepCaptain.name}!<br>Ye faced a formidable foe on the trivia battlefield, but alas, the pirate's cunning wit and knowledge prevailed. Despite yer valiant efforts, four questions slipped through like a ghostly ship in the night.<br><br>The battle be lost, and the pirate, with a wry grin, claims victory. Fear not, for every defeat be a step closer to victory. May the winds of wisdom favor ye in future battles,  ${keepCaptain.name}!`
        }

    }
    else{

        if(wrongCount === 4){

            //updates the "reward-screen" text
            rewardScreen.innerHTML = `Ahoy, ${keepCaptain.name}!<br>Ye faced a formidable foe on the trivia battlefield, but alas, the pirate's cunning wit and knowledge prevailed. Despite yer valiant efforts, four questions slipped through like a ghostly ship in the night.<br><br>The battle be lost, and the pirate, with a wry grin, claims victory. Fear not, for every defeat be a step closer to victory. May the winds of wisdom favor ye in future battles,  ${keepCaptain.name}!`
        }
        else{

            //get the random amount of doubloons for reward from object
        let rewardDoubloons = keepCaptain.getDoubloons(changeLevel);

        //adds the doubloons to the player captain object
        keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

        //updates the "reward-screen" text
        rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the reward be plenty for a pirate of yer caliber:<br><b>**Doubloons Gained:**</b>${rewardDoubloons}<br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`
        }
    }

    // creates the copy of 
    let copy = nextDestinationButtons.cloneNode(true);

    //removes the element "answer-button"
    nextDestinationButtons.remove();

    //adds event listener to the copy of the "answer-button" container
    copy.addEventListener("click", function(event){
        
        // when the button is clicked it stops defaut events from happening and stopps the event from being called again
        event.preventDefault();
        event.stopPropagation();
        
        //criteria for the event listener to run
        if(event.target.tagName !== "INPUT" || event.target.getAttribute("type") !== "button"){
            return;
        }
        
        //gets the id value of the clicked event
        let continueOn = event.target.getAttribute("id");

        //gets the elements "trivia-text" and "destination-info" elements from the html document
        let hideTriviaSection = document.getElementById("trivia-text");
        let nextDestination = document.getElementById("destination-info")
        
        //hides the "trivia-text" element so it doesnt cover the other elements
        hideTriviaSection.classList.add("hidden");
        
        //
        if (continueOn === "continue-destination"){

            // replaces the elements of th
            rewardScreen.replaceChildren();
            copy.replaceChildren();
            nextDestination.classList.remove("hidden");

            //updates the level and the array number
            changeLevel = changeLevel + 1;
            arrayNum4 = arrayNum4 + 1;
    
            //if the level if less than 8, then the game will keep going
            if(changeLevel < 8){
            // destination function is called taking in the player captain object with the updated level and the updated array number as inputs
            destination(keepCaptain, changeLevel, arrayNum4);
            }
            //if the level is at 8 then the game will end 
            else{

                //calls the endScreen function with the keyWord and the captains name
                endGame("complete", keepCaptain.name);
            }
        }
        //if the player chooses to end the game there
        else if(continueOn === "end-here"){

            //calls the endScreen function with the keyWord and the captains name
            endGame("during", keepCaptain.name);
        }
        
    });

    //appends the copy of the nextDestinationButtons container to the question container where the nextDestinationButton container is
    let container = document.querySelector("#question-container");
    //adds the 
    container.append(copy)
};

//The endGame function is used when the player decides not to continue the game. it takes the input of a keyWord and the player name. But if there is not one the default value is empty
function endGame(keyWord, yourName = ""){

    // this makes sure the elements used to create the game screen are not visable to the user and so that the other elements will show
    let closeInfoSection = document.getElementById("player-info");
    closeInfoSection.classList.remove("hidden");
    closeInfoSection.classList.add("hidden");

    let closeInventorySection = document.getElementById("weapon-inventory");
    closeInventorySection.classList.remove("hidden");
    closeInventorySection.classList.add("hidden");

    let closeMainSection = document.getElementById("main-text");
    closeMainSection.classList.remove("hidden");
    closeMainSection.classList.add("hidden");

    let closeMemberSection = document.getElementById("member-inventory");
    closeMemberSection.classList.remove("hidden");
    closeMemberSection.classList.add("hidden");

    //thi9s calls the div element from the html with the id "intro"
    let endSection = document.getElementById("intro");

    //it sets the background of the div container to white
    endSection.style.backgroundColor = "white";

    //a p tag element is created and the id attribut is set to "intro-text". it is then added to the intro container
    let endText = document.createElement("p");
    endText.setAttribute("id", "intro-text");
    endSection.appendChild(endText);

    // this will take the keyword input and decide what text to show the user

    //if the player decids to quit in the beginning of the game
    if(keyWord === "beginning"){

        endText.innerHTML = "Fair winds and calm seas, matey! <br><br>If ye choose to remain ashore and let the allure of the open ocean pass ye by, fear not. Not every soul be destined for the high seas, and the Pirate Adventure Trivia Game shall patiently await the day when ye hear the siren call of adventure.<br><br>Should ye ever decide to unfurl the sails and seek fortune on the boundless sea, the Pirate Adventure Trivia Game will be ready to welcome ye aboard.<br><br>Farewell, landlubber!"
    }
    //if the player decides to quit during the game
    else if(keyWord === "during"){

        endText.innerHTML = `Fair winds, ${yourName}! As ye choose to part ways with the open sea, know that the Pirate Adventure Trivia Game remains a tale of what could have been. May yer future endeavors be as prosperous as the horizon we left behind.<br><br>Should ye ever feel the call of the ocean, remember the tales of yer time on the high seas. Until then, may yer compass guide ye ashore.<br><br>Thank ye for venturing into the Pirate Adventure Trivia Game!`
    }
    //if the player is forced to end the game because their health is too low
    else if(keyWord === "poor health"){
        endText.innerHTML = `Ahoy, ${yourName}!<br><br>Ye health be as fragile as glass, and the perils of the pirate life have taken their toll. The sea be a harsh mistress, and unfortunately, yer journey ends here.<br><br>Though the waves may have conquered ye, remember the adventures and the tales of the high seas. May the winds carry ye memories to Davy Jones' locker.<br><br>Fair winds and a kinder fate on yer next voyage!`
    }
    //if the player finishes the game
    else if(keyWord === "complete"){

        endText.innerHTML = `Ahoy, ${yourName}!<br><br>Ye have fought valiantly on the shores of knowledge, defeating the bad pirate in a fierce trivia battle on land. The victory be yers, and the defeated pirate slinks away in shame.<br><br>The cheers of victory echo through the land as yer crew revels in the glory of success.<br><br>May the stars guide ye on future quests, ${yourName}!`

    }
    
};

//calls the first function to run the game
introduction()

//a destination array that contains the different destinations and texts for each level / destination to display to the player
const destinations = [

    //level 1
    {
    island: "Florida Keys",
    text: `Yer ship docks at the first destination, The Florida Keys. The mysterious island awaits with secrets to unveil and treasures to be discovered.`
    },
    //level 2
    {
    island: "Port Royal",
    text: `The ship drops anchor at the second destination, Port Royal. The land holds new challenges, mysteries, and untold treasures. Brace yerself for the next chapter of the Pirate Adventure Trivia Game!`
    },
    // level 3
    {
    island: "Barbury Coast",
    text: `The ship graces the shores of the third destination, The Barbury Coast. The mysterious island awaits with secrets to unveil and treasures to be discovered.<br><br>Be Aware, the Bad pirate can power up if their health is too Low.<br><br>A doctor will help if you health gets too low, Be aware it does cost money (1000 doubloons)`
    },

    {
    island: "Mauritius",
    text: `The ship anchors at the fourth destination, Mauritius, a place where the seas whisper of both peril and plunder. Yer crew stands poised for the next chapter of the Pirate Adventure Trivia Game.`
    },
    //level 4
    {
    island: "Gulf of Tokin",
    text: `The ship drops anchor at the fifth destination, a place of both mystery and potential fortune. The crew awaits yer command as tales of legendary treasures and formidable challenges echo in the wind.`
    },
    // level 5
    {
    island: "Indonesia",
    text: `The ship arrives at the sixth destination, Indonesia, a place where the currents of fate converge. The crew, seasoned and ready, awaits yer next orders. Legends await as the Pirate Adventure Trivia Game unfolds further.`
    },
    // level 6
    {
    island: "Panama Canal",
    text: `The ship has reached the last destination, The Panama Canal marking the end of the Pirate Adventure Trivia Game. The crew stands ready, though you journey may not be complete, the tales of yer daring exploits will echo across the seas.`
    }
];

//an array of the pirates that the player will be challenging for each level, it contains the information needed for the BadPirate function
const opponentArr = [
    //level 1
    ["Vanguard", "Shadow Serpents", "Navigator", "As ye step ashore, a menacing pirate emerges, its Navigator Vanguard of the Shadow Serpents and he's demanding yer valuables."],
    //level 2
    ["Buccaneer Nell", "Black Tide Buccaneers", "Boatswain", "A rival pirate, Boatswain Buccaneer Nell of the Black Tide Buccaneers, challenges ye to a game of wits."],
    //level 3
    ["Blackheart Brutus", "Thunderstrike Raiders", "Gunner", "A notorious pirate, Gunner Blackheart Brutus of the Thunderstrick Raiders, known for ruthless deeds, approaches with ill intentions. What be yer move?"],
    //level 4
    ["Shadowblade Killian", "Stormborn Marauders", "Quartermaster", "A cunning pirate, QUartermaster Shadowblade Killian of the Stormborn Marauders, challenges ye to a game of chance and skill on the island. What be yer approach to this contest?"],
    //level 5
    ["Darkwater Mortimer", "Crossbones Syndicate", "First Mate", "A rogue pirate crew, known for their brutality, awaits ye on the island. How will ye handle this dire confrontation?"],
    //level 6
    ["Direclaw Riven", "Ironheart Privateers", "First Mate", "A notorious pirate, First Mate Direclaw Riven, challenges ye to a duel"],
    // level 7
    ["Sablebane Morgana", "Sable Phantom Fleet", "Captain", `As ye step ashore, a shadowy figure emerges from the shadows a fearsome pirate, infamous for ruthless deeds on land and sea Captain Sablebane Morgana of the Sable Phantom Fleet.`]
];

//Array contains all the trivia questions with the options and the answer for each level / destination for the player to answer
const triviaQandA = [

    //level 1
    [
        {
            question: "What is Florida's nickname?", 
            options:["The Sunshine State", "The Evergreen State", "The Peach State","The Lone Star State"],
            answer: "The Sunshine State"
        },
        {
            question: "Which city is known for its magical theme parks, including Walt Disney World and Universal Studios?", 
            options: ["Miami", "Tampa", "Orlando", "Jacksonville"],
            answer: "Orlando"
        },
        {
            question: "What famous ecosystem is found in southern Florida, characterized by slow-moving rivers and swamps?", 
            options:[ "The Rocky Mountains", "The Grand Canyon", "The Great Barrier Reef", "The Everglades"],
            answer: "The Everglades"
        },
        {
            question: "Which ocean borders Florida to the east?", 
            options:[ "Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
            answer: "Atlantic Ocean"
        },
        {
            question: "What is the capital city of Florida?", 
            options: ["Miami", "Tallahassee", "Orlando", "Tampa"],
            answer: "Tallahassee"
        },
        {
            question: "Which famous space launch center is located in Florida?", 
            options:[ "Kennedy Space Center",  "Cape Canaveral Air Force Station", "Houston Space Center", "SpaceX Launchpad"],
            answer: "Kennedy Space Center"
        },
        {
            question: "Which river, the longest in Florida, flows southward through the state and is known for its slow flow and dark tannic water?", 
            options: ["St. Johns River", "Suwannee River", "Apalachicola River", "Withlacoochee River"],
            answer: "St. Johns River"
        },
        {
            question: "Which major sports event takes place annually in Daytona Beach, attracting racing enthusiasts from around the world?", 
            options: ["Super Bowl", "Daytona 500", "The Masters", "World Series"],
            answer: "Daytona 500"
        },
        {
            question: "What is the official state marine mammal of Florida?", 
            options: ["Manatee", "Dolphin", "Sea Turtle", "Whale Shark"],
            answer: "Manatee"
        },
        {
            question: "Which Florida city is known for its Cuban influence, colorful art scene, and historic cigar factories?", 
            options:["Tampa", "Key West", "Miami", "St. Augustine"],
            answer: "Miami"
        }
    ],
    //level 2
    [
        {
            question: "What is the capital city of Jamaica?", 
            options:["Kingston", "Montego Bay", "Ocho Rios", "Port Royal"],
            answer: "Kingston"
        },
        {
            question: "Which reggae legend is often referred to as the 'King of Reggae' and hails from Jamaica?", 
            options: ["Jimmy Cliff", "Toots Hibbert", "Bob Marley", "Damian Marley"],
            answer: "Bob Marley"
        },
        {
            question: "Which Caribbean country comprises a group of islands called the ABC Islands, including Aruba, Bonaire, and Curaçao?", 
            options:["The Bahamas", "Antigua and Barbuda", "Trinidad and Tobago", "Kingdom of the Netherlands"],
            answer: "Kingdom of the Netherlands"
        },
        {
            question: "Which famous Jamaican sprinter is widely considered the fastest man in the world?", 
            options:["Asafa Powell", "Usain Bolt", "Yohan Blake", "Shelly-Ann Fraser-Pryce"],
            answer: "Usain Bolt"
        },
        {
            question: "What is the currency used in Jamaica?", 
            options: ["Dollar", "Peso", "Lira", "Euro"],
            answer: "Dollar"
        },
        {
            question: "Which famous pirate had a stronghold in the Caribbean during the Golden Age of Piracy and operated around the Bahamas and Florida?", 
            options:["Blackbeard", "Captain Kidd", "Anne Bonny", "Calico Jack"],
            answer: "Blackbeard"
        },
        {
            question: "What is the name of the famous coral reef system in the Caribbean, known for its rich marine biodiversity?", 
            options: ["The Great Barrier Reef", "The Red Sea Coral Reef", "The Caribbean Coral Reef", "The Belize Barrier Reef"],
            answer: "The Belize Barrier Reef"
        },
        {
            question: "Which famous waterfall is a major tourist attraction in Jamaica, known for its terraced limestone steps?", 
            options: ["Dunn's River Falls", "YS Falls", "Mayfield Falls", "Reach Falls"],
            answer: "Dunn's River Falls"
        },
        {
            question: "Jamaica is the birthplace of which popular sport and music combination?", 
            options: ["Cricket and Calypso", "Soccer and Samba", "Baseball and Merengue", "Reggae and Cricket"],
            answer: "Reggae and Cricket"
        },
        {
            question: "Which Caribbean island is known for its stunning Pitons, twin volcanic peaks that rise dramatically from the sea?", 
            options:["Saint Kitts and Nevis", "Saint Lucia", "Dominica", "Saint Vincent and the Grenadines"],
            answer: "Saint Lucia"
        }
    ],
    //level 3
    [
        {
            question: "Which of the following countries is NOT located in North Africa?", 
            options:["Egypt", "Nigeria", "Morocco", "Algeria"],
            answer: "Nigeria"
        },
        {
            question: "Which sea is adjacent to the Barbary Coast?", 
            options: ["Caribbean Sea'", "Mediterranean Sea", "Arabian Sea", "South China Sea"],
            answer: "Mediterranean Sea"
        },
        {
            question: "What is the largest desert in North Africa?", 
            options:[ "Gobi Desert", "Sahara Desert", "Arabian Desert", "Kalahari Desert"],
            answer: "Sahara Desert"
        },
        {
            question: "Which river is one of the longest in the world and flows through North Africa?", 
            options:[ "Nile River", "Amazon River", "Mississippi River", "Yangtze River"],
            answer: "Nile River"
        },
        {
            question: "Which city on the Barbary Coast was a notorious pirate stronghold during the 17th century?", 
            options: ["Algiers", "Tripoli", "Tunis", "Casablanca"],
            answer: "Algiers"
        },
        {
            question: "What is the capital city of Morocco?", 
            options:["Algiers", "Rabat", "Casablanca", "Cairo"],
            answer: "Rabat"
        },
        {
            question: "Which mountain range runs across the northwest of Africa, including parts of Morocco, Algeria, and Tunisia?", 
            options: ["Himalayas", "Andes", "Atlas Mountains", "Rockies"],
            answer: "Atlas Mountains"
        },
        {
            question: "In which North African country is the historic city of Alexandria located?", 
            options: ["Egypt", "Libya", "Sudan", "Algeria"],
            answer: "Egypt"
        },
        {
            question: "What is the predominant religion in North Africa?", 
            options: ["Buddhism", "Christianity", "Hinduism", "Islams"],
            answer: "Islam"
        },
        {
            question: "Which ancient Egyptian structure is a massive stone structure with the head of a human and the body of a lion?", 
            options:["Sphinx", "Obelisk", "Pyramid of Giza", "Temple of Karnak"],
            answer: "Sphinx"
        }
    ],
    //level 4
    [
        {
            question: "Which East African country is known as the 'Land of a Thousand Hills'?", 
            options:["Kenya", "Rwanda", "Tanzania", "Uganda"],
            answer: "Rwanda"
        },
        {
            question: "What is the highest mountain in Africa, located in East Africa?", 
            options: ["Mount Kilimanjaro", "Mount Kenya", "Mount Elgon", "Mount Rwenzori"],
            answer: "Mount Kilimanjaro"
        },
        {
            question: "What is the capital city of Mauritius?", 
            options:[ "Port Louis", "Victoria", "Saint-Denis", "Mahebourg"],
            answer: "Port Louis"
        },
        {
            question: "Which ocean surrounds Mauritius?", 
            options:[ "Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Southern Ocean"],
            answer: " Indian Ocean"
        },
        {
            question: "Mauritius is known for its stunning coral reefs. What is the famous underwater waterfall illusion near the coast of Mauritius caused by?", 
            options: ["Tidal movements", "Volcanic activity", "Magnetic fields", "Optical illusion"],
            answer: "Optical illusion"
        },
        {
            question: "Which extinct flightless bird, once native to Mauritius, became a symbol of extinction and conservation efforts?", 
            options:[ "Dodo", "Kiwi", "Emu", "Cassowary"],
            answer: "Dodo"
        },
        {
            question: "Which language is commonly spoken in Mauritius?", 
            options: ["French", "English", "Creole", "Spanish"],
            answer: "Creole"
        },
        {
            question: "Which spice, often associated with Mauritius, is derived from the dried berries of a tree native to the island?", 
            options: ["Cinnamon", "Nutmeg", "Cloves", "Cardamom"],
            answer: "Cloves"
        },
        {
            question: "Mauritius is known for its multi-cultural population. What religious festival is celebrated with grandeur and colorful processions on the island?", 
            options: ["Diwali","Eid al-Fitr", "Holi", "Christmas"],
            answer: "Diwali"
        },
        {
            question: "Mauritius is home to a diverse marine life. What is the name of the endangered species of dolphins commonly found in the waters around Mauritius?", 
            options:["Bottlenose Dolphin", "Spinner Dolphin", "Humpback Dolphin", "Irrawaddy Dolphin"],
            answer: "Spinner Dolphin"
        }
    ],
    //level 5
    [
        {
            question: "What is the capital city of Vietnam?", 
            options:["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue"],
            answer: "Hanoi"
        },
        {
            question: "What is the longest river in Vietnam?", 
            options: ["Mekong River", "Red River", "Cuu Long River", "Perfume River"],
            answer: "Red River"
        },
        {
            question: "What is the traditional Vietnamese dress, often worn on special occasions, including Tet (Lunar New Year)?", 
            options:[ "Kimono", "Ao Dai", "Cheongsam", "Sarong"],
            answer: "Ao Dai"
        },
        {
            question: "In Vietnamese folklore, what mythical creature is believed to reside in the waters of the Gulf of Tonkin?", 
            options:[ "Dragon", "Phoenix", "Turtle", "Unicorn"],
            answer: "Dragon"
        },
        {
            question: "The Gulf of Tonkin is part of which larger body of water?", 
            options: ["South China Sea", "Gulf of Thailand", "East China Sea", "Philippine Sea"],
            answer: "South China Sea"
        },
        {
            question: "Which city on the Gulf of Tonkin is known for its colonial architecture, vibrant street markets, and as the gateway to Ha Long Bay?", 
            options:[ "Hai Phong", "Da Nang", "Hanoi", "Hue"],
            answer: "Hai Phong"
        },
        {
            question: "Which two countries surround the Gulf of Tonkin?", 
            options: ["Vietnam and Thailand", "Vietnam and China", "Vietnam and Malaysia", "Vietnam and Cambodia"],
            answer: "Vietnam and China"
        },
        {
            question: "Which Vietnamese island in the Gulf of Tonkin is known for its stunning landscapes, including beautiful beaches and limestone formations?", 
            options: ["Phu Quoc", "Cat Ba", "Con Dao", "Cham Island"],
            answer: "Cat Ba"
        },
        {
            question: "Which Gulf of Tonkin island is known for its pristine beaches, coral reefs, and is a popular destination for snorkeling and diving?", 
            options: ["Phu Quoc", "Con Dao", "Cat Ba", "Cham Island"],
            answer: "Cham Island"
        },
        {
            question: "The Gulf of Tonkin is known for its strategic importance in international trade. Which major trading route passes through this gulf?", 
            options:["Silk Road", "Maritime Silk Road", "Trans-Siberian Railway", "Spice Route"],
            answer: "Maritime Silk Road"
        }
    ],
    // level 6
    [
        {
            question: "What is the capital city of Indonesia?", 
            options:["Jakarta", "Bali", "Surabaya", "Bandung"],
            answer: "Jakarta"
        },
        {
            question: "Indonesia is the largest archipelago in the world. How many islands does it approximately consist of?", 
            options: ["5,000", "10,000", "15,000", "20,000"],
            answer: "10,000"
        },
        {
            question: "What is the name of the active volcano in Indonesia that erupted in 2018 causing a tsunami?", 
            options:[ "Mount Merapi", "Mount Rinjani", "Mount Agung", "Mount Krakatoa"],
            answer: "Mount Krakatoa"
        },
        {
            question: "Which ocean borders Indonesia to the north?", 
            options:[ "Indian Ocean", "Pacific Ocean", "Arctic Ocean", "Southern Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "What is the famous Komodo National Park known for?", 
            options: ["Ancient Temples", "Unique Wildlife", "Beautiful Beaches", "Volcanic Craters"],
            answer: "Unique Wildlife"
        },
        {
            question: "What is the currency of Indonesia?", 
            options:[ "Baht", "Rupiah", "Ringgit", "Dong"],
            answer: "Rupiah"
        },
        {
            question: "In which Indonesian island is the famous tourist destination of Bali located?", 
            options: ["Java", "Sumatra", "Bali", "Sulawesi"],
            answer: "Bali"
        },
        {
            question: "Which Indonesian island is famous for its indigenous Komodo dragons?", 
            options: ["Flores", "Java", "Sulawesi", "Komodo"],
            answer: "Flores"
        },
        {
            question: "Which strait separates the Indonesian islands of Java and Borneo?", 
            options: ["Sunda Strait", "Bali Strait", "Lombok Strait", "Karimata Strait"],
            answer: "Karimata Strait"
        },
        {
            question: "Which of the following is a famous Indonesian island known for its traditional Toraja architecture and unique funeral rituals?", 
            options:["Sumatra", "Sulawesi", "Borneo", "Papua"],
            answer: "Sulawesi"
        }
    ],
    //level 7
    [
        {
            question: "In which country is the Panama Canal located?", 
            options:["Colombia", "Panama", "Costa Rica", "Nicaragua"],
            answer: "Panama"
        },
        {
            question: "Which ocean does the Panama Canal primarily connect?", 
            options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Southern Ocean"],
            answer: "Atlantic Ocean"
        },
        {
            question: "What is the artificial lake created by the Gatun Dam in the Panama Canal called?", 
            options:[ "Lake Panama", "Gatun Lake", "Miraflores Lake", "Culebra Lake"],
            answer: "Gatun Lake"
        },
        {
            question: "What is the name of the narrow strip of land that the Panama Canal traverses?", 
            options:[ "Darien Gap", "Isthmus of Panama", "Panama Passage", "Culebra Cut"],
            answer: "Isthmus of Panama"
        },
        {
            question: "What is the name of the highest point in the Panama Canal that ships pass through on their transit?", 
            options: ["Culebra Cut", "Balboa Summit", "Gatun Summit", "Pedro Miguel Lock"],
            answer: "Gatun Summit"
        },
        {
            question: "What is the approximate length of the Panama Canal in miles?", 
            options:[ "30 miles", "45 miles", "50 miles", "75 miles"],
            answer: "45 miles"
        },
        {
            question: "What is the name of the Pacific entrance to the Panama Canal?", 
            options: ["Balboa Harbor", "Miraflores Locks", "Pacific Gateway", "Punta Pacifica"],
            answer: "Balboa Harbor"
        },
        {
            question: "What is the name of the artificial channel that connects Gatun Lake to the Pacific Ocean in the Panama Canal?", 
            options: ["Gaillard Cut", "Culebra Cut", "Pedro Miguel Channel", "Balboa Channel"],
            answer: "Gaillard Cut"
        },
        {
            question: "Which river is dammed to create Gatun Lake in the Panama Canal?", 
            options: ["Chagres River", "Tuira River", "Santa Maria River", "Bayano River"],
            answer: "Chagres River"
        },
        {
            question: "What is the approximate time it takes for a vessel to traverse the entire Panama Canal from the Atlantic to the Pacific?", 
            options:["8 hours", "12 hours", "24 hours", "48 hours"],
            answer: "12 hours"
        }
    ]
];

// an array containing the crew members that the player will earn and use throughout the game
const crewArr = [
    ["Red-Eyed Scarlet", "First-Mate"],
    ["Silverbeard", "Quartermaster"],
    ["Sharktooth Morgan", "Boatswain"],
    ["Pegleg Charlie", "Navigator"],
    ["Wind Walker Grace", "Gunner"]
];

//an array of the weapons that the player will be rewarded and use throughout the game
const weaponsArr = [
    ["Cutlass", 10],
    ["Rapier", 15],
    ["Dagger", 20],
    ["War Hammer", 25],
    ["Boarding Pike", 30]
];