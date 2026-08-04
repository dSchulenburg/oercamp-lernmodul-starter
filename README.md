# oercamp-lernmodul-starter

Eine schlanke Vorlage, um aus einem **Lehrplan- oder Lernfeld-Auszug** ein
**interaktives, mehrsprachiges Mini-Lernmodul** zu bauen: ein paar Aufgaben mit
Selbstcheck, Sofort-Feedback und einem Punktestand am Ende. Vite + React +
Tailwind, bewusst dependency-arm.

> Dieses Repo ist die **Profi-Spur** des OERcamp-Workshops "KI als echter
> Mitarbeiter". Du arbeitest mit einem KI-Coding-Assistenten (Claude Code oder
> Vergleichbarem) und dieser README als Leitplanke. Es laeuft ohne Coaching.

Am Ende hast du ein Modul, das dem gleicht, was die Basis-Spur im Browser baut,
nur bist du hier im Code und kannst es beliebig erweitern und selbst hosten.

---

## 1. Voraussetzungen

- **Node** ≥ 20 und **npm** (`node --version`)
- **git**
- Ein KI-Coding-Assistent, z. B. **Claude Code** (Pro/Max-Abo oder API-Key).
  Im Prinzip geht auch ein anderer Assistent.

## 2. Loslegen

Dieses Repo ist eine GitHub-**Vorlage**. Der bequemste Weg: oben auf
**„Use this template" → „Create a new repository"** klicken, dann hast du eine
eigene Kopie unter deinem Account und `<DEIN-NAME>` unten ist dein
GitHub-Benutzername:

```bash
git clone https://github.com/<DEIN-NAME>/oercamp-lernmodul-starter.git
cd oercamp-lernmodul-starter
npm install
npm run dev
```

Ohne GitHub-Account geht es auch direkt:

```bash
git clone https://github.com/dSchulenburg/oercamp-lernmodul-starter.git
cd oercamp-lernmodul-starter
npm install
npm run dev
```

Der Befehl nennt dir eine Adresse (meist `http://localhost:5173`). Oeffne sie im
Browser. Du siehst das **Beispielmodul "Alltag auf Deutsch (A2)"** mit drei
Aufgaben und einem Sprach-Umschalter oben rechts. Probiere es aus.

## 3. Dein eigenes Modul bauen

Alles Inhaltliche steckt in **einer Datei**: `src/aufgaben.js`. Die musst du
ersetzen, mehr nicht. Am schnellsten geht das mit deinem KI-Assistenten. Lege
deinen Lehrplan-Auszug bereit (Beispiel siehe `beispiel-lehrplanauszug.md`) und
arbeite diese drei Prompts der Reihe nach ab:

**Prompt 1: Lernziele und Aufgaben**
> Lies `src/aufgaben.js` und `CLAUDE.md`, damit du das Datenformat kennst. Hier
> ist mein Lehrplan-Auszug: [DEIN AUSZUG]. Zielgruppe: [z. B. Berufsschule 1.
> Jahr]. Formuliere daraus 3 bis 5 ueberpruefbare Lernziele (mit Bloom-Stufe)
> und ein Set aus 4 bis 6 Aufgaben mit Musterloesung. Zeig mir erst den Entwurf,
> bevor du Code schreibst.

**Prompt 2: in das Modul einbauen**
> Setz die Aufgaben jetzt in `src/aufgaben.js` um, streng nach dem Schema in
> `CLAUDE.md`: Typ `mc` oder `luecke`, jeder Text als `{ de, en }`, mit
> Erklaerung je Aufgabe. Ersetze das Beispielmodul komplett. Danach starte
> `npm run dev` und sag mir, ob es fehlerfrei laeuft.

**Prompt 3: zweite Sprache**
> Fuege eine zweite Sprache hinzu: [z. B. Ukrainisch, Arabisch, Englisch].
> Ergaenze das Kuerzel in `SPRACHEN` in `src/i18n.js` und uebersetze alle Texte
> in `src/aufgaben.js`. Die Logik bleibt gleich.

## 4. Bauen und teilen

```bash
npm run build
```

Das erzeugt den Ordner `dist/` mit fertigen, statischen Dateien. Die kannst du
auf jedem Webspace ablegen oder als ZIP weitergeben. Beim Workshop: Link oder
ZIP auf das gemeinsame Pinnwand-Board.

## 5. Wenn es klemmt

| Problem | Loesung |
|---|---|
| `npm install` bricht ab | Node-Version pruefen (`node --version`, ≥ 20 noetig). |
| Port belegt | Vite waehlt automatisch den naechsten freien Port, schau in die Ausgabe. |
| Weisser Bildschirm | Browser-Konsole oeffnen (F12), Fehlermeldung an den Assistenten geben. |
| Tailwind-Klassen wirken nicht | Dev-Server neu starten (`npm run dev`); Klassen muessen im JSX als Text stehen. |
| Zweite Sprache zeigt nichts | Kuerzel in `SPRACHEN` (src/i18n.js) und in allen Text-Objekten vorhanden? |

## Projektstruktur

```
src/
  aufgaben.js     <- DEINE Inhalte (Aufgaben + Modul-Titel/Intro)
  i18n.js         <- Sprachliste + pick()-Helfer
  Selbstcheck.jsx <- eine Aufgabe (mc + luecke), Feedback + Erklaerung
  Modul.jsx       <- Rahmen: Intro, Aufgabenliste, Punktestand
  App.jsx         <- Kopf mit Sprach-Umschalter + Footer
  main.jsx        <- Einstieg
  styles/index.css
CLAUDE.md         <- Konventionen fuer den KI-Assistenten
beispiel-lehrplanauszug.md
```

## Lizenz

- **Quellcode**: [MIT](./LICENSE)
- **Inhalte** (Aufgaben, Texte): [CC BY 4.0](./LICENSE-CONTENT.md)

Sobald du eigene Inhalte einsetzt, bist du der Urheber deines Moduls. Trag
deinen Namen im Footer (`src/App.jsx`) und in `index.html` ein.
