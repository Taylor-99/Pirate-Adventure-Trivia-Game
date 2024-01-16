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


    introText.innerHTML = "<p>Yo-ho, matey! Welcome to the treacherous seas of the Pirate Adventure Trivia Game! <br><br> Embark on a daring voyage full of swashbuckling exploits, hidden treasures, and perilous encounters. As the captain of your own ship, you'll navigate through mysterious islands and engage in fierce naval 	battles.<br><br> Prepare to make crucial decisions that will shape your pirate legacy. Will you play and be a legendary captain known throughout the seas, or quit now and stay on land?</p>";

    let introButtons = document.createElement("div");

    introSection.appendChild(introButtons);
    introButtons.setAttribute("class", "intro-button");

    let playButton = document.createElement("button");
    playButton.textContent = "Let's Go";
    playButton.setAttribute("id", "yes-play");

    let quitButton = document.createElement("button");
    quitButton.textContent = "Stay on Land";
    quitButton.setAttribute("id", "no-quit");

    introButtons.appendChild(playButton);
    introButtons.appendChild(quitButton);

    introButtons.addEventListener("click", function(event) {
        event.preventDefault();
        let playOption = event.target;

        if(playOption.tagName !== "BUTTON"){
            return;
        }

        console.log(playOption);

        let playChoice = playOption.getAttribute("id");

        if(playChoice === "yes-play"){
            console.log("They want to play");
        }
        else if(playChoice === "no-quit"){
            introText.remove();
            introButtons.remove();
            endGame("beginning");
        }
    })
};

function endGame(keyWord){

    let endSection = document.getElementById("intro");

    endSection.style.backgroundColor = "white";

    let endText = document.createElement("p");

    endSection.appendChild(endText);
    endText.setAttribute("id", "intro-text");

    if(keyWord === "beginning"){

        endText.innerHTML = "Fair winds and calm seas, matey! <br><br>If ye choose to remain ashore and let the allure of the open ocean pass ye by, fear not. Not every soul be destined for the high seas, and the Pirate Adventure Trivia Game shall patiently await the day when ye hear the siren call of adventure.<br><br>As the sun sets on the horizon, the tales of daring exploits and hidden treasures will drift across the waves, enticing others to follow the path of the buccaneer.<br><br>Should ye ever decide to unfurl the sails and seek fortune on the boundless sea, the Pirate Adventure Trivia Game will be ready to welcome ye aboard.<br><br>Until then, may the shores be kind to ye and the stars above tell stories of what could have been.<br><br>Farewell, landlubber!"

        console.log("worked")
    }

}

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

// let captainName = "";
// let crewName = "";

// let captain = new Captain(captainName, crewName, "Captain");