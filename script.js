const wordPairs = [];
const wordForm = document.getElementById("word-form");
const englishWord = document.getElementById("english-word");
const germanWord = document.getElementById("german-word");
const wordList = document.getElementById("word-list");
const storageKey = "vocabFlashcards";

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
  wordForm.reset();
  englishWord.focus();
}

loadWordPairs();
showWordPairs();
wordForm.addEventListener("submit", addWordPair);