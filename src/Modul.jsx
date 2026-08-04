import { useState } from 'react';
import { modul, aufgaben } from './aufgaben.js';
import { pick } from './i18n.js';
import Selbstcheck from './Selbstcheck.jsx';

// Rahmen des Moduls: Intro, Aufgabenliste, Punktestand am Ende.
export default function Modul({ lang }) {
  // ergebnisse: { [aufgabeId]: boolean }
  const [ergebnisse, setErgebnisse] = useState({});

  function merkeErgebnis(id, richtig) {
    setErgebnisse((alt) => ({ ...alt, [id]: richtig }));
  }

  const beantwortet = Object.keys(ergebnisse).length;
  const richtige = Object.values(ergebnisse).filter(Boolean).length;
  const fertig = beantwortet === aufgaben.length;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="text-xl font-bold text-stone-900">{pick(modul.titel, lang)}</h2>
      <p className="mt-2 text-stone-600">{pick(modul.intro, lang)}</p>

      <ol className="mt-6 flex flex-col gap-4">
        {aufgaben.map((aufgabe, i) => (
          <Selbstcheck
            key={aufgabe.id}
            aufgabe={aufgabe}
            lang={lang}
            nummer={i + 1}
            onErgebnis={merkeErgebnis}
          />
        ))}
      </ol>

      <div
        aria-live="polite"
        className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4 text-center"
      >
        {fertig ? (
          <p className="text-lg font-semibold text-stone-800">
            {lang === 'en'
              ? `Done: ${richtige} of ${aufgaben.length} correct.`
              : `Geschafft: ${richtige} von ${aufgaben.length} richtig.`}
          </p>
        ) : (
          <p className="text-stone-500">
            {lang === 'en'
              ? `Answered ${beantwortet} of ${aufgaben.length}.`
              : `Beantwortet: ${beantwortet} von ${aufgaben.length}.`}
          </p>
        )}
      </div>
    </main>
  );
}
