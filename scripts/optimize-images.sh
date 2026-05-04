#!/usr/bin/env bash
# Optimize source photography from _source/images/ into assets/images/.
# Reproducible: run again at any time to regenerate derivatives.

set -euo pipefail

SRC=_source/images
HERO_DST=assets/images/hero
CONTENT_DST=assets/images/content

mkdir -p "$HERO_DST" "$CONTENT_DST"

# --- Hero: two widths, webp + jpg fallback at 1920w ---
HERO_SRC="$SRC/Blue-ridge-from-the-cockpit.png"
sips -Z 1920 -s format jpeg --setProperty formatOptions 80 \
  "$HERO_SRC" --out "$HERO_DST/blue-ridge-cockpit-1920.jpg" >/dev/null
cwebp -q 80 -resize 1920 0 "$HERO_SRC" \
  -o "$HERO_DST/blue-ridge-cockpit-1920.webp" >/dev/null
cwebp -q 80 -resize 960 0 "$HERO_SRC" \
  -o "$HERO_DST/blue-ridge-cockpit-960.webp" >/dev/null

# --- Content: single 1200w master, webp + jpg fallback ---
optimize_content() {
  local src_name=$1
  local out_name=$2
  local src_path="$SRC/$src_name"
  if [ ! -f "$src_path" ]; then
    echo "WARN: missing source $src_path"
    return
  fi
  sips -Z 1200 -s format jpeg --setProperty formatOptions 80 \
    "$src_path" --out "$CONTENT_DST/$out_name-1200.jpg" >/dev/null
  cwebp -q 80 -resize 1200 0 "$src_path" \
    -o "$CONTENT_DST/$out_name-1200.webp" >/dev/null
}

optimize_content headshot_smiling.jpeg                    headshot
optimize_content current_commercial_airline.png          current-commercial-airline
optimize_content pilatus-with-australia-background.jpg   pilatus
optimize_content glider_cockpit.jpeg                     glider-cockpit
optimize_content young_navy_aviator_suite.jpg            young-navy-aviator
optimize_content young_commercial_wings.jpeg             young-commercial-wings
optimize_content young_by_plane.jpeg                     young-by-plane
optimize_content young_by_plane_with_flight_helmet.jpeg  young-by-plane-helmet
optimize_content young_by_plane_on_ladder.jpeg           young-by-plane-ladder
optimize_content cockpit_flying.jpeg                     cockpit-flying
optimize_content cockpit_right_seat.jpeg                 cockpit-right-seat

echo "Done."
