const wordPairs = [];
const wordForm = document.getElementById("word-form");
const englishWord = document.getElementById("english-word");
const germanWord = document.getElementById("german-word");
const wordList = document.getElementById("word-list");
const practiceCard = document.getElementById("practice-card");
const practiceCardInner = document.getElementById("practice-card-inner");
const practiceCardFront = document.getElementById("practice-card-front");
const practiceCardBack = document.getElementById("practice-card-back");
const revealButton = document.getElementById("reveal-button");
const nextButton = document.getElementById("next-button");
const storageKey = "vocabFlashcards";
let currentPracticeIndex = 0;
let cardIsRevealed = false;

// Load saved word pairs from localStorage.
function loadWordPairs() {
  const savedPairs = localStorage.getItem(storageKey);

  if (savedPairs === null) {
    return;
  }

  const parsedPairs = JSON.parse(savedPairs);

  for (let index = 0; index < parsedPairs.length; index = index + 1) {
    wordPairs.push(parsedPairs[index]);
  }
}

// Save all word pairs to localStorage.
function saveWordPairs() {
  localStorage.setItem(storageKey, JSON.stringify(wordPairs));
}

// Show every saved word pair in the list.
function showWordPairs() {
  wordList.textContent = "";

  for (let index = 0; index < wordPairs.length; index = index + 1) {
    const listItem = document.createElement("li");
    const wordText = document.createElement("span");
    const deleteButton = document.createElement("button");

    wordText.textContent =
      wordPairs[index].english + " – " + wordPairs[index].german;
    deleteButton.textContent = "Löschen";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", function () {
      deleteWordPair(index);
    });

    listItem.appendChild(wordText);
    listItem.appendChild(deleteButton);
    wordList.appendChild(listItem);
  }
}

// Remove a word pair and show the updated list.
function deleteWordPair(index) {
  wordPairs.splice(index, 1);
  saveWordPairs();
  showWordPairs();
  cardIsRevealed = false;
  showPracticeCard();
}

// Show the English word or the German answer on the practice card.
function showPracticeCard() {
  if (wordPairs.length === 0) {
    practiceCardFront.textContent = "Noch keine Wörter vorhanden.";
    practiceCardBack.textContent = "";
    practiceCardInner.classList.remove("is-revealed");
    revealButton.disabled = true;
    nextButton.disabled = true;
    cardIsRevealed = false;
    return;
  }

  if (currentPracticeIndex >= wordPairs.length) {
    currentPracticeIndex = 0;
  }

  revealButton.disabled = false;
  nextButton.disabled = false;
  practiceCardFront.textContent = wordPairs[currentPracticeIndex].english;
  practiceCardBack.textContent = wordPairs[currentPracticeIndex].german;

  if (cardIsRevealed) {
    practiceCardInner.classList.add("is-revealed");
  } else {
    practiceCardInner.classList.remove("is-revealed");
  }
}

// Show a random card that is different from the current card.
function showNextPracticeCard() {
  if (wordPairs.length === 0) {
    return;
  }

  if (wordPairs.length === 1) {
    cardIsRevealed = false;
    showPracticeCard();
    return;
  }

  let nextIndex = currentPracticeIndex;

  while (nextIndex === currentPracticeIndex) {
    nextIndex = Math.floor(Math.random() * wordPairs.length);
  }

  currentPracticeIndex = nextIndex;
  cardIsRevealed = false;
  showPracticeCard();
}

// Reveal the German translation of the current practice card.
function revealPracticeCard() {
  if (wordPairs.length === 0) {
    return;
  }

  cardIsRevealed = true;
  showPracticeCard();
}

// Add a submitted word pair to the list and clear the form.
function addWordPair(event) {
  event.preventDefault();

  const english = englishWord.value.trim();
  const german = germanWord.value.trim();

  if (english === "" || german === "") {
    return;
  }

  wordPairs.push({
    english: english,
    german: german
  });

  saveWordPairs();
  showWordPairs();
  showPracticeCard();
  wordForm.reset();
  englishWord.focus();
}

loadWordPairs();
showWordPairs();
showPracticeCard();
wordForm.addEventListener("submit", addWordPair);
revealButton.addEventListener("click", revealPracticeCard);
nextButton.addEventListener("click", showNextPracticeCard);
practiceCard.addEventListener("click", revealPracticeCard);