const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'Grapes',
  'Apple',
  'Pineapple',
  'Banana',
  'Jackfruit',
  'address',
  'administration',
  'admit',
  'adult',
  'affect',
  'after',
  'again',
  'against',
  'age',
  'agency',
  'agent',
  'ago',
  'agree',
  'agreement',
  'ahead',
  'air',
  'all',
  'allow',
  'almost',
  'alone',
  'along',
  'already',
  'also',
  'although',
  'always',
  'American',
  'among',
  'amount',
  'analysis',
  'and',
  'approach',
  'area',
  'argue',
  'arm',
  'around',
  'arrive',
  'art',
  'article',
  'artist',
  'as',
  'ask',
  'assume',
  'at',
  'attack',
  'attention',
  'attorney',
  'audience',
  'author',
  'authority',
  'available',
  'avoid',
  'away',
  'baby',
  'back',
  'bad',
  'bag',
  'ball',
  'bank',
  'bar',
  'base',
  'be',
  'beat',
  'beautiful',
  'clearly',
  'close',
  'coach',
  'cold',
  'collection',
  'college',
  'color',
  'come',
  'commercial',
  'common',
  'communit',
  'company',
  'compare',
  'computer',
  'concern',
  'condition',
  'conference',
  'Congress',
  'consider',
  'consumer',
  'contain',
  'continue',
  'control',
  'cost',
  'could',
  'country',
  'discussion',
  'disease',
  'do',
  'doctor',
  'dog',
  'door',
  'down',
  'draw',
  'dream',
  'drive',
  'drop',
  'drug',
  'during',
  'each',
  'early',
  'east',
  'easy',
  'eat',
  'economic',
  'economy',
  'edge',
  'education',
  'effect',
  'effort',
  'eight',
  'either',
  'election',
  'else',
  'employee',
  'end',
  'energy',
  'enjoy',
  'enough',
  'enter',
  'entire',
  'environment',
  'environmental',
  'especially',
  'establish',
  'even',
  'evenin'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null ?
  localStorage.getItem('difficulty') :
  'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null ?
  localStorage.getItem('difficulty') :
  'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}%</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
