class Pirates {
    constructor(name, crew, position){
        this.name = name;
        this.crew = crew
        this.position = position;
        this.health = 100;
    }

    getName(){
        return this.name;
    }

    getCrew(){
        return this.crew;
    }

    getHealth(){
        return this.health;
    }

}

class Captain extends Pirates{
    constructor(name, crew, position){
        super(name, crew, position)
        this.doubloons = 0;
        this.crewMembers = [];
        this.weapon = [["Fist", 5]];
    }

    getDoubloons(){
        return this.doubloons;
    }
}

function introduction(){

    let introSection = document.getElementById("intro");

    introSection.style.backgroundColor = "white";

    let introText = document.createElement("p");

    introSection.appendChild(introText);
    introText.setAttribute("id", "intro-text");


    introText.innerHTML = "<p>Yo-ho, matey! Welcome to the treacherous seas of the Pirate Adventure Trivia Game! <br><br> Embark on a daring voyage full of swashbuckling exploits, hidden treasures, and perilous encounters. As the captain of your own ship, you'll navigate through mysterious islands and engage in fierce naval battles by answering trivia questions along the way.<br><br> Prepare to make crucial decisions that will shape your pirate legacy. Will you play and be a legendary captain known throughout the seas, or quit now and stay ashore?</p>";

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

            startGame(captainName, crewName, nameSection);

        });
    });

}

function startGame(captainName1, crewName1, startSection){

    let startText = document.createElement("p");
    startText.setAttribute("id", "intro-text");
    startSection.appendChild(startText);

    startText.innerHTML = `Avast, Captain ${captainName1}! The ship awaits, and the horizon beckons.<br><br>Instructions:<br><br>You will be traveling to 7 destinations where you will battle bad pirates. For each battle you will answer 10 trivia questions and if you get 4 questions wrong, you will lose the battle. At the end of each battle you will have the chance to win doubloons (money), a new crew member and/or a weapon depending on the number of answers you got correct.<br><br>You will also gain help throughout the adventure, whether it is from your crew members or a new weapon.<br><br> Adventure awaits! (You can quit anytime during the game)`

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

            playGame(captainName1, crewName1)
        }
        else if(continueChoice === "no-dontStart"){
            startText.remove();
            startButtons.remove();
            endGame("beginning");
        }
    });
    
}

function playGame(captainName3, crewName2){

    let playerCaptain = new Captain(`Captain ${captainName3}`, crewName2, "Captain");

    // let quitGame = false;
    // let results = [];

    destination(playerCaptain, 1, "Florida Keys", ["Vanguard", "Shadow Serpents", "Captain"]);

}

function destination(captain, level, destination, badPirateArr){

    let badPirate = new Pirates(badPirateArr[0], badPirateArr[1], badPirateArr[2])

    let infoSection = document.getElementById("player-info");
    infoSection.classList.remove("hidden");

    let inventorySection = document.getElementById("weapon-inventory");
    inventorySection.classList.remove("hidden");

    let mainSection = document.getElementById("main-text");
    mainSection.classList.remove("hidden")

    let insertCaptainName = document.getElementById("name");
    let insertCrewName = document.getElementById("crew-name");
    let insertDoubloons = document.getElementById("money");
    let insertHealth = document.getElementById("health");
    let stopButton = document.getElementById("quit");
    stopButton.style.backgroundColor = "#FF7F7F";

    insertCaptainName.innerHTML = `${captain.name}`;
    insertCrewName.innerHTML = `${captain.crew}`;
    insertDoubloons.innerHTML = `${captain.doubloons}`;
    insertHealth.innerHTML = `${captain.health}`;

    let levelNumber = document.getElementById("level-number");
    let destinationLocation = document.getElementById("destination");
    destinationLocation.style.fontWeight = "normal"

    levelNumber.innerHTML = level;
    destinationLocation.innerHTML = destination;

    let continueDestination = document.getElementById("destination-text");
    
    let destinationText = document.createElement("p");
    destinationText.style.backgroundColor = "white";
    destinationText.innerHTML = `Land ho, Captain ${captain.name}! Yer ship docks at the first destination, The ${destination}. The mysterious island awaits with secrets to unveil and treasures to be discovered.`

    let destinationButton = document.createElement("input");
    destinationButton.setAttribute("id", "destination1");
    destinationButton.setAttribute("type", "button");
    destinationButton.setAttribute("value", `Explore the ${destination}`);
    destinationButton.style.backgroundColor = "#90EE90";

    continueDestination.appendChild(destinationText);
    continueDestination.appendChild(destinationButton);

    destinationButton.addEventListener("click", function(event) {
        event.preventDefault();
        let continueEvent = event.target;

        if(continueEvent.tagName !== "INPUT" || continueEvent.getAttribute("type") !== "button"){
            return;
        }

        destinationButton.remove();

        destinationText.innerHTML = `Shiver me timbers, Captain ${captain.name}! As ye step ashore, a shadowy figure emerges from the shadows a fearsome pirate, infamous for ruthless deeds on land and sea ${badPirate.position} ${badPirate.name}.`
        
        let continueButton = document.createElement("input");
        continueButton.setAttribute("id", "continue1");
        continueButton.setAttribute("type", "button");
        continueButton.setAttribute("value", "Continue to Trivia");
        continueButton.style.backgroundColor = "#90EE90";

        continueDestination.appendChild(continueButton);

        continueButton.addEventListener("click", function(event) {
            event.preventDefault();
            let continueEvent = event.target;
    
            if(continueEvent.tagName !== "INPUT" || continueEvent.getAttribute("type") !== "button"){
                return;
            }
    
            destinationText.remove();
            destinationButton.remove();
    
            continueDestination.setAttribute("class", "hidden");

            triviaGame(captain, badPirate, level, destination);

            return;
            
        });

        return;

    });
}

function triviaGame(captain1, badPirate1, level1, destination1){

    let levelNumber1 = document.getElementById("level-number");
    let destinationLocation1 = document.getElementById("destination");
    destinationLocation1.style.fontWeight = "normal"

    levelNumber1.innerHTML = level1;
    destinationLocation1.innerHTML = destination1;

    let triviaScreen = document.getElementById("trivia-text");

    triviaScreen.classList.remove("hidden");

    let playerNameTrivia = document.getElementById("player-name");
    let playerhealthTrivia = document.getElementById("player-health");
    let playerweaponTrivia = document.getElementById("weapon");
    let opponentNameTrivia = document.getElementById("opponent-name");
    let opponentHealthTrivia = document.getElementById("opponent-health");

    playerNameTrivia.innerHTML = `${captain1.name} `;
    playerhealthTrivia.innerHTML = `${captain1.health}`;
    playerweaponTrivia.innerHTML = `${captain1.weapon[captain1.weapon.length - 1][0]}`;
    opponentNameTrivia.innerHTML = `${badPirate1.name} `;
    opponentHealthTrivia.innerHTML = `${badPirate1.health}`;

    let triviaQandA = [
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
            question: "Which ocean borders Florida to the east", 
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
            question: "Which popular tourist destination in Florida is known for its vibrant nightlife, art deco architecture, and beautiful beaches?", 
            options: ["Key West", "Miami Beach", "Fort Lauderdale", "Sarasota"],
            answer: "Miami Beach"
        },
        {
            question: "Which major sports event takes place annually in Daytona Beach, attracting racing enthusiasts from around the world?", 
            options: ["Super Bowl", "Daytona 500", "The Masters", "World Series"],
            answer: "Daytona 500"
        },
        {
            question: "What is the name of the iconic swamp-dwelling, reptilian creature often associated with Florida folklore?", 
            options: ["Bigfoot", "Chupacabra", "Mothman", "Skunk Ape"],
            answer: "Skunk Ape"
        },
        {
            question: "Which Florida city is known for its Cuban influence, colorful art scene, and historic cigar factories?", 
            options:["Tampa", "Key West", "Miami", "St. Augustine"],
            answer: "Miami"
        }
    ];

    let startCorrect = 0;
    let answered = true;
    let startQuestionNum = 0

    newQuestion(triviaQandA, startCorrect, startQuestionNum)

}

function newQuestion(triviaQandAArr, correct, questionNum){


    let questionNumber = document.getElementById("question-number");
    questionNumber.innerHTML = `${questionNum+1} / 10`;

    let triviaQuestion = document.getElementById("trivia-question");
    triviaQuestion.innerHTML = `${triviaQandAArr[questionNum].question}`

    let answerButtons = document.getElementById("answer-buttons");

    let optionASubmit = document.createElement("input");
    optionASubmit.setAttribute("type", "button");
    optionASubmit.setAttribute("value", `${triviaQandAArr[questionNum].options[0]}`);
    optionASubmit.setAttribute("id", "optionA");
    answerButtons.appendChild(optionASubmit);

    let optionBSubmit = document.createElement("input");
    optionBSubmit.setAttribute("type", "button");
    optionBSubmit.setAttribute("value", `${triviaQandAArr[questionNum].options[1]}`);
    optionBSubmit.setAttribute("id", "optionB");
    answerButtons.appendChild(optionBSubmit);

    let optionCSubmit = document.createElement("input");
    optionCSubmit.setAttribute("type", "button");
    optionCSubmit.setAttribute("value", `${triviaQandAArr[questionNum].options[2]}`);
    optionCSubmit.setAttribute("id", "optionC");
    answerButtons.appendChild(optionCSubmit);

    let optionDSubmit = document.createElement("input");
    optionDSubmit.setAttribute("type", "button");
    optionDSubmit.setAttribute("value", `${triviaQandAArr[questionNum].options[3]}`);
    optionDSubmit.setAttribute("id", "optionD");
    answerButtons.appendChild(optionDSubmit);

    answerButtons.addEventListener("click", function(event){

        event.preventDefault();
        event.stopPropagation();
        let answerEvent = event.target;

        let answerChoice = answerEvent.getAttribute("value");

        correct = checkAnswer(answerChoice, triviaQandAArr[questionNum].answer, correct, questionNum, triviaQandAArr);

        return correct;
    });
}

function checkAnswer(playerAnswer, correctAnswer, numCorrect, triviaQandANum, triviaArr){

    if(playerAnswer === correctAnswer){
        console.log("Correct");
        numCorrect++;
    }
    else{
        console.log("Wrong");
    };

    triviaQandANum = triviaQandANum + 1;

    if (triviaQandANum < 10){
        newQuestion(triviaArr[triviaQandANum])
    }
    else{
        return;
    }

}

// function createTriviaQuestion(triviaObject, num, numCorrect){

//     let questionNumber = document.getElementById("question-number");
//     questionNumber.innerHTML = `${num+1}`;

//     let triviaQuestion = document.getElementById("trivia-question");
//     triviaQuestion.innerHTML = `${triviaObject.question}`

//     let answerButtons = document.getElementById("answer-buttons");

//     let optionASubmit = document.createElement("input");
//     optionASubmit.setAttribute("type", "button");
//     optionASubmit.setAttribute("value", `${triviaObject.options.a}`);
//     optionASubmit.setAttribute("id", "optionA");
//     answerButtons.appendChild(optionASubmit);

//     let optionBSubmit = document.createElement("input");
//     optionBSubmit.setAttribute("type", "button");
//     optionBSubmit.setAttribute("value", `${triviaObject.options.b}`);
//     optionBSubmit.setAttribute("id", "optionB");
//     answerButtons.appendChild(optionBSubmit);

//     let optionCSubmit = document.createElement("input");
//     optionCSubmit.setAttribute("type", "button");
//     optionCSubmit.setAttribute("value", `${triviaObject.options.c}`);
//     optionCSubmit.setAttribute("id", "optionC");
//     answerButtons.appendChild(optionCSubmit);

//     let optionDSubmit = document.createElement("input");
//     optionDSubmit.setAttribute("type", "button");
//     optionDSubmit.setAttribute("value", `${triviaObject.options.d}`);
//     optionDSubmit.setAttribute("id", "optionD");
//     answerButtons.appendChild(optionDSubmit);

//     answerButtons.addEventListener("click", function(event){

//         event.preventDefault();
//         event.stopPropagation();
//         let answerEvent = event.target;

//         let answerChoice = answerEvent.getAttribute("value");

//         if(answerChoice === triviaObject.answer){
//             numCorrect = numCorrect + 1;
//         }

//         triviaQuestion.remove();
//         answerButtons.remove();

//         return;
//     });

//     return [numCorrect, true];
// }

function endGame(keyWord, yourName = ""){

    let endSection = document.getElementById("intro");

    endSection.style.backgroundColor = "white";

    let endText = document.createElement("p");

    endSection.appendChild(endText);
    endText.setAttribute("id", "intro-text");

    if(keyWord === "beginning"){

        endText.innerHTML = "Fair winds and calm seas, matey! <br><br>If ye choose to remain ashore and let the allure of the open ocean pass ye by, fear not. Not every soul be destined for the high seas, and the Pirate Adventure Trivia Game shall patiently await the day when ye hear the siren call of adventure.<br><br>Should ye ever decide to unfurl the sails and seek fortune on the boundless sea, the Pirate Adventure Trivia Game will be ready to welcome ye aboard.<br><br>Farewell, landlubber!"
    }
    else if(keyWord === "During"){

        endText.innerHTML = `Fair winds, Captain ${yourName}! As ye choose to part ways with the open sea, know that the Pirate Adventure Trivia Game remains a tale of what could have been. May yer future endeavors be as prosperous as the horizon we left behind.<br><br>Should ye ever feel the call of the ocean, remember the tales of yer time on the high seas. Until then, may yer compass guide ye ashore.<br><br>Thank ye for venturing into the Pirate Adventure Trivia Game!`
    }

    let endButton = document.createElement("div");

    endSection.appendChild(endButton);
    endButton.setAttribute("class", "intro-button");

    let backButton = document.createElement("input");
    backButton.setAttribute("id", "back");
    backButton.setAttribute("type", "button");
    backButton.setAttribute("value", "Back to the Beginning");

    backButton.style.backgroundColor = "#90EE90";

    endButton.appendChild(backButton);

    endButton.addEventListener("click", function(event) {
        event.preventDefault();
        let endGame = event.target;

        if(endGame.tagName !== "INPUT"){
            return;
        }

        endText.remove();
        endButton.remove();

        introduction();
    })

};

introduction()

// const crewArr = [
//     ["Red-Eyed Scarlet", "First-Mate"],
//     ["Silverbeard", "Quartermaster"],
//     ["Sharktooth Morgan", "Boatswain"],
//     ["Pegleg Charlie", "Navigator"],
//     ["Wind Walker Grace", "Gunner"],
//     ["Doctor Iron Bones", "Doctor"]
// ];

// const weaponsArr = [
//     ["Fist", 0],
//     ["Cutlass", 0],
//     ["Rapier", 0],
//     ["Dagger", 0],
//     ["War Hammer", 0],
//     ["Boarding Pike", 0]
// ];

// const opponentArr = [
//     ["Captain Vanguard", "Shadow Serpents", "Captain"],
//     ["Buccaneer Nell", "Black Tide Buccaneers", "Boatswain"],
//     ["Blackheart Brutus", "Thunderstrike Raiders", "Navigator"],

//     [["Ironjaw Grimsby", "Stormborn Marauders", "Boatswain"], ["Shadowblade Killian", "Stormborn Marauders", "First Mate"]],
//     [["Darkwater Mortimer", "Crossbones Syndicate", "Quartermaster"], ["Deathwind Harrow", "Crossbones Syndicate", "Gunner"]],
//     [["Direclaw Riven", "Ironheart Privateers", "First Mate"], ["Wrathbringer Argyle", "Ironheart Privateers", "Navigator"]],

//     [["Vilethorn Crag", "Sable Phantom Fleet", "Quatermaster"], ["Grimshade Blackthorn", "Sable Phantom Fleet", "Gunner"], ["Sablebane Morgana", "Sable Phantom Fleet", "Captain"]]

// ];