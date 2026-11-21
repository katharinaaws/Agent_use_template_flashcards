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
        tableRow.appendChild(createDeleteButton(i));
        tableBody.appendChild(tableRow);
    }
}

// Erstellt einen roten Löschen-Button für eine Lernsession.
function createDeleteButton(sessionIndex) {
    const tableCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-session-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Löschen";
    deleteButton.addEventListener("click", function () {
        deleteSession(sessionIndex);
    });
    tableCell.appendChild(deleteButton);
    return tableCell;
}

// Löscht eine Lernsession und aktualisiert alle gespeicherten Anzeigen.
function deleteSession(sessionIndex) {
    learningSessions.splice(sessionIndex, 1);
    saveSessions();
    renderSessions();
    renderTotalLearningTime();
    renderTotalVocabulary();
    renderTotalSessions();
    renderWeeklyChart();
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

// Zeigt die Gesamtzahl der gespeicherten Lernsessions an.
function renderTotalSessions() {
    document.querySelector("#total-sessions").textContent = String(learningSessions.length);
}

// Berechnet die Kalenderwoche eines Datums.
function getCalendarWeek(date) {
    const dateParts = date.split("-");
    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]) - 1;
    const day = Number(dateParts[2]);
    const currentDate = new Date(Date.UTC(year, month, day));
    const dayNumber = (currentDate.getUTCDay() + 6) % 7;

    currentDate.setUTCDate(currentDate.getUTCDate() - dayNumber + 3);
    const firstThursday = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 4));
    const firstDayNumber = (firstThursday.getUTCDay() + 6) % 7;
    firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNumber + 3);

    const difference = currentDate - firstThursday;
    const weekNumber = 1 + Math.round(difference / (7 * 24 * 60 * 60 * 1000));
    return {
        key: currentDate.getUTCFullYear() + "-" + String(weekNumber).padStart(2, "0"),
        label: "KW " + weekNumber
    };
}

// Gruppiert die Lernzeit nach Kalenderwoche.
function getWeeklyLearningTime() {
    const weeklyMinutes = {};

    for (let i = 0; i < learningSessions.length; i++) {
        const session = learningSessions[i];
        const calendarWeek = getCalendarWeek(session.date);

        if (weeklyMinutes[calendarWeek.key] === undefined) {
            weeklyMinutes[calendarWeek.key] = {
                minutes: 0,
                label: calendarWeek.label
            };
        }

        weeklyMinutes[calendarWeek.key].minutes =
            weeklyMinutes[calendarWeek.key].minutes + Number(session.duration);
    }

    return weeklyMinutes;
}

// Erstellt die Stundenbeschriftung für die senkrechte Achse.
function renderChartScale(maximumHours) {
    const chartScale = document.querySelector("#chart-scale");
    chartScale.textContent = "";

    for (let i = 6; i >= 0; i--) {
        const scaleValue = document.createElement("span");
        const hours = (maximumHours / 6) * i;
        scaleValue.textContent = hours.toFixed(1);
        chartScale.appendChild(scaleValue);
    }
}

// Zeigt die Lernzeit als lila Balken pro Kalenderwoche.
function renderWeeklyChart() {
    const weeklyMinutes = getWeeklyLearningTime();
    const weekKeys = Object.keys(weeklyMinutes).sort();
    const chartBars = document.querySelector("#chart-bars");
    chartBars.textContent = "";

    let maximumHours = 0;
    for (let i = 0; i < weekKeys.length; i++) {
        const hours = weeklyMinutes[weekKeys[i]].minutes / 60;
        if (hours > maximumHours) {
            maximumHours = hours;
        }
    }

    if (maximumHours < 1) {
        maximumHours = 1;
    } else {
        maximumHours = Math.ceil(maximumHours);
    }

    renderChartScale(maximumHours);

    for (let i = 0; i < weekKeys.length; i++) {
        const week = weeklyMinutes[weekKeys[i]];
        const hours = week.minutes / 60;
        const roundedHours = Math.round(hours * 10) / 10;
        const barColumn = document.createElement("div");
        const barValue = document.createElement("span");
        const bar = document.createElement("div");
        const barLabel = document.createElement("span");

        barColumn.className = "bar-column";
        barValue.className = "bar-value";
        barValue.textContent = roundedHours.toFixed(1) + " h";
        bar.className = "bar";
        bar.style.height = (hours / maximumHours * 100) + "%";
        barLabel.className = "bar-label";
        barLabel.textContent = week.label;

        barColumn.appendChild(barValue);
        barColumn.appendChild(bar);
        barColumn.appendChild(barLabel);
        chartBars.appendChild(barColumn);
    }
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
    renderTotalSessions();
    renderWeeklyChart();
}

loadSessions();
renderSessions();
renderTotalLearningTime();
renderTotalVocabulary();
renderTotalSessions();
renderWeeklyChart();

// Verknüpft das Formular mit der Speicherfunktion.
const learningForm = document.querySelector("#learning-form");
learningForm.addEventListener("submit", saveSession);