const categories = {
    fruits: ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🍊', '🍑'],
    emojis: ['😀', '😂', '😍', '😎', '😢', '😡', '😱', '🤔'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    planets: ['🌍', '🌕', '🌟', '🌌', '🪐', '☄️', '🌑', '🌞'],
    flags: ['🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺', '🇩🇪', '🇫🇷', '🇯🇵', '🇧🇷']
};
let selectedCategory;
let cards = [];
let flippedCards = [];
let score = 0;
let timer;
let timeLeft = 30;
function startGame(category) {
    selectedCategory = category;
    cards = createCardArray(categories[category]);
    shuffle(cards);
    renderCards();
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    startTimer();
}
function createCardArray(items) {
    return [...items, ...items];
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);
        cardElement.addEventListener('click', handleCardClick);
        container.appendChild(cardElement);
    });
}
function handleCardClick(event) {
    const card = event.target;
    const index = card.getAttribute('data-index');
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.textContent = cards[index];
        flippedCards.push({ card, index });
        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}
function checkForMatch() {
    const [first, second] = flippedCards;
 if (cards[first.index] === cards[second.index]) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        first.card.classList.add('matched');
        second.card.classList.add('matched');
    } else {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        first.card.textContent = '';
        second.card.textContent = '';
    }
    flippedCards = [];
    checkGameOver();
}
function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = `Time: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false);
        }
    }, 1000);
}
function checkGameOver() {
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cards.length) {
        endGame(true);
    }
}
function endGame(isWin) {
    clearInterval(timer);
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('result-message').textContent = isWin ? 'You Win!' : 'Game Over!';
}
function resetGame() {
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('landing-page').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    clearInterval(timer);
}