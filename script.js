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
}

loadSessions();

// Verknüpft das Formular mit der Speicherfunktion.
const learningForm = document.querySelector("#learning-form");
learningForm.addEventListener("submit", saveSession);