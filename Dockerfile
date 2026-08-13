# Die Werkbank: Entwicklungsumgebung fuer ein Lernmodul, als Container.
#
# Ziel: ein Befehl, danach laeuft ein Lernmodul im Browser und die Dateien
# liegen bearbeitbar im eigenen Ordner. Kein Node, kein npm install, keine
# Versionsfrage.
#
#   docker run --rm -it -p 5173:5173 -v "${PWD}:/work" dadalama/oercamp-werkbank
#
# Bauen: ./build-werkbank.sh
FROM node:20-alpine

LABEL org.opencontainers.image.title="OERcamp Lernmodul-Werkbank" \
      org.opencontainers.image.description="Vite+React-Entwicklungsumgebung fuer interaktive Mini-Lernmodule. Ein Befehl, keine Installation." \
      org.opencontainers.image.source="https://github.com/dSchulenburg/oercamp-lernmodul-starter" \
      org.opencontainers.image.licenses="MIT"

# Die Abhaengigkeiten liegen bewusst im WURZELVERZEICHNIS, nicht in /work.
#
# Node sucht node_modules aufwaerts durch alle Elternordner. Deshalb findet
# Vite die Pakete auch dann noch, wenn /work spaeter von einem Ordner des
# Hosts ueberdeckt wird. Der Alternativweg (node_modules als eigenes Volume)
# wuerde den Startbefehl verdoppeln, der Weg darueber (node_modules in den
# gemounteten Ordner kopieren) dauert auf Windows Minuten.
# Git gehoert zur Werkbank, nicht als Beiwerk: der zweite Handgriff im Workshop
# ist "Aenderung ansehen, Aenderung verwerfen". Ohne Git waere das nur eine
# Behauptung. `safe.directory` verhindert die Eigentuemer-Warnung, wenn der
# Ordner vom Host kommt.
RUN apk add --no-cache git tini \
 && git config --global --add safe.directory '*'

WORKDIR /
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Die Vorlage selbst. Wird beim Start nach /work ausgerollt, falls dort noch
# nichts liegt. Ohne node_modules, die sind schon oben installiert.
COPY . /opt/vorlage/

# Was im Arbeitsordner nichts zu suchen hat: die Bauanleitung fuer dieses
# Image. Wer sie braucht, findet sie im Vorlagen-Repo. Im Ordner der
# Teilnehmenden soll das Modul liegen, nicht das Werkzeug, das es hinstellt.
RUN rm -rf /opt/vorlage/node_modules /opt/vorlage/dist /opt/vorlage/.git \
           /opt/vorlage/Dockerfile /opt/vorlage/.dockerignore \
           /opt/vorlage/docker /opt/vorlage/build-werkbank.sh

COPY docker/start.sh /usr/local/bin/werkbank-start
RUN chmod +x /usr/local/bin/werkbank-start

ENV PATH="/node_modules/.bin:${PATH}" \
    WERKBANK=1 \
    VITE_CACHE_DIR=/tmp/.vite

WORKDIR /work
EXPOSE 5173

# tini als PID 1, damit Strg+C den Container wirklich beendet.
#
# Ohne diese Zeile ist Node PID 1 (start.sh endet mit `exec vite`), und PID 1
# bekommt unter Linux KEINE Standard-Signalbehandlung: Signale ohne eigenen
# Handler werden verworfen, statt den Prozess zu beenden. Vite installiert
# einen SIGTERM-Handler, deshalb wirkte `docker stop` in einer Sekunde -
# SIGINT dagegen wurde ersatzlos geschluckt. Am 13.08.2026 gemessen: Nach
# Strg+C kam die Eingabeaufforderung zurueck, der Container lief weiter und
# hielt Port 5173, sodass der zweite Start an "port is already allocated"
# scheiterte. Es sah sauber aus und war es nicht - die schlimmste Sorte Fehler
# fuer einen Raum mit dreissig Leuten. Das Banner in start.sh nennt Strg+C als
# den Weg zum Beenden; mit tini stimmt das auch.
#
# tini laeuft als PID 1, faengt die Signale ab und reicht sie an Node weiter -
# das ist dann nicht mehr PID 1 und stirbt am Standardverhalten. Unsichtbar im
# Startbefehl, anders als `docker run --init`.
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["werkbank-start"]
