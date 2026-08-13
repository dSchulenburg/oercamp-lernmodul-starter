#!/bin/sh
# Startet die Werkbank.
#
# 1. Liegt in /work noch keine Vorlage, wird sie dorthin ausgerollt.
# 2. Danach laeuft der Entwicklungsserver auf Port 5173.
#
# /work ist normalerweise ein Ordner vom eigenen Rechner. Ohne Mount laeuft
# alles im Container, dann ist es ein reiner Zuschau-Modus.
set -e

VORLAGE=/opt/vorlage
ZIEL=/work

if [ ! -f "$ZIEL/package.json" ]; then
  if [ -n "$(ls -A "$ZIEL" 2>/dev/null)" ]; then
    echo "Werkbank: Der Ordner ist nicht leer, aber es liegt kein Lernmodul darin."
    echo "          Ich lege die Vorlage daneben. Nichts wird ueberschrieben."
  else
    echo "Werkbank: Ordner ist leer, ich lege die Vorlage hinein."
  fi
  # Eintrag fuer Eintrag, damit nichts ueberschrieben wird, was schon da ist.
  # (`cp -n` waere kuerzer, tut in BusyBox aber stillschweigend gar nichts,
  #  sobald das Ziel ein vorhandener Ordner ist.)
  for eintrag in "$VORLAGE"/* "$VORLAGE"/.[!.]*; do
    [ -e "$eintrag" ] || continue
    ziel="$ZIEL/$(basename "$eintrag")"
    [ -e "$ziel" ] && continue
    cp -a "$eintrag" "$ziel"
  done

  # Auf Linux-Hosts gehoeren neu angelegte Dateien sonst root. Wir ziehen die
  # Rechte auf den Eigentuemer des gemounteten Ordners nach. Unter Windows und
  # macOS laeuft das ins Leere, das ist in Ordnung.
  BESITZER="$(stat -c '%u:%g' "$ZIEL" 2>/dev/null || echo '')"
  if [ -n "$BESITZER" ] && [ "$BESITZER" != "0:0" ]; then
    chown -R "$BESITZER" "$ZIEL" 2>/dev/null || true
  fi
fi

# Sicherheitsleine. Ohne einen ersten Stand gibt es nichts, wohin man
# zurueckkehren koennte: `git diff` zeigt dann nichts und `git checkout .`
# stellt nichts wieder her. Ein vorhandenes Repo fassen wir nicht an.
if [ ! -d "$ZIEL/.git" ] && [ -f "$ZIEL/package.json" ]; then
  git -C "$ZIEL" init -q
  git -C "$ZIEL" config user.name "Werkbank"
  git -C "$ZIEL" config user.email "werkbank@localhost"
  # Sonst schreibt Git bei jedem Diff eine Warnung ueber Zeilenenden ueber die
  # eigentliche Ausgabe. Geregelt ist die Sache schon per .gitattributes.
  git -C "$ZIEL" config core.safecrlf false
  # Dieses Repo wird von zwei Seiten gelesen: hier drin von Linux, draussen vom
  # Host. Linux legt die Dateien mit 100755 an, NTFS kennt kein Exec-Bit und
  # meldet 100644 zurueck - ohne diese Zeile zeigt `git diff` auf dem Host jede
  # einzelne Vorlagendatei als "old mode / new mode", bevor die eine echte
  # Aenderung kommt. Gemessen am 13.08.2026: 72 Zeilen Rauschen statt 13.
  git -C "$ZIEL" config core.fileMode false
  git -C "$ZIEL" add -A
  git -C "$ZIEL" commit -q -m "Vorlage: Stand beim ersten Start"
  echo "Werkbank: Sicherheitsleine gelegt (git). Zurueck geht es mit: git checkout ."
fi

cat <<'BANNER'

  ────────────────────────────────────────────────
   Die Werkbank steht.

   Modul im Browser:  http://localhost:5173
   Deine Dateien:     der Ordner, aus dem du gestartet hast
   Inhalte aendern:   src/aufgaben.js
                      speichern, der Browser zieht von selbst nach

   Was habe ich geaendert?   git diff
   Doch lieber zurueck?      git checkout .
   (In einem zweiten Fenster: docker compose exec werkbank git diff)

   Beenden: Strg+C
  ────────────────────────────────────────────────

BANNER

exec vite --host 0.0.0.0 --port 5173
