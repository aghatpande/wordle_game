let secretWord = '';
let attempts = 6;

async function fetchRandomWord() {
    const url = 'https://random-word-api.herokuapp.com/word?number=1&length=5';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            secretWord = data[0];
            console.log(`Secret word: ${secretWord}`); // For debugging purposes
        } else {
            console.error('Error fetching random word');
        }
    } catch (error) {
        console.error('Error fetching random word', error);
    }
}

function displayGuessResult(guess, secret) {
    let result = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            result.push(`[${guess[i]}]`);  // Correct letter in the correct position
        } else if (secret.includes(guess[i])) {
            result.push(`(${guess[i]})`);  // Correct letter in the wrong position
        } else {
            result.push(guess[i]);  // Incorrect letter
        }
    }
    return result.join(" ");
}

function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    const messageP = document.getElementById("message");

    if (guess.length !== secretWord.length) {
        messageP.textContent = `Please enter a ${secretWord.length}-letter word.`;
        return;
    }

    if (guess === secretWord) {
        messageP.textContent = "Congratulations! You've guessed the word correctly!";
        guessInput.disabled = true;
        return;
    }

    const result = displayGuessResult(guess, secretWord);
    const resultP = document.createElement("p");
    resultP.textContent = `Attempt ${7 - attempts}: ${result}`;
    resultsDiv.appendChild(resultP);

    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (attempts === 0) {
        messageP.textContent = `Sorry, you've run out of attempts. The word was '${secretWord}'.`;
        guessInput.disabled = true;
    }
}

// Fetch a random word when the page loads
window.onload = fetchRandomWord;
