// Winziger i18n-Helfer, bewusst ohne Bibliothek.
//
// Konvention: Jeder anzeigbare Text ist ein Objekt { de: '...', en: '...' }.
// pick() waehlt die aktive Sprache und faellt auf Deutsch zurueck, falls eine
// Sprache fehlt (so bleibt nie ein Feld leer, wenn jemand nur eine Sprache pflegt).
//
// Neue Sprache ergaenzen: Kuerzel hier in SPRACHEN eintragen und in allen
// Text-Objekten (src/aufgaben.js) denselben Key ergaenzen.

export const SPRACHEN = ['de', 'en'];

export const SPRACH_LABEL = {
  de: 'Deutsch',
  en: 'English',
};

export function pick(obj, lang) {
  if (!obj) return '';
  return obj[lang] ?? obj.de ?? '';
}
