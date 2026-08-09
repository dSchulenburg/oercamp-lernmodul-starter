import { useState } from 'react';
import Modul from './Modul.jsx';
import { SPRACHEN, SPRACH_LABEL } from './i18n.js';

export default function App() {
  const [lang, setLang] = useState('de');

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2">
            <img src="/favicon.svg" alt="" aria-hidden="true" className="h-7 w-7" />
            <span className="font-semibold">Mini-Lernmodul</span>
          </span>

          {/* Sprach-Umschalter: das Ergebnis von Prompt 3 aus der README */}
          <div className="flex gap-1" role="group" aria-label="Sprache / Language">
            {SPRACHEN.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={[
                  'rounded-md px-3 py-1 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                  lang === code
                    ? 'bg-stone-800 text-white'
                    : 'text-stone-600 hover:bg-stone-100',
                ].join(' ')}
              >
                {SPRACH_LABEL[code] ?? code}
              </button>
            ))}
          </div>
        </div>
      </header>

      <Modul lang={lang} />

      <footer className="px-4 py-8 text-center text-sm text-stone-500">
        <p>
          {lang === 'en' ? 'Content' : 'Inhalte'}{' '}
          <a
            className="underline"
            href="https://creativecommons.org/licenses/by/4.0/deed.de"
            target="_blank"
            rel="noopener noreferrer license"
          >
            CC&nbsp;BY&nbsp;4.0
          </a>{' '}
          &middot; {lang === 'en' ? 'Code' : 'Code'}{' '}
          <a
            className="underline"
            href="https://opensource.org/license/mit"
            target="_blank"
            rel="noopener noreferrer license"
          >
            MIT
          </a>{' '}
          &middot;{' '}
          <span>
            {lang === 'en'
              ? 'Replace this with your name once you add your own content.'
              : 'Ersetze das durch deinen Namen, sobald du eigene Inhalte einsetzt.'}
          </span>
        </p>
      </footer>
    </div>
  );
}
