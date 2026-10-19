# Apex Sensor Labs — Documentation

Source for [docs.apexsensorlabs.com](https://docs.apexsensorlabs.com), the setup
and troubleshooting site for **Apex Crosswalk** and the **Crosswalk Gateway**.
Built with [MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## Local development

```sh
python3 -m venv venv
./venv/bin/pip install -r requirements.txt

# Serve at http://localhost:8000
./venv/bin/mkdocs serve
```

To exercise the WebSerial flashing buttons from another machine on the LAN,
put `mkdocs serve` behind a local HTTPS reverse proxy — Web Serial only works
in a secure context, so plain `http://` over the network will not do. That
proxy config is kept outside this repo.

Before pushing, build the way CI does:

```sh
./venv/bin/mkdocs build --strict
```

`--strict` turns broken links and missing images into errors. The deploy
workflow uses it too, so a push that fails this will not reach the live site.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it to the `gh-pages` branch. The custom domain comes from
`docs/CNAME`, which MkDocs copies into the build.

Dependencies are pinned in `requirements.txt`. Material for MkDocs has announced
that MkDocs 2.0 removes the plugin system and rewrites theming with no migration
path, and this site uses a theme override (`overrides/main.html`), so bump those
pins deliberately and rebuild locally before pushing.

## Layout

| Path | What it is |
| :--- | :--- |
| `mkdocs.yml` | Site config, nav, theme, markdown extensions |
| `docs/` | All source Markdown |
| `docs/crosswalk/` | Gateway and Sensor walkthroughs |
| `docs/crosswalk/firmware/` | Binaries served to ESP Web Tools and gateway OTA |
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

`docs/apex-core/flasher.md` contains a custom dynamic WebSerial flasher and must
not be modified.

## Firmware versions

| Device | Version | Manifest |
| :--- | :--- | :--- |
| Crosswalk Gateway | 1.2.2 | `docs/crosswalk/gateway-manifest.json` |
| Crosswalk Sensor | 1.0.0 | `docs/crosswalk/sensor-manifest.json` |

A Gateway release means updating, in step: the binaries in
`docs/crosswalk/firmware/`, the version in `gateway-manifest.json`, the version
and notes in `firmware/gateway-ota-version.json`, and the version quoted on
`docs/crosswalk/gateway-updates.md`.

---

© 2026 Apex Sensor Labs LLC
