<p align="center">
  <img src="docs/assets/apex_logo_dark_transparent_black.png" alt="Apex Sensor Labs" width="260">
</p>

<h1 align="center">Apex Crosswalk</h1>

<p align="center">
  <strong>Count people, not motion.</strong><br>
  Local-first occupancy sensing for the smart home.
</p>

<p align="center">
  <a href="https://docs.apexsensorlabs.com"><strong>Read the setup guides →</strong></a>
</p>

---

Motion sensors guess. They trip when the cat walks past, and they switch the
lights off on anyone sitting still. **Apex Crosswalk** counts people as they
pass through a doorway and tracks which direction they went, so your lights,
heating, and fans respond to how many people are actually in a room.

Everything runs on your own network. No cloud account, no subscription, and no
camera or microphone anywhere in the system.

## The hardware

| | |
| :--- | :--- |
| **Crosswalk Sensor** | Battery-powered, mounts at the top of a doorframe and looks straight down. Two time-of-flight zones give it direction as well as presence. Talks to the Gateway over ESP-NOW, which is cheap enough on power to run months per charge. |
| **Crosswalk Gateway** | The coordinator. Listens for the sensors, aggregates per-room counts, and publishes them over MQTT — with Home Assistant discovery on by default, so rooms and sensors appear on their own. Has its own dashboard at `apex.local`. |
| **Apex Core** | A universal local bridge. Parked while Crosswalk is in beta. |

Both devices are flashed from the browser — no toolchain, no command line. The
install buttons need Chrome or Edge, which are the browsers that support Web
Serial.

## Where to start

- **[Crosswalk Gateway setup](https://docs.apexsensorlabs.com/crosswalk/gateway/)** — do this first; sensors have nothing to talk to until the Gateway is online.
- **[Crosswalk Sensor setup](https://docs.apexsensorlabs.com/crosswalk/)** — flash, pair, assemble, mount.
- **[FAQ](https://docs.apexsensorlabs.com/faq/)** and **[Support](https://docs.apexsensorlabs.com/support/)**

Crosswalk is in beta. There is no cloud portal to log into, which also means
nobody can reach into your Gateway remotely — support happens by email, walking
you through your own network. Reach us at **support@apexsensorlabs.com**.

Apex Sensor Labs is a single-engineer operation: the PCBs, enclosures,
firmware, and these docs are all built by one person.

---

## About this repository

This repo is the source for [docs.apexsensorlabs.com](https://docs.apexsensorlabs.com),
built with [MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). It also
hosts the firmware binaries the browser installers and the Gateway's
over-the-air updater pull from.

### Building

```sh
python3 -m venv venv
./venv/bin/pip install -r requirements.txt

# Serve at http://localhost:8000
./venv/bin/mkdocs serve

# Build the way CI does before pushing
./venv/bin/mkdocs build --strict
```

`--strict` turns broken links and missing images into errors rather than
shipping them. To exercise the Web Serial install buttons from another machine
on the LAN, put `mkdocs serve` behind a local HTTPS reverse proxy — Web Serial
only works in a secure context. That proxy config is kept outside this repo.

### Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it to `gh-pages`. The custom domain comes from `docs/CNAME`, which
MkDocs copies into the build.

Dependencies are pinned in `requirements.txt`. Material for MkDocs has announced
that MkDocs 2.0 removes the plugin system and rewrites theming with no migration
path, and this site uses a theme override (`overrides/main.html`), so bump those
pins deliberately and rebuild locally first.

### Layout

| Path | What it is |
| :--- | :--- |
| `mkdocs.yml` | Site config, nav, theme, markdown extensions |
| `docs/crosswalk/` | Gateway and Sensor walkthroughs |
| `docs/crosswalk/firmware/` | Binaries served to ESP Web Tools and Gateway OTA |
| `docs/apex-core/` | Apex Core docs — **excluded from the build** while Core is parked |
| `docs/assets/` | Logos and the Open Graph share card |
| `docs/stylesheets/extra.css` | Brand colors, landing tiles, banner |
| `overrides/main.html` | Top banner and social metadata |

### Apex Core is parked, not deleted

`exclude_docs` in `mkdocs.yml` keeps `apex-core/*.md`, `apex-core/flasher/` and
`apex-core/pictures/` out of the build during the Crosswalk beta, so those pages
are neither routable nor in the search index.

`docs/apex-core/firmware/` is deliberately **not** excluded. Its `version.json`
advertises `https://docs.apexsensorlabs.com/apex-core/firmware/translator.bin`
as the OTA endpoint, and removing it would break updates for any Apex Core
already in the field. To bring Core back, delete the `exclude_docs` block and
restore its nav entries.

`docs/apex-core/flasher.md` contains a custom dynamic Web Serial flasher and
must not be modified.

### Firmware versions

| Device | Version | Manifest |
| :--- | :--- | :--- |
| Crosswalk Gateway | 1.2.2 | `docs/crosswalk/gateway-manifest.json` |
| Crosswalk Sensor | 1.0.0 | `docs/crosswalk/sensor-manifest.json` |

A Gateway release means updating, in step: the binaries in
`docs/crosswalk/firmware/`, the version in `gateway-manifest.json`, the version
and notes in `firmware/gateway-ota-version.json`, and the version quoted on
`docs/crosswalk/gateway-updates.md`. Sensors have no OTA path — they are
reflashed over USB from the Sensor Flashing page.

---

<p align="center">
  © 2026 Apex Sensor Labs LLC · <a href="https://apexsensorlabs.com">apexsensorlabs.com</a>
</p>
