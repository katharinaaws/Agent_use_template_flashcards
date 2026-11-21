const learningSessions = [];

// Lädt gespeicherte Lernsessions aus dem Browser.
function loadSessions() {
    const savedSessions = localStorage.getItem("learningSessions");

    if (savedSessions !== null) {
        try {
            const parsedSessions = JSON.parse(savedSessions);

            if (Array.isArray(parsedSessions)) {
                for (let i = 0; i < parsedSessions.length; i++) {
                    learningSessions.push(parsedSessions[i]);
                }
            }
        } catch (error) {
            localStorage.removeItem("learningSessions");
        }
    }
}

// Speichert alle Lernsessions im Browser.
function saveSessions() {
    localStorage.setItem("learningSessions", JSON.stringify(learningSessions));
}

// Zeigt alle gespeicherten Lernsessions in der Tabelle an.
function renderSessions() {
    const tableBody = document.querySelector("#learning-log-body");
    tableBody.textContent = "";

    for (let i = 0; i < learningSessions.length; i++) {
        const session = learningSessions[i];
        const tableRow = document.createElement("tr");

        tableRow.appendChild(createTableCell(formatDate(session.date)));
        tableRow.appendChild(createTableCell(String(session.duration)));
        tableRow.appendChild(createTableCell(formatFocus(session.focus)));
        tableRow.appendChild(createTableCell(String(session.vocabulary)));
        tableRow.appendChild(createTableCell(session.topic));
        tableBody.appendChild(tableRow);
    }
}

// Berechnet die gesamte Lernzeit und zeigt sie in Stunden an.
function renderTotalLearningTime() {
    let totalMinutes = 0;

    for (let i = 0; i < learningSessions.length; i++) {
        totalMinutes = totalMinutes + Number(learningSessions[i].duration);
    }

    const totalHours = totalMinutes / 60;
    const roundedHours = Math.round(totalHours * 10) / 10;
    document.querySelector("#total-learning-time").textContent = roundedHours + " h";
}

// Addiert alle gespeicherten Vokabeln und zeigt die Gesamtzahl an.
function renderTotalVocabulary() {
    let totalVocabulary = 0;

    for (let i = 0; i < learningSessions.length; i++) {
        totalVocabulary = totalVocabulary + Number(learningSessions[i].vocabulary);
    }

    document.querySelector("#total-vocabulary").textContent = String(totalVocabulary);
}

// Erstellt eine Tabellenzelle mit dem angegebenen Text.
function createTableCell(text) {
    const tableCell = document.createElement("td");
    tableCell.textContent = text;
    return tableCell;
}

// Wandelt den gespeicherten Datumswert in das deutsche Anzeigeformat um.
function formatDate(date) {
    const dateParts = date.split("-");

    if (dateParts.length === 3) {
        return dateParts[2] + "." + dateParts[1] + "." + dateParts[0];
    }

    return date;
}

// Wandelt gespeicherte Fokuswerte in lesbare Beschriftungen um.
function formatFocus(focus) {
    if (focus === "grammatik") {
        return "Grammatik";
    }
    if (focus === "konversation") {
        return "Konversation";
    }
    if (focus === "hoeren-verstehen") {
        return "Hören & Verstehen";
    }
    return "Vokabeln";
}

// Speichert eine gültige Lernsession aus dem Formular.
function saveSession(event) {
    event.preventDefault();

    const date = document.querySelector("#date").value;
    const duration = Number(document.querySelector("#duration").value);
    const focus = document.querySelector("#focus").value;
    const vocabulary = Number(document.querySelector("#vocabulary").value);
    const topic = document.querySelector("#topic").value.trim();

    if (date === "" || duration <= 0 || focus === "") {
        alert("Bitte Datum, Dauer und Fokus ausfüllen.");
        return;
    }

    if (Number.isInteger(vocabulary) === false || vocabulary < 0) {
        alert("Bitte eine ganze Zahl ab 0 bei den Vokabeln eingeben.");
        return;
    }

    const session = {
        date: date,
        duration: duration,
        focus: focus,
        vocabulary: vocabulary,
        topic: topic
    };

    learningSessions.push(session);
    saveSessions();
    document.querySelector("#learning-form").reset();
    renderSessions();
    renderTotalLearningTime();
    renderTotalVocabulary();
}

loadSessions();
renderSessions();
renderTotalLearningTime();
renderTotalVocabulary();

// Verknüpft das Formular mit der Speicherfunktion.
const learningForm = document.querySelector("#learning-form");
learningForm.addEventListener("submit", saveSession);