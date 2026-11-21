# Spec: Vocab Flashcards

## Goal (one or two sentences)
Eine einseitige HTML Seite, die hinzufügen kann  welche Preply Lernsessions ich in Französisch gemacht habe. Daten sind gespeichert im browser
## Users
nur ich, auf einem laptop browser
## Features (numbered, so prompts can refer to them)
- F1: Ein Form erstellen die "Lernprotokoll hinzufügen" heißt Füge darin eine Markdowntabelle hinzu (Fokus): mit den Optionen Grammatik, Koversation, Hören &Verstehen, Vokabeln
- F2: Füge ein Datumsfeld hinzu 
- F3: Füge ein Eingabefeld: "Dauer" wo ich die Dauer in Minuten eingeben kann 
- F4: Füge ein Eingabefeld: "Thema" wo ich das Thema der Französischeinheit eingeben
 kann
- F5: Füge ein Eingabefeld „Vokabeln (Anzahl)“ hinzu, wo ich die Anzahl der gelernten Vokabeln eingeben kann. Es sollen nur ganze Zahlen ab 0 möglich sein
- F6: Füge unter dem Formular einen lila Button mit der Aufschrift „+ Session speichern“ hinzu. Der Button soll über die gesamte Breite des Formulars gehen.
- F7: Wenn ich auf „Session speichern“ klicke, sollen Datum, Dauer, Fokus, Vokabeln und Thema aus dem Formular ausgelesen und als neue Lernsession in einem JavaScript-Array gespeichert werden. Datum, Dauer und Fokus müssen gültig ausgefüllt sein. Nach dem Speichern soll das Formular zurückgesetzt werden.
- F8: Speichere die Lernsessions mit localStorage im Browser, damit sie auch nach dem Neuladen oder Schließen der Webseite erhalten bleiben. Neue Sessions sollen zu den bestehenden hinzugefügt werden.
- F9: Erstelle unter dem Formular eine Tabelle mit der Überschrift „Lernprotokoll“. Die Tabelle soll die Spalten Datum, Dauer (min), Fokus, Vokabeln und Kommentar enthalten.
- F10: Zeige alle gespeicherten Lernsessions automatisch in der Tabelle an. Wenn ich eine neue Session speichere, soll sie sofort in der Tabelle erscheinen, ohne die Webseite neu zu laden.
- F11: Erstelle oben rechts eine Karte „Gesamt Lernzeit“. Berechne die gesamte Lernzeit aus allen gespeicherten Sessions und zeige das Ergebnis in Stunden an, zum Beispiel „4.5 h“.
- F12: Erstelle neben der Gesamtlernzeit eine Karte „Gelernte Vokabeln“. Addiere die Vokabelanzahl aller gespeicherten Sessions und zeige die Gesamtzahl an.
- F13: Erstelle eine dritte Karte „Lernsessions“. Zeige darin an, wie viele Lernsessions insgesamt gespeichert wurden
- F14: Erstelle unter den drei Karten ein Balkendiagramm mit der Überschrift „Lernzeit pro Woche (h)“. Berechne die Lernzeit für jede Kalenderwoche und zeige sie als lila Balken mit Stundenangabe und Kalenderwochennummer an. Verwende HTML, CSS und JavaScript ohne zusätzliche Bibliotheken.
- F15: Füge oben auf der Webseite die große Überschrift „Französisch lernen mit Preply“ und darunter den Untertitel „Lernfortschritt, Stunden & Vokabeln im Überblick“ hinzu.
- F16: Füge links neben der Überschrift eine französische Flagge und rechts oben den Schriftzug „Preply“ hinzu. Orientiere dich dabei am Vorlagenbild.
- F17: Gestalte die Webseite mit CSS wie im Vorlagenbild. Verwende einen hellen Hintergrund, weiße beziehungsweise helllila Karten, abgerundete Ecken, dünne lila Rahmen und lila Buttons. Passe auch die Schriftgrößen und Abstände an.
- F18: Ordne die Webseite wie im Vorlagenbild an. Links soll das Formular „Neue Lernsession eintragen“ stehen. Rechts sollen oben die drei Statistik-Karten und darunter das Balkendiagramm angezeigt werden. Unter diesen beiden Bereichen soll die Tabelle „Lernprotokoll“ über die gesamte Breite stehen. Ändere die Beschriftung „Thema“ im Formular zu „Kommentar (optional)“.
- F19: Füge in der Tabelle „Lernprotokoll“ für jede gespeicherte Lernsession einen roten Button „Löschen“ hinzu. Wenn ich auf den Button klicke, soll nur die jeweilige Lernsession aus der Tabelle gelöscht werden. Der Eintrag soll auch aus dem `localStorage` entfernt werden, damit er nach dem Neuladen der Webseite nicht wieder erscheint. Nach dem Löschen sollen sich das Balkendiagramm „Lernzeit pro Woche“ und die drei Statistik-Karten („Gesamt Lernzeit“, „Gelernte Vokabeln“ und „Lernsessions“) automatisch aktualisieren. Die gelöschte Session darf bei den Berechnungen nicht mehr berücksichtigt werden. Das Design des Buttons soll zum Referenzbild passen.
  

## Acceptance criteria (how I know a feature works)
- Ich kann eine neue Lernsession eingeben und speichern.
- Datum, Dauer und Fokus müssen ausgefüllt sein.
- Alle gespeicherten Sessions erscheinen im Lernprotokoll.
- Nach dem Neuladen der Webseite bleiben die Daten erhalten.
- Die gesamte Lernzeit wird automatisch berechnet.
- Die Anzahl der Vokabeln wird automatisch addiert.
- Die Anzahl der Lernsessions wird angezeigt.
- Das Balkendiagramm zeigt die Lernzeit pro Kalenderwoche.
- Neue Einträge aktualisieren Tabelle, Statistiken und Diagramm.
- Das Design sieht möglichst ähnlich wie mein Vorlagenbild aus.
- Die Webseite funktioniert lokal im Browser ohne Server.


## Out of scope (do NOT build)
- No login, no server, no database
- No frameworks or libraries (no React, no jQuery, no Bootstrap)
- No sound, no animations beyond simple CSS transitions
- No mobile app

## Look & feel
- Die gesamte Webseite soll möglichst genau wie das Referenzbild "French website_Idea.png" aussehen.
- Das Bild ist die verbindliche Designvorlage für ALLE Features (F1–F18).
- Farben, Schriftgrößen, Abstände, Buttons, Tabellen, Karten und das Layout sollen sich am Bild orientieren.
- Bei jedem neuen Feature muss das bestehende Design beibehalten werden.
- Neue Elemente sollen optisch zum Referenzbild passen.
- Verwende HTML, CSS und JavaScript.
- Verändere das Design nicht eigenständig.
