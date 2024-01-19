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
        this.weapon = [["Fist", ]];
    }

    getDoubloons(){
        return this.doubloons;
    }
}

class YourPirates extends Pirates {
    constructor(name, crew, position){
        super(name, crew, position)
        this.weapon = weapon;
    }

    getWeapon(weapon){
        this.weapon = weapon;
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

        console.log(playOption);

        let playChoice = playOption.getAttribute("id");

        if(playChoice === "yes-play"){
            introText.remove();
            introButtons.remove();
            console.log("They want to play");
            getCaptainName();
        }
        else if(playChoice === "no-quit"){
            introText.remove();
            introButtons.remove();
            console.log("They quit")
            endGame("beginning");
        }
    })
};

function getCaptainName(){

    let nameSection = document.getElementById("intro");

    nameSection.style.backgroundColor = "white";

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

    inputName.addEventListener("click", function(event) {
        event.preventDefault();
        let gotName = event.target;

        if(gotName.tagName !== "INPUT" || gotName.getAttribute("type") !== "button"){
            return;
        }

        console.log(gotName);

        captainName = nameInput.value;
        console.log(captainName);

        nameText.remove();
        inputName.remove();

        getCrewName(captainName);
    });
}

function getCrewName(captainName1){

    let crewNameSection = document.getElementById("intro");

    crewNameSection.style.backgroundColor = "white";

    let crewNameText = document.createElement("p");
    crewNameText.setAttribute("id", "intro-text");
    crewNameSection.appendChild(crewNameText);

    crewNameText.innerHTML = `Ahoy Captain ${captainName1}, What is the name of yer noble crew as ye sail the open seas and seek treasures untold on this grand adventure?`

    let crewInputName = document.createElement("div");

    crewNameSection.appendChild(crewInputName);
    crewInputName.setAttribute("id", "get-info");

    let crewNameInputLabel = document.createElement("label");
    crewNameInputLabel.setAttribute("for", "name");
    crewNameInputLabel.innerHTML = "Crew Name: ";
    crewInputName.appendChild(crewNameInputLabel);

    let crewNameInput = document.createElement("input");
    crewNameInput.setAttribute("type", "text");
    crewNameInput.setAttribute("placeholder", "Crew Name");
    crewNameInput.setAttribute("id", "crew-name");
    crewInputName.appendChild(crewNameInput);

    let crewNameSubmit = document.createElement("input");
    crewNameSubmit.setAttribute("type", "button");
    crewNameSubmit.setAttribute("value", "Submit");
    crewNameSubmit.setAttribute("id", "submit-crew-name");
    crewInputName.appendChild(crewNameSubmit);

    crewNameSubmit.style.backgroundColor = "#90EE90";

    let crewName = crewNameInput.value;

    console.log(crewName);

    crewInputName.addEventListener("click", function(event) {
        event.preventDefault();
        let gotCrewName = event.target;

        if(gotCrewName.tagName !== "INPUT" || gotCrewName.getAttribute("type") !== "button"){
            return;
        }

        console.log(gotCrewName);

        crewName = crewNameInput.value;
        console.log(crewName);

        crewNameText.remove();
        crewInputName.remove();

        startGame(captainName1, crewName);

    });

}

function startGame(captainName2, crewName1){

    let startSection = document.getElementById("intro");

    startSection.style.backgroundColor = "white";

    let startText = document.createElement("p");
    startText.setAttribute("id", "intro-text");
    startSection.appendChild(startText);

    startText.innerHTML = `Avast, Captain ${captainName2}! The ship awaits, and the horizon beckons.<br><br>Instructions:<br><br>You will be traveling to 7 destinations where you will battle bad pirates. For each battle you will answer 10 trivia questions. At the end of each battle you will have the chance to win doubloons (money), a new crew member and/or a weapon depending on the number of answers you got correct.<br><br>You will also gain help throughout the adventure, whether it is from your crew members or a new weapon.<br><br> Adventure awaits! (You can quit anytime during the game)`

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

        console.log(continueOption);

        let continueChoice = continueOption.getAttribute("id");

        if(continueChoice === "yes-start"){
            startText.remove();
            startButtons.remove();
            console.log("They want to continue");

            playGame(captainName2, crewName1)
        }
        else if(continueChoice === "no-dontStart"){
            startText.remove();
            startButtons.remove();
            console.log("They stopped")
            endGame("beginning");
        }
    });
    
}

function playGame(captainName3, crewName2){

    let playerCaptain = new Captain(captainName3, crewName2, "Captain");

    let infoSection = document.getElementById("player-info");
    infoSection.classList.remove("hidden");

    // let inventorySection = document.getElementById("weapon-inventory");
    // inventorySection.classList.remove("hidden");

    // let interactSection = document.getElementById("interact");
    // interactSection.classList.remove("hidden");

    let mainSection = document.getElementById("main-text");
    mainSection.classList.remove("hidden")

    let insertCaptainName = document.getElementById("name");
    let insertCrewName = document.getElementById("crew-name");
    let insertDoubloons = document.getElementById("money");
    let insertHealth = document.getElementById("health");
    let stopButton = document.getElementById("quit");
    stopButton.style.backgroundColor = "#FF7F7F";

    insertCaptainName.innerHTML = `${playerCaptain.name}`;
    insertCrewName.innerHTML = `${playerCaptain.crew}`;
    insertDoubloons.innerHTML = `${playerCaptain.doubloons}`;
    insertHealth.innerHTML = `${playerCaptain.health}`;

    let destination1Text = document.getElementById("destination-text");
    destination1Text.style.backgroundColor = "white";
    destination1Text.innerHTML = `Land ho, Captain ${playerCaptain.name}! Yer crew cheers as the ship docks at the first destination, The Florida Keys. The mysterious island awaits with secrets to unveil and treasures to be discovered.`

    let destination1Button = document.createElement("input");
    destination1Button.setAttribute("id", "destination1");
    destination1Button.setAttribute("type", "button");
    destination1Button.setAttribute("value", "Explore the Florida Keys");

    destination1Button.after(destination1Text);

}

function endGame(keyWord, yourName = ""){

    let endSection = document.getElementById("intro");

    endSection.style.backgroundColor = "white";

    let endText = document.createElement("p");

    endSection.appendChild(endText);
    endText.setAttribute("id", "intro-text");

    if(keyWord === "beginning"){

        endText.innerHTML = "Fair winds and calm seas, matey! <br><br>If ye choose to remain ashore and let the allure of the open ocean pass ye by, fear not. Not every soul be destined for the high seas, and the Pirate Adventure Trivia Game shall patiently await the day when ye hear the siren call of adventure.<br><br>Should ye ever decide to unfurl the sails and seek fortune on the boundless sea, the Pirate Adventure Trivia Game will be ready to welcome ye aboard.<br><br>Farewell, landlubber!"

        console.log("End worked")
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

        console.log(endGame);

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