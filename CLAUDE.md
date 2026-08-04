# CLAUDE.md: Konventionen fuer dieses Lernmodul

Kurzanleitung fuer KI-Coding-Assistenten (Claude Code o. Ae.), die an diesem
Modul arbeiten. Halte dich daran, dann bleibt das Modul klein, lauffaehig und
konsistent.

## Projektzweck

Ein interaktives Mini-Lernmodul: wenige Aufgaben mit Selbstcheck, Sofort-Feedback
und Punktestand. Gebaut aus einem Lehrplan- oder Lernfeld-Auszug.

## Stack (bewusst schlank)

Vite + React (JS/JSX) + Tailwind v4. **Keine neuen Abhaengigkeiten ohne Not.**
Kein TypeScript, kein Router, keine State-Bibliothek, kein i18n-Framework. Wenn
eine Aufgabe scheinbar eine neue Dependency braucht, geht es fast immer auch mit
Bordmitteln (React-State, eine Funktion, etwas CSS).

## Wichtigste Regel: nur `src/aufgaben.js` fuer Inhalte

Der gesamte Lernstoff lebt in `src/aufgaben.js`. Ein neues Modul heisst: diese
Datei ersetzen. Geruest (Komponenten, Umschalter, Build) bleibt unangetastet.

## Datenschema (verbindlich)

```js
export const modul = {
  titel: { de: '...', en: '...' },
  intro: { de: '...', en: '...' },
};

export const aufgaben = [
  // Multiple Choice
  {
    id: 1,
    typ: 'mc',
    frage: { de: '...', en: '...' },
    optionen: [
      { text: { de: '...', en: '...' }, richtig: true },
      { text: { de: '...', en: '...' }, richtig: false },
    ],
    erklaerung: { de: '...', en: '...' },
  },
  // Luecke (Freitext)
  {
    id: 2,
    typ: 'luecke',
    frage: { de: '...', en: '...' },
    loesung: { de: '...', en: '...' },   // Vergleich getrimmt + kleingeschrieben
    erklaerung: { de: '...', en: '...' },
  },
];
```

Regeln:
- Jeder anzeigbare Text ist ein Objekt `{ de: '...', ... }`. Nie ein blanker String.
- `id` eindeutig (fuer den React-Key).
- Genau eine `mc`-Option sollte `richtig: true` sein.
- `luecke`: kurze, eindeutige Loesung waehlen (der Vergleich ist streng bis auf
  Gross-/Kleinschreibung und Rand-Leerzeichen).
- Immer eine `erklaerung` mitgeben, auch bei richtiger Antwort. Sie ist die
  Fehler-Paedagogik des Moduls: sag, *warum* etwas stimmt oder nicht.

## i18n

- Sprachen stehen in `src/i18n.js` in `SPRACHEN` (z. B. `['de', 'en']`).
- `pick(obj, lang)` waehlt die Sprache und faellt auf `de` zurueck.
- Neue Sprache: Kuerzel in `SPRACHEN` ergaenzen, Label in `SPRACH_LABEL`, dann in
  allen Text-Objekten in `src/aufgaben.js` denselben Key nachziehen.
- Uebersetze Aufgaben inhaltlich, die Logik bleibt gleich. (Hinweis: bei echten
  DaZ-/Sprachmodulen ist die zweite Sprache oft die Herkunftssprache als
  Verstaendnis-Stuetze, nicht eine 1:1-Uebersetzung des Lernstoffs.)

## Neuer Aufgabentyp

Nur wenn `mc`/`luecke` nicht reichen: in `src/Selbstcheck.jsx` einen weiteren
Zweig ergaenzen (Rendering + `abschliessen(richtig)` aufrufen) und in
`aufgaben.js` das passende `typ` setzen. Score-Logik in `Modul.jsx` bleibt gleich,
weil sie nur `onErgebnis(id, richtig)` auswertet.

## Design & Barrierearmut

- Hell/neutral, oranger Akzent (`#e67e22`, aus dem Logo). Kein Dark-Theme noetig.
- Tailwind-Utilityklassen direkt im JSX.
- Bedienbar per Tastatur (native `<button>`, `<input>`, sichtbarer Fokusring via
  `focus-visible:ring`). Feedback in `aria-live`-Bereichen. Nicht kaputt machen.
- Ausreichend Kontrast, semantisches HTML (`<main>`, `<ol>`, `<h2>`).

## Redaktion

- **Keine Gedankenstriche ("—") im deutschen Fliesstext.** Mit Komma, Doppelpunkt
  oder Klammer aufloesen.
- Werkzeuge austauschbar rahmen ("geht im Prinzip auch mit anderen Assistenten").
- Neutral bleiben, kein Werbe- oder Angebotsbezug.

## Lizenz

Code MIT, Inhalte CC BY 4.0. Wer eigene Inhalte einsetzt, wird Urheber seines
Moduls und traegt den eigenen Namen ein (Footer in `src/App.jsx`, `index.html`).

## Definition of Done

`npm run build` laeuft fehlerfrei durch und `npm run dev` zeigt das Modul: alle
Aufgaben spielbar, Feedback + Erklaerung sichtbar, Punktestand am Ende,
Sprach-Umschalter wechselt korrekt.
