const wordPairs = [];
const wordForm = document.getElementById("word-form");
const englishWord = document.getElementById("english-word");
const germanWord = document.getElementById("german-word");

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

  wordForm.reset();
  englishWord.focus();
}

wordForm.addEventListener("submit", addWordPair);