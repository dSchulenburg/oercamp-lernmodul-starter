import { useState } from 'react';
import { pick } from './i18n.js';

// Eine wiederverwendbare Aufgaben-Komponente.
// Neuen Aufgabentyp ergaenzen? Neuen Zweig im switch (renderEingabe) bauen und
// in src/aufgaben.js `typ` setzen. Sonst nichts noetig.
export default function Selbstcheck({ aufgabe, lang, nummer, onErgebnis }) {
  const [beantwortet, setBeantwortet] = useState(false);
  const [warRichtig, setWarRichtig] = useState(false);
  const [gewaehlt, setGewaehlt] = useState(null); // Index der MC-Option
  const [eingabe, setEingabe] = useState('');

  function abschliessen(richtig) {
    setWarRichtig(richtig);
    setBeantwortet(true);
    onErgebnis(aufgabe.id, richtig);
  }

  function waehleOption(index) {
    if (beantwortet) return;
    setGewaehlt(index);
    abschliessen(Boolean(aufgabe.optionen[index].richtig));
  }

  function pruefeLuecke(e) {
    e.preventDefault();
    if (beantwortet || eingabe.trim() === '') return;
    const soll = pick(aufgabe.loesung, lang).trim().toLowerCase();
    abschliessen(eingabe.trim().toLowerCase() === soll);
  }

  const feedbackText =
    lang === 'en'
      ? warRichtig
        ? 'Correct!'
        : 'Not quite.'
      : warRichtig
      ? 'Richtig!'
      : 'Noch nicht ganz.';

  return (
    <li className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="mb-3 font-medium text-stone-800">
        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone-800 text-sm text-white">
          {nummer}
        </span>
        {pick(aufgabe.frage, lang)}
      </p>

      {aufgabe.typ === 'mc' && (
        <div className="flex flex-col gap-2">
          {aufgabe.optionen.map((opt, i) => {
            const zeigeRichtig = beantwortet && opt.richtig;
            const zeigeFalsch = beantwortet && i === gewaehlt && !opt.richtig;
            return (
              <button
                key={i}
                type="button"
                onClick={() => waehleOption(i)}
                disabled={beantwortet}
                aria-pressed={i === gewaehlt}
                className={[
                  'rounded-lg border px-4 py-2 text-left transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                  zeigeRichtig
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : zeigeFalsch
                    ? 'border-red-400 bg-red-50 text-red-800'
                    : 'border-stone-200 hover:border-stone-400 disabled:opacity-70',
                ].join(' ')}
              >
                {pick(opt.text, lang)}
              </button>
            );
          })}
        </div>
      )}

      {aufgabe.typ === 'luecke' && (
        <form onSubmit={pruefeLuecke} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={eingabe}
            onChange={(e) => setEingabe(e.target.value)}
            disabled={beantwortet}
            aria-label={pick(aufgabe.frage, lang)}
            className="min-w-40 flex-1 rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={beantwortet}
            className="rounded-lg bg-stone-800 px-4 py-2 text-white transition hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50"
          >
            {lang === 'en' ? 'Check' : 'Pruefen'}
          </button>
        </form>
      )}

      {beantwortet && (
        <div aria-live="polite" className="mt-3 text-sm">
          <p className={warRichtig ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>
            {feedbackText}
          </p>
          <p className="mt-1 text-stone-600">{pick(aufgabe.erklaerung, lang)}</p>
        </div>
      )}
    </li>
  );
}
