var questionArray = [
  {
    name: 'question',
    img: (src = 'img/iconfinder_question.png')
  }
];

var cardsArray = [
  {
    name: 'CSS',
    img: (src = 'img/css3-logo.png')
  },
  {
    name: 'Github',
    img: (src = 'img/github-logo.png')
  },
  {
    name: 'HTML',
    img: (src = 'img/html5-logo.png')
  },
  {
    name: 'jQuery',
    img: (src = 'img/jquery-logo.png')
  },
  {
    name: 'JS',
    img: (src = 'img/js-logo.png')
  },
  {
    name: 'Node',
    img: (src = 'img/nodejs-logo.png')
  },
  {
    name: 'Photo Shop',
    img: (src = 'img/photoshop-logo.png')
  },
  {
    name: 'Python',
    img: (src = 'img/python-logo.png')
  },
  {
    name: 'React',
    img: (src = 'img/react_logo.png')
  },
  {
    name: 'Sass',
    img: (src = 'img/sass-logo.png')
  },
  {
    name: 'VScode',
    img: (src = 'img/vscode-logo.png')
  },
  {
    name: 'Wordpress',
    img: (src = 'img/wordpress-logo.png')
  }
];
// cardsArray[0].name; // 'css'
// cardsArray[0].img; // 'img/css3-logo.png'

// Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function() {
  return 0.5 - Math.random();
});

// Grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
var grid = document.createElement('section');
// Give section element a class of grid.
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
  // create a div element and assign to variable card
  var card = document.createElement('div');

  // Apply a card class to that div
  card.classList.add('card');

  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = gameGrid[i].name;

  /*
  // Apply the background image of the div to the cardsArray image
  card.style.backgroundImage = `url(${gameGrid[i].img})`;
  // Append the div to the grid section
  grid.appendChild(card);
  */

  // Create front of card
  var front = document.createElement('div');
  front.classList.add('front');
  front.style.backgroundImage = `url('${questionArray[0].img}')`;

  // Create back of card
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

  // Append card to grid
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';

// Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

// Add match CSS
var match = function() {
  var selected = document.querySelectorAll('.selected');

  // loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
};

// Reset guesses after two attempts
var resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
};

// Add event listener to grid
grid.addEventListener('click', function(event) {
  // Declare variable to target our clicked item
  var clicked = event.target;
  // Do not allow the grid section itself to be selected;
  // only select divs inside the grid
  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('match') ||
    clicked.parentNode.classList.contains('selected')
  ) {
    return;
  }
  // We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    // If both guesses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      // And the firstGuess matches secondGuess
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});
