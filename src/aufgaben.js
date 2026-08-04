// ============================================================================
//  DEINE INHALTE: das ist die einzige Datei, die du fuer ein neues Modul
//  wirklich anfassen musst. Alles andere ist Geruest.
//
//  Konvention (siehe CLAUDE.md):
//   - Jeder Text ist ein Objekt { de: '...', en: '...' }.
//   - Neue Sprache: Key ergaenzen (hier + in src/i18n.js SPRACHEN).
//   - typ 'mc'     -> Multiple Choice mit optionen[].richtig
//   - typ 'luecke' -> Freitext, verglichen gegen loesung (getrimmt, klein)
//
//  Beispielmodul: DaZ A2 / Alltag. Bewusst so gewaehlt, dass sich die Antworten
//  sauber uebersetzen lassen (Alltagslogik statt deutscher Grammatik-Luecken).
//  Bei echten DaZ-Modulen ist die zweite Sprache oft die Herkunftssprache als
//  Verstaendnis-Stuetze, nicht eine Uebersetzung des Lernstoffs.
// ============================================================================

export const modul = {
  titel: {
    de: 'Alltag auf Deutsch (A2)',
    en: 'Everyday German (A2)',
  },
  intro: {
    de: 'Ein kleines Beispielmodul mit drei Aufgaben rund um Alltagssituationen. Klicke die richtige Antwort an oder schreibe das fehlende Wort. Du bekommst sofort eine Rueckmeldung.',
    en: 'A small sample module with three tasks about everyday situations. Click the correct answer or type the missing word. You get instant feedback.',
  },
};

export const aufgaben = [
  {
    id: 1,
    typ: 'mc',
    frage: {
      de: 'Du bist im Supermarkt. Die Kassiererin sagt: "Das macht 8 Euro 50." Was passt als Antwort?',
      en: 'You are at the supermarket. The cashier says: "That will be 8 euros 50." What is a good reply?',
    },
    optionen: [
      { text: { de: 'Hier, bitte. Stimmt so.', en: 'Here you go. Keep the change.' }, richtig: true },
      { text: { de: 'Guten Morgen!', en: 'Good morning!' }, richtig: false },
      { text: { de: 'Auf Wiedersehen.', en: 'Goodbye.' }, richtig: false },
    ],
    erklaerung: {
      de: 'An der Kasse bezahlst du. "Hier, bitte" passt zum Geben des Geldes. "Guten Morgen" ist eine Begruessung, "Auf Wiedersehen" ein Abschied.',
      en: 'At the checkout you pay. "Here you go" fits handing over the money. "Good morning" is a greeting, "Goodbye" is a farewell.',
    },
  },
  {
    id: 2,
    typ: 'mc',
    frage: {
      de: 'Es regnet stark und du gehst nach draussen. Was nimmst du mit?',
      en: 'It is raining heavily and you go outside. What do you take with you?',
    },
    optionen: [
      { text: { de: 'einen Regenschirm', en: 'an umbrella' }, richtig: true },
      { text: { de: 'eine Sonnenbrille', en: 'sunglasses' }, richtig: false },
      { text: { de: 'einen Fussball', en: 'a football' }, richtig: false },
    ],
    erklaerung: {
      de: 'Bei Regen haelt dich ein Regenschirm trocken. Eine Sonnenbrille brauchst du bei Sonne, einen Fussball zum Spielen.',
      en: 'In the rain an umbrella keeps you dry. You need sunglasses in the sun and a football for playing.',
    },
  },
  {
    id: 3,
    typ: 'luecke',
    frage: {
      de: 'Ergaenze das fehlende Wort: "Eine Woche hat sieben ___."',
      en: 'Fill in the missing word: "A week has seven ___."',
    },
    loesung: {
      de: 'Tage',
      en: 'days',
    },
    erklaerung: {
      de: 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag und Sonntag: das sind sieben Tage.',
      en: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday: those are seven days.',
    },
  },
];
