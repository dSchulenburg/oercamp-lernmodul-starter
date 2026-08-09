# oercamp-lernmodul-starter

Eine schlanke Vorlage, um aus einem **Lehrplan- oder Lernfeld-Auszug** ein
**interaktives, mehrsprachiges Mini-Lernmodul** zu bauen: ein paar Aufgaben mit
Selbstcheck, Sofort-Feedback und einem Punktestand am Ende. Vite + React +
Tailwind, bewusst dependency-arm.

> Dieses Repo gehoert zum OERcamp-Workshop "KI als echter Mitarbeiter"
> (Berlin 2026). Dort ist es die Nutzlast: das Modul ist das, was die Werkstatt
> ausspuckt, nicht der Gegenstand. Du arbeitest mit einem KI-Coding-Assistenten
> (Claude Code oder Vergleichbarem) und dieser README als Leitplanke. Es laeuft
> ohne Coaching, auch ohne den Workshop.

Am Ende hast du ein Modul, das du beliebig erweitern und selbst hosten kannst.

---

## 1. Zwei Wege

**Weg A, die Werkbank (nichts installieren).** Du brauchst nur Docker. Der
Container bringt Node, npm und alle Pakete mit, legt die Vorlage in deinen
Ordner und startet den Entwicklungsserver. Siehe Abschnitt 2.

**Weg B, klassisch.** Du hast Node ≥ 20 und git auf dem Rechner und arbeitest
direkt damit. Siehe Abschnitt 3.

Beide Wege fuehren zum selben Ergebnis. Ein KI-Coding-Assistent (z. B. **Claude
Code**) hilft in beiden Faellen, ist aber keine Bedingung.

## 2. Weg A: die Werkbank

Ein leerer Ordner, ein Befehl, fertig.

**Windows (PowerShell):**

```powershell
mkdir mein-modul; cd mein-modul
docker run --rm -it -p 5173:5173 -v "${PWD}:/work" dadalama/oercamp-werkbank
```

**macOS und Linux:**

```bash
mkdir mein-modul && cd mein-modul
docker run --rm -it -p 5173:5173 -v "$(pwd):/work" dadalama/oercamp-werkbank
```

Der Ordner fuellt sich mit der Vorlage, und unter **http://localhost:5173**
laeuft das Beispielmodul. Aendere `src/aufgaben.js` mit irgendeinem Editor und
speichere: der Browser zieht von selbst nach. Beenden mit `Strg+C`.

Beim ersten Start legt die Werkbank auch eine `docker-compose.yml` in deinen
Ordner. Ab dem zweiten Mal geht es deshalb kuerzer:

```bash
docker compose up
```

Und was du geaendert hast, zeigt dir in einem zweiten Fenster:

```bash
docker compose exec werkbank git diff      # was habe ich angefasst?
docker compose exec werkbank git checkout . # doch lieber zurueck
```

Ist git auf deinem Rechner installiert, tun es im Projektordner auch einfach
`git diff` und `git checkout .`. Es ist derselbe Ordner und dasselbe Repo.

> **Vorher ziehen, nicht vor Ort.** Der erste Start laedt rund 300 MB. Auf einer
> Konferenz-WLAN-Leitung ist das keine gute Idee. Zu Hause einmal
> `docker pull dadalama/oercamp-werkbank`, danach geht es offline.

Was der Container nicht tut: er installiert nichts dauerhaft auf deinem Rechner
und veraendert nichts ausserhalb dieses einen Ordners. Loeschst du den Ordner
und das Image, ist nichts uebrig.

## 3. Weg B: klassisch

Voraussetzungen: **Node** ≥ 20 mit **npm** (`node --version`), **git**.

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

## 4. Dein eigenes Modul bauen

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

## 5. Bauen und teilen

```bash
npm run build
```

In der Werkbank laeuft derselbe Befehl im Container, ohne dass du etwas
installieren musst:

```bash
docker compose run --rm werkbank npm run build
```

Das erzeugt den Ordner `dist/` mit fertigen, statischen Dateien. Die kannst du
auf jedem Webspace ablegen oder als ZIP weitergeben. Beim Workshop: Link oder
ZIP auf das gemeinsame Pinnwand-Board.

## 6. Wenn es klemmt

| Problem | Loesung |
|---|---|
| Werkbank: `port is already allocated` | Port 5173 ist belegt. Vorne eine andere Zahl nehmen: `-p 5174:5173`, dann `http://localhost:5174`. |
| Werkbank: Ordner bleibt leer | Der Mount hat nicht gegriffen. In Docker Desktop unter *Settings → Resources → File sharing* muss das Laufwerk freigegeben sein. |
| Werkbank: Aenderung kommt nicht an | Container neu starten (`Strg+C`, dann derselbe Befehl). Bei sehr grossen Ordnern dauert das Nachsehen laenger. |
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
docker-compose.yml <- Werkbank starten: docker compose up
```

Nur in diesem Vorlagen-Repo, nicht im Arbeitsordner der Werkbank:

```
Dockerfile         <- Bauanleitung fuer das Werkbank-Image
docker/start.sh    <- Startskript im Container (Vorlage ausrollen + Server)
build-werkbank.sh  <- Image bauen und auf Docker Hub schieben
```

## Die Werkbank selbst bauen

Du musst das nicht. Wer es trotzdem will:

```bash
./build-werkbank.sh --lokal    # nur die eigene Architektur, zum Ausprobieren
./build-werkbank.sh            # amd64 + arm64, danach Push auf Docker Hub
./build-werkbank.sh --usb      # Tar-Datei fuer den USB-Stick (ohne Internet)
```

Das Image bringt Node, npm und alle Pakete mit. Die Pakete liegen absichtlich
im Wurzelverzeichnis (`/node_modules`) und nicht im Projektordner: Node sucht
`node_modules` in allen Elternordnern, deshalb findet Vite sie auch dann noch,
wenn dein eigener Ordner an dieser Stelle eingeblendet wird. So bleibt der
Startbefehl einzeilig, und niemand muss 300 MB Kleinstdateien auf sein
Dateisystem kopieren.

## Lizenz

- **Quellcode**: [MIT](./LICENSE)
- **Inhalte** (Aufgaben, Texte): [CC BY 4.0](./LICENSE-CONTENT.md)

Sobald du eigene Inhalte einsetzt, bist du der Urheber deines Moduls. Trag
deinen Namen im Footer (`src/App.jsx`) und in `index.html` ein.
