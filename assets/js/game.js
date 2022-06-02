

// console.log(enemyNames);
// console.log(enemyNames.length);
// console.log(enemyNames[0]);
// console.log(enemyNames[3]);

var fightOrSkip = function () {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" OR "SKIP" to choose.')
  
  if (promptFight === "" || promptFight === null) {
    window.alert('You need to provide a valid answer! Please try again.')
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();
  if (promptFight === 'skip') {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      playerInfo.money = playerInfo.money - 10;
      return true;
    }
  }
  return false;
}

// fight function (now with parameter for enemy's name)
var fight = function (enemy) {
  var isPlayerTurn = true;
  if (Math.random() > .5) {
    isPlayerTurn = false;
  }
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
    if (fightOrSkip()) {
      break;
    }


    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }
  } else {

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack)
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  } // end of while loop
  isPlayerTurn = !isPlayerTurn;
}
}; // end of fight function

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function () {
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before next round?");

        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }
  endGame();
};
var endGame = function () {
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + " . ");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}
var shop = function () {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL you health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE' or 3 for 'LEAVE' to make a choice."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.")
      break;
    default:
      window.alert("You did not pick a valid option. Try again.")
      shop();
      break;
  }
};
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
}

// function to set name 
var getplayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
  }

var playerInfo = {
  name: getplayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    this.health += 20;
    this.money -= 7;
  },
  upgradeAttack: function () {
    this.attack += 6;
    this.money -= 7;
  }
};


var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];
startGame();
