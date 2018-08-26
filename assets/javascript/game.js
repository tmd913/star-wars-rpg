// star wars rpg

// game object 
/*  
    lightCharacterArray
    darkCharacterArray
    currentLightCharacter
    currentDarkCharacter
    multiplier
    currentAttack
    gameOver
    methods:
        changeCharacter(id)
*/

// character object 
/*
    name
    imageSrc
    imageAlt
    hp
    baseAttack
    counter
*/

const lightNames = ["Luke Skywalker", "Obi Wan Kenobi", "Yoda"];
const darkNames = ["Darth Maul", "Darth Sidious", "Darth Vader"];

const lightImgSrcs = ["./assets/images/luke.png", "./assets/images/obi.png", "./assets/images/yoda.png"];
const darkImgSrcs = ["./assets/images/maul.png", "./assets/images/sidious.png", "./assets/images/vader.png"];

const lightImgAlts = ["luke", "obi", "yoda"];
const darkImgAlts = ["maul", "sidious", "vader"];

const lightImgWidths = ["120px", "160px", "300px"];
const darkImgWidths = ["160px", "300px", "300px"];

const lightHPs = [120, 140, 170];
const darkHPs = [130, 150, 180];

const lightBaseAttacks = [12, 10, 8];
const darkBaseAttacks = [11, 9, 7];

const lightCounters = [14, 16, 20];
const darkCounters = [13, 15, 21];

let lightCharacterArray = [];
let darkCharacterArray = [];

function createCharacterArrays() {
    for (let i = 0; i < lightNames.length; i++) {
        lightCharacterArray[i] = {
            name: lightNames[i],
            imgSrc: lightImgSrcs[i],
            imgAlt: lightImgAlts[i],
            imgWidth: lightImgWidths[i],
            hp: lightHPs[i],
            baseAttack: lightBaseAttacks[i],
            counter: lightCounters[i]
        };

        darkCharacterArray[i] = {
            name: darkNames[i],
            imgSrc: darkImgSrcs[i],
            imgAlt: darkImgAlts[i],
            imgWidth: darkImgWidths[i],
            hp: darkHPs[i],
            baseAttack: darkBaseAttacks[i],
            counter: darkCounters[i],
        };
    }
}

function Game() {
    this.lightCharacterArray = lightCharacterArray;
    this.darkCharacterArray = darkCharacterArray;
    this.currentLightCharacter = "";
    this.currentDarkCharacter = "";
    this.multiplier = 1;
    this.currentAttack = 0;
    this.isLight = false;
    this.isDark = false;
    this.opponentsFaced = 0;
    this.gameOver = false;
    this.changeCharacter = function (id) {
        switch (id) {
            case "luke-container":
                this.currentLightCharacter = lightCharacterArray[0];
                if (this.currentAttack === 0) {
                    this.currentAttack = this.currentLightCharacter.baseAttack;
                }
                this.changeLightCharacterDisplay(id);
                $("#luke-container").addClass("display-none");
                break;

            case "obi-container":
                this.currentLightCharacter = lightCharacterArray[1];
                if (this.currentAttack === 0) {
                    this.currentAttack = this.currentLightCharacter.baseAttack;
                }
                this.changeLightCharacterDisplay(id);
                $("#obi-container").addClass("display-none");
                break;

            case "yoda-container":
                this.currentLightCharacter = lightCharacterArray[2];
                if (this.currentAttack === 0) {
                    this.currentAttack = this.currentLightCharacter.baseAttack;
                }
                this.changeLightCharacterDisplay(id);
                $("#yoda-container").addClass("display-none");
                break;

            case "maul-container":
                this.currentDarkCharacter = darkCharacterArray[0];
                if (this.currentAttack === 0) {
                    this.currentAttack = this.currentDarkCharacter.baseAttack;
                }
                this.changeDarkCharacterDisplay(id);
                $("#maul-container").addClass("display-none");
                break;

            case "sidious-container":
                this.currentDarkCharacter = darkCharacterArray[1];
                if (this.currentAttack === 0) {
                    this.currentAttack = this.currentDarkCharacter.baseAttack;
                }
                this.changeDarkCharacterDisplay(id);
                $("#sidious-container").addClass("display-none");
                break;

            case "vader-container":
                this.currentDarkCharacter = darkCharacterArray[2];
                if (this.currentAttack === 0) {
                    this.currentAttack = this.currentDarkCharacter.baseAttack;
                }
                this.changeDarkCharacterDisplay(id);
                $("#vader-container").addClass("display-none");
                break;
        }
    };
    this.changeLightCharacterDisplay = function (id) {
        $(".current-character-container.light > .character-name").text(this.currentLightCharacter.name);
        $("#light-hp-display").text(this.currentLightCharacter.hp);
        $(".current-character-container.light > img").attr("src", this.currentLightCharacter.imgSrc);
        $(".current-character-container.light > img").css("alt", this.currentLightCharacter.imgAlt);
        $(".current-character-container.light > img").css("width", this.currentLightCharacter.imgWidth);
        $(".current-character-container.light").removeClass("display-none");
        if (this.isLight) {
            $("#light-side-characters").addClass("display-none");
            $("#dark-side-characters").removeClass("display-none");
            $("#message").text("Choose your opponent");
        } else {
            let containerID = document.getElementById(id);
            $(containerID).addClass("display-none");
            $("#message").text("");
        }

        $("#attack-container").removeClass("display-none");
    };
    this.changeDarkCharacterDisplay = function (id) {
        $(".current-character-container.dark > .character-name").text(this.currentDarkCharacter.name);
        $("#dark-hp-display").text(this.currentDarkCharacter.hp);
        $(".current-character-container.dark > img").attr("src", this.currentDarkCharacter.imgSrc);
        $(".current-character-container.dark > img").css("alt", this.currentDarkCharacter.imgAlt);
        $(".current-character-container.dark > img").css("width", this.currentDarkCharacter.imgWidth);
        $(".current-character-container.dark").removeClass("display-none");
        if (this.isDark) {
            $("#dark-side-characters").addClass("display-none");
            $("#light-side-characters").removeClass("display-none");
            $("#message").text("Choose your opponent");
        } else {
            let containerID = document.getElementById(id);
            $(containerID).addClass("display-none");
            $("#message").text("");
        }

        $("#attack-container").removeClass("display-none");
    };
    this.attackOpponent = function () {
        if (this.isLight) {
            $("#message").text("You attacked " + this.currentDarkCharacter.name + " for " + this.currentAttack + " HP and received " + this.currentDarkCharacter.counter + " HP in damage.");
            $(".current-character-container.dark > .character-damage").text("-" + this.currentAttack);
            setTimeout(function () {
                $(".current-character-container.dark > .character-damage").text("");
            }, 1000);
            this.currentDarkCharacter.hp -= this.currentAttack;
            if (this.currentDarkCharacter.hp > 0) {
                $(".current-character-container.light > .character-damage").text("-" + this.currentDarkCharacter.counter);
                setTimeout(function () {
                    $(".current-character-container.light > .character-damage").text("");
                }, 1000);
                this.currentLightCharacter.hp -= this.currentDarkCharacter.counter;
            }
            this.multiplier++;
            this.currentAttack = this.currentLightCharacter.baseAttack * this.multiplier;
            if (this.currentDarkCharacter.hp <= 0) {
                $(".current-character-container.dark").addClass("display-none");
                $("#message").text("You defeated " + this.currentDarkCharacter.name + "! Choose your next opponent");
                this.currentDarkCharacter = "";
                this.opponentsFaced++;
            } else if (this.currentLightCharacter.hp <= 0) {
                $(".current-character-container.light").addClass("display-none");
                this.currentLightCharacter = "";
                this.gameOver = true;
            }
        } else {
            $("#message").text("You attacked " + this.currentLightCharacter.name + " for " + this.currentAttack + " HP and received " + this.currentLightCharacter.counter + " HP in damage.");
            $(".current-character-container.light > .character-damage").text("-" + this.currentAttack);
            setTimeout(function () {
                $(".current-character-container.light > .character-damage").text("");
            }, 1000);
            this.currentLightCharacter.hp -= this.currentAttack;
            if (this.currentDarkCharacter.hp > 0) {
                $(".current-character-container.dark > .character-damage").text("-" + this.currentLightCharacter.counter);
                setTimeout(function () {
                    $(".current-character-container.dark > .character-damage").text("");
                }, 1000);
                this.currentDarkCharacter.hp -= this.currentLightCharacter.counter;
            }
            this.multiplier++;
            this.currentAttack = this.currentDarkCharacter.baseAttack * this.multiplier;
            if (this.currentLightCharacter.hp <= 0) {
                $(".current-character-container.light").addClass("display-none");
                $("#message").text("You defeated " + this.currentLightCharacter.name + "! Choose your next opponent");
                this.currentLightCharacter = "";
                this.opponentsFaced++;
            } else if (this.currentDarkCharacter.hp <= 0) {
                $(".current-character-container.dark").addClass("display-none");
                this.currentDarkCharacter = "";
                this.gameOver = true;
            }
        }

        $("#light-hp-display").text(this.currentLightCharacter.hp);
        $("#dark-hp-display").text(this.currentDarkCharacter.hp);

        if (this.opponentsFaced === 3 || this.gameOver) {
            this.endGame();
        }
    };
    this.newGame = function () {
        this.currentLightCharacter = "";
        this.currentDarkCharacter = "";
        this.multiplier = 1;
        this.currentAttack = 0;
        this.isLight = false;
        this.isDark = false;
        this.opponentsFaced = 0;
        this.gameOver = false;
    }
    this.endGame = function () {
        if (this.isLight) {
            if (this.gameOver) {
                $("#message").text("You were defeated by the Dark Side...");
            } else {
                $("#message").text("You defeated the Dark Side!");
            }
        } else {
            if (this.gameOver) {
                $("#message").text("You were defeated by the Light Side...");
            } else {
                $("#message").text("You defeated the Light Side!");
            }
        }
    };
}

createCharacterArrays();
let currentGame = new Game();

$("#light-header").on("click", function () {
    if (!currentGame.isLight && !currentGame.isDark) {
        $("#light-side-characters").removeClass("display-none");
        $("#message").text("Choose your character");
        currentGame.isLight = true;
    }
});

$("#dark-header").on("click", function () {
    if (!currentGame.isLight && !currentGame.isDark) {
        $("#dark-side-characters").removeClass("display-none");
        $("#message").text("Choose your character");
        currentGame.isDark = true;
    }
});

$(".character-container").on("click", function (event) {
    console.log(event.currentTarget.id);
    if ((currentGame.isLight && currentGame.currentDarkCharacter === "") || (currentGame.isDark && currentGame.currentLightCharacter === "")) {
        currentGame.changeCharacter(event.currentTarget.id);
    }
});

$("#attack-container").on("click", function () {
    if (currentGame.currentLightCharacter !== "" && currentGame.currentDarkCharacter !== "") {
        currentGame.attackOpponent();
    }
})

// function changeCharacter(id) {
//     // switch (id) {
//     //     case "luke-container"
//     // }
//     if (id === "luke-container") {
//         $(".current-character-container.light > .character-name").text("Luke Skywalker");
//         $(".current-character-container.light > .character-hp").text("HP: 120");
//         $(".current-character-container.light > img").attr("src", "./assets/images/luke.png");
//         $(".current-character-container.light > img").css("width", "120px");
//         $(".current-character-container.light").removeClass("display-none");
//         $("#dark-side-characters").removeClass("display-none");
//         $("#light-side-characters").addClass("display-none");
//         $("#message").text("Choose your opponent");
//     }
// }