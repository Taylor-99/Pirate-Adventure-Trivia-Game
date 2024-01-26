
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
}

//class to create the bad pirates throughout the game
class BadPirates extends Pirates{
    constructor(name, crew, position, meetingText){
        super(name, crew, position)
        this.meetingText = meetingText;
    }

    //used during the game to let the trivia battles get a lot harder 
    powerUp(currentHealth, piratePosition){

        //the last bad pirate they will battle will be the captain, so they get 100
        if(piratePosition === "Captain"){
            currentHealth = currentHealth + 100;

            return currentHealth
        }
        else{
            // any other pirate will get a random number for their power up
            randomPowerUp = Math.floor(Math.random() * (75 - 25) + 25)

            currentHealth = currentHealth + randomPowerUp;

            return currentHealth
        }
    }


}

function introduction(){

    let introSection = document.getElementById("intro");

    introSection.style.backgroundColor = "white";

    let introText = document.createElement("p");

    introSection.appendChild(introText);
    introText.setAttribute("id", "intro-text");


    introText.innerHTML = "<p>Yo-ho, matey! Welcome to the treacherous seas of the Pirate Adventure Trivia Game! <br><br> Embark on a daring voyage full of swashbuckling exploits, hidden treasures, and perilous encounters. As the captain of your own ship, you'll navigate through mysterious islands and engage in fierce battles by answering trivia questions along the way.<br><br> Prepare to make crucial decisions that will shape your pirate legacy. Will you play and be a legendary captain known throughout the seas, or quit now and stay ashore?</p>";

    let introButtons = document.createElement("div");

    introSection.appendChild(introButtons);
    introButtons.setAttribute("class", "intro-button");

    let playButton = document.createElement("input");
    playButton.setAttribute("id", "yes-play");
    playButton.setAttribute("type", "button");
    playButton.setAttribute("value", "Prepare to sail into the unknown!");

    playButton.style.backgroundColor = "#90EE90";

    let quitButton = document.createElement("input");
    quitButton.setAttribute("id", "no-quit");
    quitButton.setAttribute("type", "button");
    quitButton.setAttribute("value", "I'll stay ashore for now.");

    quitButton.style.backgroundColor = "#FF7F7F";

    introButtons.appendChild(playButton);
    introButtons.appendChild(quitButton);

    introButtons.addEventListener("click", function(event) {
        event.preventDefault();
        let playOption = event.target;

        if(playOption.tagName !== "INPUT"){
            return;
        }

        let playChoice = playOption.getAttribute("id");

        if(playChoice === "yes-play"){
            introText.remove();
            introButtons.remove();
            getNames(introSection);
        }
        else if(playChoice === "no-quit"){
            introText.remove();
            introButtons.remove();
            endGame("beginning");
        }
    })
};

function getNames(nameSection){

    let nameText = document.createElement("p");

    nameSection.appendChild(nameText);
    nameText.setAttribute("id", "intro-text");

    nameText.innerHTML = "Welcome aboard, matey! <br><br>As captain,ye shall navigate treacherous waters, face legendary battles, and uncover untold riches.<br><br>But wait, what shall we call you matey?"

    let inputName = document.createElement("div");

    nameSection.appendChild(inputName);
    inputName.setAttribute("id", "get-info");

    let nameInputLabel = document.createElement("label");
    nameInputLabel.setAttribute("for", "name");
    nameInputLabel.innerHTML = "Captain";
    inputName.appendChild(nameInputLabel);

    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.setAttribute("id", "captain-name");
    inputName.appendChild(nameInput);

    let nameSubmit = document.createElement("input");
    nameSubmit.setAttribute("type", "button");
    nameSubmit.setAttribute("value", "Submit");
    nameSubmit.setAttribute("id", "submit-name");
    inputName.appendChild(nameSubmit);

    nameSubmit.style.backgroundColor = "#90EE90";

    let captainName = "";

    nameSubmit.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        let gotName = event.target;

        if(gotName.tagName !== "INPUT" || gotName.getAttribute("type") !== "button"){
            return;
        }

        captainName = nameInput.value;
        nameInput.remove();
        nameSubmit.remove();

        nameText.innerHTML = `Ahoy Captain ${captainName}, What is the name of yer noble crew as ye sail the open seas and seek treasures untold on this grand adventure?`

        nameInputLabel.setAttribute("for", "name");
        nameInputLabel.innerHTML = "Crew Name: ";

        let crewNameInput = document.createElement("input");
        crewNameInput.setAttribute("type", "text");
        crewNameInput.setAttribute("placeholder", "Crew Name");
        crewNameInput.setAttribute("id", "crew-name");
        inputName.appendChild(crewNameInput);

        let crewNameSubmit = document.createElement("input");
        crewNameSubmit.setAttribute("type", "button");
        crewNameSubmit.setAttribute("value", "Submit");
        crewNameSubmit.setAttribute("id", "submit-name");
        inputName.appendChild(crewNameSubmit);
   
        crewNameSubmit.style.backgroundColor = "#90EE90";

        let crewName = "";

        crewNameSubmit.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            let gotCrewName = event.target;

            if(gotCrewName.tagName !== "INPUT" || gotCrewName.getAttribute("type") !== "button"){
                return;
            }

            crewName = crewNameInput.value;

            nameText.remove();
            inputName.remove();

            let inputNames = [captainName, crewName]

            startGame(inputNames, nameSection);

        });
    });

}

function startGame(playerNames, startSection){

    let startText = document.createElement("p");
    startText.setAttribute("id", "intro-text");
    startSection.appendChild(startText);

    startText.innerHTML = `Avast, Captain ${playerNames[0]}! The ship awaits, and the horizon beckons.<br><br>Instructions:<br><br>You will be traveling to 7 destinations where you will battle bad pirates. For each battle you will answer 10 trivia questions and if you get 4 questions wrong, you will lose the battle. At the end of each battle you will have the chance to win doubloons (money), a new crew member and/or a weapon depending on the number of answers you got correct.<br><br>You will also gain help throughout the adventure, whether it is from your crew members or a new weapon.<br><br> Adventure awaits! (You can quit anytime during the game)`

    let startButtons = document.createElement("div");

    startSection.appendChild(startButtons);
    startButtons.setAttribute("id", "get-info");

    let startButton = document.createElement("input");
    startButton.setAttribute("id", "yes-start");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("value", "Hoist the Jolly Roger and set sail!");

    startButton.style.backgroundColor = "#90EE90";

    let dontStartButton = document.createElement("input");
    dontStartButton.setAttribute("id", "no-dontStart");
    dontStartButton.setAttribute("type", "button");
    dontStartButton.setAttribute("value", "Plant me flag on land");

    dontStartButton.style.backgroundColor = "#FF7F7F";

    startButtons.appendChild(startButton);
    startButtons.appendChild(dontStartButton);

    startButtons.addEventListener("click", function(event) {
        event.preventDefault();
        let continueOption = event.target;

        if(continueOption.tagName !== "INPUT"){
            return;
        }

        let continueChoice = continueOption.getAttribute("id");

        if(continueChoice === "yes-start"){
            startText.remove();
            startButtons.remove();

            let playerCaptain = new Captain(`Captain ${playerNames[0]}`, playerNames[1], "Captain");

            destination(playerCaptain, 1, 0);
        }
        else if(continueChoice === "no-dontStart"){
            startText.remove();
            startButtons.remove();
            endGame("beginning");
        }
    });
    
}

function destination(captain, level, arrayNum){

    let badPirate = new Pirates(opponentArr[arrayNum][0], opponentArr[arrayNum][1], opponentArr[arrayNum][2], opponentArr[arrayNum][3]);

    let infoSection = document.getElementById("player-info");
    infoSection.classList.remove("hidden");

    let mainSection = document.getElementById("main-text");
    mainSection.classList.remove("hidden");

    let  memberSection = document.getElementById("member-inventory");
    memberSection.classList.remove("hidden");

    let inventorySection = document.getElementById("weapon-inventory");
    inventorySection.classList.remove("hidden");

    let insertCaptainName = document.getElementById("name");
    let insertCrewName = document.getElementById("crew-name");
    let insertDoubloons = document.getElementById("money");
    let insertHealth = document.getElementById("health");

    insertCaptainName.innerHTML = `${captain.name}`;
    insertCrewName.innerHTML = `${captain.crew}`;
    insertDoubloons.innerHTML = `${captain.doubloons}`;
    insertHealth.innerHTML = `${captain.health}`;

    let levelNumber = document.getElementById("level-number");
    let destinationLocation = document.getElementById("destination");
    destinationLocation.style.fontWeight = "normal"

    levelNumber.innerHTML = level;
    destinationLocation.innerHTML = destinations[arrayNum].island;

    let continueDestination = document.getElementById("destination-info");
    
    let destinationText = document.getElementById("destination-text");
    destinationText.innerHTML = `Land ho, ${captain.name}! ${destinations[arrayNum].text}`

    let destinationButton = document.getElementById("currentDestination");
    destinationButton.setAttribute("value", `Explore the ${destinations[arrayNum].island}`);
    destinationButton.style.backgroundColor = "#90EE90";

    function continueToNextDestination(event){
        event.preventDefault();
        event.stopPropagation();
        let continueEvent = event.target;

        if(continueEvent.tagName !== "INPUT" || continueEvent.getAttribute("type") !== "button"){
            return;
        }

        destinationButton.removeEventListener("click", continueToNextDestination)
        destinationButton.replaceChildren();

        destinationText.innerHTML = `Shiver me timbers, ${captain.name}! ${opponentArr[arrayNum][3]} <br><br> Continue on to the trivia game to battle it out`
        
        let continueButton = document.getElementById("currentDestination");
        continueButton.setAttribute("value", "Continue to Trivia");
        continueButton.style.backgroundColor = "#90EE90";

        function continueToTrivia(newEvent){
            newEvent.preventDefault();
            newEvent.stopPropagation();
            let continueEvent = newEvent.target;
    
            if(continueEvent.tagName !== "INPUT" || continueEvent.getAttribute("type") !== "button"){
                return;
            }

            continueButton.removeEventListener("click", continueToTrivia);
            let continue1Choice = continueEvent.getAttribute("id");

            if(continue1Choice === "currentDestination"){
                destinationText.replaceChildren();
                destinationButton.replaceChildren();
        
                continueDestination.classList.add("hidden");

                triviaGame(captain, badPirate, level, destinations[arrayNum].island, arrayNum);
            }
        }

        continueButton.addEventListener("click", continueToTrivia);
    }

    destinationButton.addEventListener("click", continueToNextDestination);
}

function triviaGame(playingCaptain, playingBadPirate, startingLevel, currentDestination, arrayNum1){

    let levelNumber1 = document.getElementById("level-number");
    let destinationLocation1 = document.getElementById("destination");
    destinationLocation1.style.fontWeight = "normal"

    levelNumber1.innerHTML = startingLevel;
    destinationLocation1.innerHTML = currentDestination;

    let triviaScreen = document.getElementById("trivia-text");

    console.log("trivia text screen visable")
    triviaScreen.classList.remove("hidden");

    let playerNameTrivia = document.getElementById("player-name");
    let playerhealthTrivia = document.getElementById("player-health");
    let playerweaponTrivia = document.getElementById("weapon");
    let opponentNameTrivia = document.getElementById("opponent-name");
    let opponentHealthTrivia = document.getElementById("opponent-health");

    playerNameTrivia.innerHTML = `${playingCaptain.name} `;
    playerhealthTrivia.innerHTML = `${playingCaptain.health}`;
    playerweaponTrivia.innerHTML = `${playingCaptain.weapon[playingCaptain.weapon.length - 1][0]} `;
    opponentNameTrivia.innerHTML = `${playingBadPirate.name} `;
    opponentHealthTrivia.innerHTML = `${playingBadPirate.health}`;

    let startCorrect = 0;
    let startQuestionNum = 1;
    let startWrong = 0;

    newQuestion(triviaQandA[arrayNum1], startCorrect, startQuestionNum, startWrong, startingLevel, playingCaptain, playingBadPirate, arrayNum1)

}

function newQuestion(triviaQandAArr, numCorrect, questionNum, numWrong, currentLevel, currentCaptain, currentBadPirate, arrayNum2){

    console.log(triviaQandAArr[questionNum - 1])
    let questionNumber = document.getElementById("question-number");
    questionNumber.innerHTML = `${questionNum} / 10`;

    let triviaQuestion = document.getElementById("trivia-question");
    triviaQuestion.innerHTML = `${triviaQandAArr[questionNum-1].question}`

    let answerButtons = document.getElementById("answer-buttons");

    let optionASubmit = document.createElement("input");
    optionASubmit.setAttribute("type", "button");
    optionASubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[0]}`);
    optionASubmit.setAttribute("id", "optionA");
    answerButtons.appendChild(optionASubmit);

    let optionBSubmit = document.createElement("input");
    optionBSubmit.setAttribute("type", "button");
    optionBSubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[1]}`);
    optionBSubmit.setAttribute("id", "optionB");
    answerButtons.appendChild(optionBSubmit);

    let optionCSubmit = document.createElement("input");
    optionCSubmit.setAttribute("type", "button");
    optionCSubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[2]}`);
    optionCSubmit.setAttribute("id", "optionC");
    answerButtons.appendChild(optionCSubmit);

    let optionDSubmit = document.createElement("input");
    optionDSubmit.setAttribute("type", "button");
    optionDSubmit.setAttribute("value", `${triviaQandAArr[questionNum-1].options[3]}`);
    optionDSubmit.setAttribute("id", "optionD");
    answerButtons.appendChild(optionDSubmit);

    function getAnswer(event){
        event.preventDefault();
        event.stopPropagation();
        let answerEvent = event.target;

        if(answerEvent.tagName !== "INPUT" || answerEvent.getAttribute("type") !== "button"){
            return;
        }

        let answerChoice = answerEvent.getAttribute("value");

        checkAnswer(answerChoice, triviaQandAArr[questionNum-1].answer, numCorrect, numWrong, questionNum, triviaQandAArr, answerButtons, currentLevel, getAnswer, currentCaptain, currentBadPirate, arrayNum2);
    }

    answerButtons.addEventListener("click", getAnswer);
}
// https://www.altcademy.com/blog/how-to-make-a-quiz-in-javascript/

function checkAnswer(playerAnswer, correctAnswer, correct, wrong, triviaQandANum, triviaArr, aButtons, continueLevel, answerFunction, changeCaptain, changeBadPirate, arrayNum3){

    console.log("choice " + playerAnswer);
    console.log("answer " + correctAnswer);

    let triviaTextScreen = document.getElementById("trivia-text");
    triviaTextScreen.classList.remove("hidden");

    if(playerAnswer === correctAnswer){
        correct++;
        changeBadPirate.health = changeBadPirate.health - (changeCaptain.weapon[changeCaptain.weapon.length -1][1]);
        let changeBadPirateHealth = document.getElementById("opponent-health");
        changeBadPirateHealth.innerHTML = `${changeBadPirate.health}`;

        function correctResultsScreen(){

            if(continueLevel >= 3 && changeBadPirateHealth.health < 20){

                changeBadPirate.health = changeBadPirate.powerUp(changeBadPirate.health, changeBadPirate.position)

                aButtons.replaceChildren();
                let resultScreenCorrect = document.getElementById("trivia-question");
                resultScreenCorrect.innerHTML = `Correct<br><br>${changeBadPirate.name} took a hit<br><br> Oh No!!!, ${changeBadPirate.name}, having mended their wounds and replenished their stores, stands ready for another skirmish.<br><br>Ye be facing a resilient adversary, Captain. Prepare yer crew and weapons, for the battle ahead promises to be even more intense.`;
            }
            else{
                aButtons.replaceChildren();
                let resultScreenCorrect = document.getElementById("trivia-question");
                resultScreenCorrect.innerHTML = `Correct<br><br>${changeBadPirate.name} took a hit`;
            }
        
            let nextButton = document.createElement("input");
            nextButton.setAttribute("type", "button");
            nextButton.setAttribute("value", `Next Question`);
            aButtons.appendChild(nextButton);
            nextButton.style.backgroundColor = "#90EE90";
        
            nextButton.addEventListener("click", function(event){

                event.preventDefault();
                event.stopPropagation();

                if(event.target.tagName !== "INPUT" || event.target.getAttribute("type") !== "button"){
                    return;
                }

                triviaQandANum = triviaQandANum + 1;
                console.log(triviaQandANum);
                
                if (triviaQandANum <= 10 && wrong !== 4 && changeCaptain.health > 20){
                    aButtons.replaceChildren();
                    aButtons.removeEventListener("click", answerFunction);
                    newQuestion(triviaArr, correct, triviaQandANum, wrong, continueLevel, changeCaptain, changeBadPirate, arrayNum3);
                }
                else if(triviaQandANum === 11){
                    aButtons.replaceChildren();
                    aButtons.removeEventListener("click", answerFunction);
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                else if(wrong === 4){
                    aButtons.replaceChildren();
                    aButtons.removeEventListener("click", answerFunction);
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                if(changeCaptain.health <= 20){
                    endGame("poor health", changeCaptain.name);
                }
                
            });
        }
        correctResultsScreen()
    }
    else{
        wrong++;
        console.log(wrong)
        changeCaptain.health = changeCaptain.health - 10;
        let changeCaptainHealth = document.getElementById("player-health");
        changeCaptainHealth.innerHTML = `${changeCaptain.health}`;

        function wrongResultsScreen(){

            aButtons.replaceChildren();
            let resultScreenWrong = document.getElementById("trivia-question");
            resultScreenWrong.innerHTML = `Incorrect<br><br>You took a hit`;
        
            let nextButton = document.createElement("input");
            nextButton.setAttribute("type", "button");
            nextButton.setAttribute("value", `Next Question`);
            aButtons.appendChild(nextButton);
            nextButton.style.backgroundColor = "#90EE90";
        
            nextButton.addEventListener("click", function(event){

                event.preventDefault();
                event.stopPropagation();

                if(event.target.tagName !== "INPUT" || event.target.getAttribute("type") !== "button"){
                    return;
                }

                triviaQandANum = triviaQandANum + 1;

                if (triviaQandANum <= 10 && wrong !== 4 && changeCaptain.health > 20){
                    aButtons.replaceChildren();
                    aButtons.removeEventListener("click", answerFunction);
                    newQuestion(triviaArr, correct, triviaQandANum, wrong, continueLevel, changeCaptain, changeBadPirate, arrayNum3);
                }
                else if(triviaQandANum === 11){
                    aButtons.replaceChildren();
                    aButtons.removeEventListener("click", answerFunction);
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                else if(wrong === 4){
                    aButtons.replaceChildren();
                    aButtons.removeEventListener("click", answerFunction);
                    triviaEndScreen(wrong, continueLevel, changeCaptain, arrayNum3)
                }
                if(changeCaptain.health <= 20){
                    endGame("poor health", changeCaptain.name);
                }
                
            });
        
        }
        wrongResultsScreen()
    };
}
// https://www.altcademy.com/blog/how-to-make-a-quiz-in-javascript/

function triviaEndScreen(wrongCount, changeLevel, keepCaptain, arrayNum4){

    let rewardScreen = document.getElementById("trivia-question");
    let nextDestinationButtons = document.getElementById("answer-buttons");
    // rewardScreen.style.fontSize = "20px"

    let nextDestinationButton = document.createElement("input");
    nextDestinationButton.setAttribute("type", "button");
    nextDestinationButton.setAttribute("value", `Forward, to Next Destination`);
    nextDestinationButton.setAttribute("id", `continue-destination`); 
    nextDestinationButtons.appendChild(nextDestinationButton);
    nextDestinationButton.style.backgroundColor = "#90EE90";

    let endJourneyButton = document.createElement("input");
    endJourneyButton.setAttribute("type", "button");
    endJourneyButton.setAttribute("value", `End Journey Here`);
    endJourneyButton.setAttribute("id", `end-here`);
    nextDestinationButtons.appendChild(endJourneyButton);
    endJourneyButton.style.backgroundColor = "#FF7F7F";

    if(changeLevel < 6){

        let rewardDoubloons = getDoubloons(changeLevel);
        let newMember = crewArr[arrayNum4];
        let newCrewMember = new Pirates(newMember[0], keepCaptain.crew, newMember[1])

        if(wrongCount === 0){

            keepCaptain.weapon.push(weaponsArr[arrayNum4])
            keepCaptain.crewMembers.push(newCrewMember);
            keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

            rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the rewards be plenty for a pirate of yer caliber:<br>**Doubloons Gained:** ${rewardDoubloons}<br>**New Crew Member:** ${newCrewMember.name}<br>**Weapon Acquired:** ${weaponsArr[arrayNum4][0]}<br><br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`

            let memberList = document.getElementById("member-list");
            let newMember = document.createElement("li");
            newMember.innerHTML = `&nbsp;${newCrewMember.position}, ${newCrewMember.name}`
            memberList.appendChild(newMember);

            let weaponList = document.getElementById("weapon-list");
            let newWeapon = document.createElement("li");
            newWeapon.innerHTML = `&nbsp;${weaponsArr[arrayNum4][0]}`
            weaponList.appendChild(newWeapon);

        }
        else if(wrongCount === 1 || wrongCount === 2){

            keepCaptain.crewMembers.push(newCrewMember);
            keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

            rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the rewards be plenty for a pirate of yer caliber:<br>**Doubloons Gained:** ${rewardDoubloons}<br>**New Crew Member:** ${newCrewMember.name}<br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`

            let memberList = document.getElementById("member-list");
            let newMember = document.createElement("li");
            newMember.innerHTML = `&nbsp;${newCrewMember.position}, ${newCrewMember.name}`
            memberList.appendChild(newMember);
        }
        else if(wrongCount === 3){

            keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

            rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the reward be plenty for a pirate of yer caliber:<br>**Doubloons Gained:** ${rewardDoubloons}<br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`
        }
        else if(wrongCount === 4){
            rewardScreen.innerHTML = `Ahoy, ${keepCaptain.name}!<br>Ye faced a formidable foe on the trivia battlefield, but alas, the pirate's cunning wit and knowledge prevailed. Despite yer valiant efforts, four questions slipped through like a ghostly ship in the night.<br><br>The battle be lost, and the pirate, with a wry grin, claims victory. Fear not, for every defeat be a step closer to victory. May the winds of wisdom favor ye in future battles,  ${keepCaptain.name}!`
        }

    }
    else{

        if(wrongCount === 4){
            rewardScreen.innerHTML = `Ahoy, ${keepCaptain.name}!<br>Ye faced a formidable foe on the trivia battlefield, but alas, the pirate's cunning wit and knowledge prevailed. Despite yer valiant efforts, four questions slipped through like a ghostly ship in the night.<br><br>The battle be lost, and the pirate, with a wry grin, claims victory. Fear not, for every defeat be a step closer to victory. May the winds of wisdom favor ye in future battles,  ${keepCaptain.name}!`
        }
        else{
        let rewardDoubloons = getDoubloons(changeLevel);

        keepCaptain.doubloons = keepCaptain.doubloons + rewardDoubloons

        rewardScreen.innerHTML = `Avast, ${keepCaptain.name}!<br>Ye have sailed the seas with cunning and courage, and the reward be plenty for a pirate of yer caliber:<br>**Doubloons Gained:** ${rewardDoubloons}<br>The sea be wide, and the horizon endless. Ye have proven yerself a true captain of the high seas. Onward to new horizons, Captain!`
        }
    }

    // creates the copy of 
    let copy = nextDestinationButtons.cloneNode(true);


    nextDestinationButtons.remove();
    copy.addEventListener("click", function(event){
        
        event.preventDefault();
        event.stopPropagation();
        
        if(event.target.tagName !== "INPUT" || event.target.getAttribute("type") !== "button"){
            return;
        }
        
        let continueOn = event.target.getAttribute("id");
        let hideTriviaSection = document.getElementById("trivia-text");
        let nextDestination = document.getElementById("destination-info")
        
        hideTriviaSection.classList.add("hidden");
        
        if (continueOn === "continue-destination"){
            rewardScreen.replaceChildren();
            copy.replaceChildren();
            nextDestination.classList.remove("hidden");
            changeLevel = changeLevel + 1;
            arrayNum4 = arrayNum4 + 1;
    
            destination(keepCaptain, changeLevel, arrayNum4);
        }
        else if(continueOn === "end-here"){
            endGame("during", keepCaptain.name);
        }
        
    });

    //appends the copy of the nextDestinationButtons container to the question container where the nextDestinationButton container is
    let container = document.querySelector("#question-container");
    container.append(copy)
}

//gives the player a random number of doubloons as rewards during the game so that they have enough to use the help after the first level.
function getDoubloons(useLevel){

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


function endGame(keyWord, yourName = ""){

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

    let endSection = document.getElementById("intro");

    endSection.style.backgroundColor = "white";

    let endText = document.createElement("p");

    endSection.appendChild(endText);
    endText.setAttribute("id", "intro-text");

    if(keyWord === "beginning"){

        endText.innerHTML = "Fair winds and calm seas, matey! <br><br>If ye choose to remain ashore and let the allure of the open ocean pass ye by, fear not. Not every soul be destined for the high seas, and the Pirate Adventure Trivia Game shall patiently await the day when ye hear the siren call of adventure.<br><br>Should ye ever decide to unfurl the sails and seek fortune on the boundless sea, the Pirate Adventure Trivia Game will be ready to welcome ye aboard.<br><br>Farewell, landlubber!"
    }
    else if(keyWord === "during"){

        endText.innerHTML = `Fair winds, ${yourName}! As ye choose to part ways with the open sea, know that the Pirate Adventure Trivia Game remains a tale of what could have been. May yer future endeavors be as prosperous as the horizon we left behind.<br><br>Should ye ever feel the call of the ocean, remember the tales of yer time on the high seas. Until then, may yer compass guide ye ashore.<br><br>Thank ye for venturing into the Pirate Adventure Trivia Game!`
    }
    else if(keyWord === "poor health"){
        endText.innerHTML = `Ahoy, ${yourName}!<br><br>Ye health be as fragile as glass, and the perils of the pirate life have taken their toll. The sea be a harsh mistress, and unfortunately, yer journey ends here.<br><br>Though the waves may have conquered ye, remember the adventures and the tales of the high seas. May the winds carry ye memories to Davy Jones' locker.<br><br>Fair winds and a kinder fate on yer next voyage!`
    }

};

introduction()

const destinations = [
    {
    island: "Florida Keys",
    text: `Yer ship docks at the first destination, The Florida Keys. The mysterious island awaits with secrets to unveil and treasures to be discovered.`
    },

    {
    island: "Port Royal",
    text: `The ship drops anchor at the second destination, Port Royal. The land holds new challenges, mysteries, and untold treasures. Brace yerself for the next chapter of the Pirate Adventure Trivia Game!<br><br>A doctor if you health gets too low (1000 doubloons), Be aware it does cost money`
    },

    {
    island: "Barbury Coast",
    text: `The ship graces the shores of the third destination, The Barbury Coast. The mysterious island awaits with secrets to unveil and treasures to be discovered.`
    },

    {
    island: "Mauritius",
    text: `The ship anchors at the fourth destination, Mauritius, a place where the seas whisper of both peril and plunder. Yer crew stands poised for the next chapter of the Pirate Adventure Trivia Game.`
    },

    {
    island: "Gulf of Tokin",
    text: `The ship drops anchor at the fifth destination, a place of both mystery and potential fortune. The crew awaits yer command as tales of legendary treasures and formidable challenges echo in the wind.`
    },

    {
    island: "Indonesia",
    text: `The ship arrives at the sixth destination, Indonesia, a place where the currents of fate converge. The crew, seasoned and ready, awaits yer next orders. Legends await as the Pirate Adventure Trivia Game unfolds further.`
    },

    {
    island: "Panama Canal",
    text: `The ship has reached the last destination, The Panama Canal marking the end of the Pirate Adventure Trivia Game. The crew stands ready, though you journey may not be complete, the tales of yer daring exploits will echo across the seas.`
    }
];

const opponentArr = [
    ["Vanguard", "Shadow Serpents", "Navigator", "As ye step ashore, a menacing pirate emerges, its Navigator Vanguard of the Shadow Serpents and he's demanding yer valuables."],
    
    ["Buccaneer Nell", "Black Tide Buccaneers", "Boatswain", "A rival pirate, Boatswain Buccaneer Nell of the Black Tide Buccaneers, challenges ye to a game of wits."],

    ["Blackheart Brutus", "Thunderstrike Raiders", "Gunner", "A notorious pirate, Gunner Blackheart Brutus of the Thunderstrick Raiders, known for ruthless deeds, approaches with ill intentions. What be yer move?"],

    ["Shadowblade Killian", "Stormborn Marauders", "Quartermaster", "A cunning pirate, QUartermaster Shadowblade Killian of the Stormborn Marauders, challenges ye to a game of chance and skill on the island. What be yer approach to this contest?"],

    ["Darkwater Mortimer", "Crossbones Syndicate", "First Mate", "A rogue pirate crew, known for their brutality, awaits ye on the island. How will ye handle this dire confrontation?"],

    ["Direclaw Riven", "Ironheart Privateers", "First Mate", "A notorious pirate, First Mate Direclaw Riven, challenges ye to a duel"],

    ["Sablebane Morgana", "Sable Phantom Fleet", "Captain", `As ye step ashore, a shadowy figure emerges from the shadows a fearsome pirate, infamous for ruthless deeds on land and sea Captain Sablebane Morgana of the Sable Phantom Fleet.`]
];

const triviaQandA = [
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

const crewArr = [
    ["Red-Eyed Scarlet", "First-Mate"],
    ["Silverbeard", "Quartermaster"],
    ["Sharktooth Morgan", "Boatswain"],
    ["Pegleg Charlie", "Navigator"],
    ["Wind Walker Grace", "Gunner"],
    ["Doctor Iron Bones", "Doctor"]
];

const weaponsArr = [
    ["Cutlass", 10],
    ["Rapier", 15],
    ["Dagger", 20],
    ["War Hammer", 25],
    ["Boarding Pike", 30]
];