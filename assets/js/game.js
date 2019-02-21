$(document)
.ready(function () {

var characterList = [
  {
    name: "Obi Wan Kenobi",
    health: 120,
    attack: 8,
    counter: 15,
    dfltAttak: 8,
    pic: "assets/images/obi-wan-kenobi.jpg"
  },
  {
    name: "Luke Skywalker",
    health: 100,
    attack: 15,
    counter: 25,
    dfltAttak: 15,
    pic: "assets/images/Luke-Skywalker.jpg"
  },
  {
    name: "Darth Vader",
    health: 150,
    attack: 12,
    counter: 15,
    dfltAttak: 12,
    pic: "assets/images/Darth-Vader.jpeg"
  },
  {
    name: "Darth Maul",
    health: 180,
    attack: 14,
    counter: 18,
    dfltAttak: 14,
    pic: "assets/images/Darth-Maul.jpeg"
  }
];

var gameRoster = [];
var player = {};
var computer = {};
var playerPicked = false;
var computerPicked = false;
var intervalId;
var gameRunning = false;


//starts new game as well as resets parameters to default settings
function newGame() {
  gameRoster = [...characterList]; //spread operator. basically copying the characterList array
  console.log(characterList);
  player = {};
  computer = {};
  gameRunning = true;
  playerPicked = false;
  computerPicked = false;
  $("#character-grid").hide();
  clearInterval(intervalId);
  intervalId = setInterval(15000);
  printCharacters(gameRoster);
}

function printCharacters(characterArray) {
  $("#character-list").empty();

  if(characterArray.length === 0) {
    $("#character-list").text("There are no characters left."); 
    return false;
  }

  characterArray
  //for each index in this array run this function
  .forEach(function (characterInfo, i) {

    var character = $("<div class='character'>");
    character
      .css({
        "background-image": "url(" + characterInfo.pic + ")"
      })
      .attr({"data-id": i});

    var charStats = $("<div>");
    charStats
      .addClass("character-stats")
      //template literals using ``
      .html(`<h4>${characterInfo.name}</h4>HP: ${characterInfo.health} <br/>Attack: ${characterInfo.attack}<br/>Counter: ${characterInfo.counter}`)
      .appendTo(character);

    $("#character-list").append(character)
  });
}

function activePlayer(playerInfo, playerPosition, playerStats, playerTitle) {
  $(playerPosition).css({
    "background-image": "url(" + playerInfo.pic + ")"
  });

  $(playerStats)
    .html(`<h4>${playerInfo.name} - ${playerTitle}</h4>HP: ${playerInfo.health} <br/>Attack: ${playerInfo.attack} <br/>Counter: ${playerInfo.counter}`)
    .removeClass("defender");
  }

$(document)
.on("click", ".character", function() {
  var playerId = $(this).attr("data-id");

  if (!playerPicked && gameRunning) {
    playerPicked = true;
    player = {
      ...gameRoster[playerId] //use spread to set the player
    };
    $("#character-grid").show();
    gameRoster.splice(playerId, 1);
    printCharacters(gameRoster);
    activePlayer(player, "#player", "#player-stats", "Attacker");
  }
  else if (!computerPicked && gameRunning) {
    computerPicked = true;
    computer = {
       ...gameRoster[playerId]
    };
    gameRoster.splice(playerId, 1);
    printCharacters(gameRoster);
    activePlayer(computer, "#computer", "#computer-stats", "Defender");
  }
  else {
    alert("Both players are currently active.");
  }
});

function attack() {
    computer.health -= player.attack;
    player.attack += player.dfltAttak;

    if (computer.health <= 0) {
      computerPicked = false;
      $("#computer-stats")
        .html(`<h3>DEFEATED</h3><h4>${computer.name} - Defender<h4>HP: ${computer.health} <br/>Attack: ${computer.attack} <br/>Counter: ${computer.counter}`)
        .addClass("defeated");

        if (gameRoster.length === 0) {
          clearInterval(IntervalId);
          gameRunning = false;
          alert("You win! To begin a new game press Start!");
        }
        return false;
      }

      player.health -= computer.counter;

      $("#player-stats").html(`<h4>${player.name} - Attacker<h4>HP: ${player.health} <br/>Attack: ${player.attack} <br/>Counter: ${player.counter}`);
      
      $("#computer-stats").html(`</h3><h4>${computer.name} - Defender<h4>HP: ${computer.health} <br/>Attack: ${computer.attack} <br/>Counter: ${computer.counter}`);
        
      if (player.health <= 0) {
        playerPicked = false;
        computerPicked = false;
        $("#player-stats")
          .html(`<h3>DEFEATED</h3><h4>${player.name} - Defender<h4>HP: ${player.health} <br/>Attack: ${player.attack} <br/>Counter: ${player.counter}`)
          .addClass("defeated");

          clearInterval(intervalId);
          $("#quote").text("You have lost! To begin a new game press Start!");
      }
  }  

$("#new-game").on("click", newGame);

$("#attack").on("click", function() {
  if (playerPicked && computerPicked && gameRunning) {
    attack();
  }
  else {
    alert("Select a player to continue");
  }  
});







newGame();
});