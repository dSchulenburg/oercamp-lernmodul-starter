#!/bin/sh
# Baut das Werkbank-Image und schiebt es auf Docker Hub.
#
#   ./build-werkbank.sh            Multi-Arch (Intel/AMD + Apple Silicon) + Push
#   ./build-werkbank.sh --lokal    nur die eigene Architektur, kein Push, zum Testen
#   ./build-werkbank.sh --usb      zusaetzlich eine Tar-Datei fuer den USB-Stick
#
# Voraussetzung fuer den Push: docker login, Docker Desktop laeuft.
set -e
cd "$(dirname "$0")"

IMAGE="dadalama/oercamp-werkbank"
TAG="1.0"

case "$1" in
  --lokal)
    echo ">>> Lokaler Build (nur eigene Architektur, kein Push)"
    docker build -t "$IMAGE:$TAG" -t "$IMAGE:latest" .
    echo
    echo "Fertig. Test:"
    echo "  mkdir test && cd test"
    echo "  docker run --rm -it -p 5173:5173 -v \"\${PWD}:/work\" $IMAGE:$TAG"
    exit 0
    ;;
  --usb)
    echo ">>> Tar-Datei fuer den USB-Stick (Fallback ohne WLAN)"
    # Absichtlich nur amd64: die Sticks sind fuer Notfaelle im Raum, und ein
    # Multi-Arch-Tarball waere doppelt so gross. Apple-Silicon-Leute ziehen
    # das Image vorher zu Hause.
    docker pull --platform linux/amd64 "$IMAGE:$TAG"
    docker save "$IMAGE:$TAG" -o werkbank-amd64.tar
    ls -lh werkbank-amd64.tar
    echo
    echo "Auf den Stick damit. Einlesen beim Teilnehmer:"
    echo "  docker load -i werkbank-amd64.tar"
    exit 0
    ;;
esac

# Mehrere Architekturen brauchen einen Container-Builder. Der Default-Builder
# kann das nicht. Anders als bei ki-kurs-box ist das hier unkritisch: gebaut
# wird nur ein npm ci mit einer Handvoll Pakete, keine Moodle-Installation.
docker buildx inspect werkbank >/dev/null 2>&1 \
  || docker buildx create --name werkbank --driver docker-container

echo ">>> Build fuer linux/amd64 + linux/arm64, danach Push"
docker buildx build \
  --builder werkbank \
  --platform linux/amd64,linux/arm64 \
  --tag "$IMAGE:$TAG" \
  --tag "$IMAGE:latest" \
  --push \
  .

echo
echo "Fertig: $IMAGE:$TAG (amd64 + arm64) auf Docker Hub."
echo "Probe:  docker run --rm -it -p 5173:5173 -v \"\${PWD}:/work\" $IMAGE:$TAG"
