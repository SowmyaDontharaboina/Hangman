const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

const displayWord = () => {
    wordEl.innerHTML = `
        ${selectedWord.split('').map((letter) => `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>`).join('')}
    `;
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'You Have Won!' 
        popup.style.display = 'flex';
    }
}
displayWord();

const showNotification = () => {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
};

const updateWrongLetters = () => {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    const errors = wrongLetters.length;
    figureParts.forEach((part, index) => {
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Have lost!' 
        popup.style.display = 'flex';
    }
};



window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        console.log(letter)
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})


playAgainBtn.addEventListener('click', (e) => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
})