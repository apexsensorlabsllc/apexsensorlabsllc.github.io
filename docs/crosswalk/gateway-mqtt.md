# MQTT Reference

This page lists every MQTT topic the Crosswalk Gateway uses. It's for people who want to use their room counts outside Home Assistant, for example in Node-RED, openHAB, Hubitat, or their own scripts.

!!! info "Using Home Assistant? You don't need this page"
    Home Assistant finds your Gateway, rooms, and sensors automatically. Everything on this page is already set up for you.

!!! warning "Requires an MQTT broker"
    The Gateway sends its data **to** an MQTT broker. It doesn't include one. You'll need a broker running on your network, such as the **Mosquitto broker** add-on in Home Assistant, or Mosquitto on another computer. Connect the Gateway to it in [Step 3: Connecting & Setup](./gateway-setup.md#3-smart-home-connection-mqtt).

    If the MQTT settings are left blank, the Gateway runs on its own and nothing on this page is available. You can still use the `apex.local` dashboard.

!!! info "Firmware version"
    Items marked **1.2.13+** need Gateway firmware 1.2.13 or later. Everything else works on all current firmware. See [Updating Firmware](./gateway-updates.md) to check your version.

---

## How Topics Are Named

Every topic starts with `apex/`. Rooms and sensors each have their own ID in the topic:

| ID | What it is | Example |
| :--- | :--- | :--- |
| `<room>` | The room's name when you first added it, in lowercase with spaces and symbols turned into hyphens. If two rooms would get the same ID, the second gets `-2` added. | "Living Room" → `living-room` |
| `<sensor>` | The sensor's **MAC**, shown on its card in the dashboard's **Sensors** tab. Always 12 lowercase characters. | `14c19fe1e574` |

!!! tip "Renaming a room keeps its ID"
    Renaming a room only changes the name you see. Its topic stays the same, so your automations keep working. Deleting a room and adding it again creates a new ID.

!!! warning "One Gateway per broker"
    Topics don't include the Gateway's name, so two Gateways connected to the same broker would overwrite each other's data.

---

## Gateway Status

| Topic | Payload |
| :--- | :--- |
| `apex/status` | `online` while the Gateway is connected, `offline` if it drops off. The broker sends `offline` for the Gateway if it loses power or Wi-Fi. |

---

## Room Topics

Published for every room, whenever its count changes.

| Topic | Payload |
| :--- | :--- |
| `apex/room/<room>/count` | Number of people in the room, e.g. `2`. Never goes below `0`. |
| `apex/room/<room>/occupied` | `ON` when the count is above 0, otherwise `OFF`. |
| `apex/room/<room>/last_changed` | When the count last changed. See [Timestamps](#timestamps). |

---

## Sensor Topics

Published for every paired sensor.

| Topic | Payload |
| :--- | :--- |
| `apex/sensor/<sensor>/battery` | Battery level in percent, e.g. `87`. Battery-Powered sensors only. |
| `apex/sensor/<sensor>/voltage_mv` | Battery voltage in millivolts, e.g. `3912`. Battery-Powered sensors only. |
| `apex/sensor/<sensor>/rssi` | Signal strength in dBm, e.g. `-62`. Closer to 0 is stronger. |
| `apex/sensor/<sensor>/last_seen` | When the Gateway last heard from the sensor. See [Timestamps](#timestamps). |
| `apex/sensor/<sensor>/invert` | `ON` if the counting direction is inverted, otherwise `OFF`. |
| `apex/sensor/<sensor>/door_left` | Left door state as reported by the sensor: `ON` = open, `OFF` = closed. |
| `apex/sensor/<sensor>/door_right` | Right door state as reported by the sensor: `ON` = open, `OFF` = closed. |
| `apex/sensor/<sensor>/fw_version` | The sensor's firmware version, e.g. `0x03`. |

---

## System Topics

| Topic | Payload |
| :--- | :--- |
| `apex/system/total_occupancy` | Total people across all rooms, e.g. `3`. |
| `apex/system/sensor_count` | Number of sensors currently online. |
| `apex/system/pairing` | `ON` while the Gateway is accepting new sensors, otherwise `OFF`. **1.2.13+** |

---

## Commands

Publish to these topics to control the Gateway.

| Topic | Payload | What it does |
| :--- | :--- | :--- |
| `apex/room/<room>/reset/cmd` | Anything | Sets the room's count to 0. |
| `apex/room/<room>/adjust/up/cmd` | Anything | Adds 1 to the room's count. |
| `apex/room/<room>/adjust/down/cmd` | Anything | Subtracts 1 from the room's count (it won't go below 0). |
| `apex/sensor/<sensor>/invert/cmd` | `ON` or `OFF` | Inverts the sensor's counting direction, or sets it back. |
| `apex/sensor/<sensor>/repair/cmd` | Anything | Tells the sensor to pair again, the same as **Force Re-pair** on the dashboard. |
| `apex/system/reset_all/cmd` | Anything | Sets every room's count to 0. |
| `apex/system/pairing/cmd` | `ON` or `OFF` | Turns pairing on or off. Pairing turns off on its own after 30 minutes, or if the Gateway restarts. Sending `ON` while it's already on restarts the 30 minutes. **1.2.13+** |
| `apex/system/time/cmd` | Unix time in seconds, e.g. `1763200000` | Sets the Gateway's clock. Optional: you don't normally need this. See [Timestamps](#timestamps). **1.2.13+** |

!!! danger "Don't send commands with the retain flag"
    The Gateway's own data is retained by the broker so new apps get current values straight away. Commands must **not** be retained. A retained command is sent to the Gateway again every time it reconnects, so a retained `reset/cmd` would zero that room after every restart.

---

## Timestamps

!!! warning "Format changed in 1.2.13"
    Before 1.2.13, `last_changed` and `last_seen` were a plain number. They're now a small JSON message. If you read these topics in Node-RED or a script, update it when you upgrade. Home Assistant handles the change for you.

On **1.2.13+**, `last_changed` and `last_seen` look like this:

```json
{"t": 1763200000, "age": 42}
```

| Field | Meaning |
| :--- | :--- |
| `t` | When it happened, as Unix time in seconds. `0` if the Gateway doesn't know the time yet. |
| `age` | How many seconds before this message it happened. `-1` if it happened before the Gateway last restarted. |

**To get the time:** use `t` if it isn't `0`. Otherwise, if `age` isn't `-1`, subtract `age` from the time the message arrived. If `t` is `0` and `age` is `-1`, the time is unknown.

The Gateway sets its clock on its own, from the internet or from your browser when you open the dashboard, so you don't need to set anything up. `apex/system/time/cmd` is there if you'd rather set the clock yourself.

!!! info "Earlier firmware"
    Before 1.2.13, the Gateway has no real clock, so `last_changed` and `last_seen` aren't reliable. Use the time your broker receives the message instead.

---

## Examples

These use the `mosquitto_sub` and `mosquitto_pub` command-line tools. Replace `192.168.1.10` with your broker's address, and add `-u <username> -P <password>` if your broker needs a login.

**Watch everything the Gateway sends:**

```sh
mosquitto_sub -h 192.168.1.10 -t 'apex/#' -v
```

**Watch one room's count:**

```sh
mosquitto_sub -h 192.168.1.10 -t 'apex/room/living-room/count'
```

**Reset a room to 0:**

```sh
mosquitto_pub -h 192.168.1.10 -t 'apex/room/living-room/reset/cmd' -m 'reset'
```

**Invert a sensor's direction:**

```sh
mosquitto_pub -h 192.168.1.10 -t 'apex/sensor/14c19fe1e574/invert/cmd' -m 'ON'
```

In Node-RED, an **mqtt in** node subscribed to `apex/room/+/count` gives you every room's count, with the room ID in `msg.topic`.

---

## Home Assistant Discovery

The Gateway also publishes the setup messages Home Assistant uses to find it, under the `homeassistant/` prefix. If your system uses a different prefix, change **Discovery prefix** in the MQTT section of the dashboard's **Settings** tab. Other systems can ignore these messages.

On **1.2.13+**, the Gateway also listens on `homeassistant/status` (or `<your prefix>/status`). Whenever Home Assistant restarts and sends `online` there, the Gateway sends all of its current data again.

??? info "Diagnostic topics"
    Each sensor also reports battery-life statistics under `apex/sensor/<sensor>/`: `wakes`, `awake_ms`, `queue_len`, `cum_wakes`, `cum_events`, `cum_awake_ms`, and `cold_boots`. They're used by Apex support to investigate battery drain, and they may change between firmware versions, so don't build automations on them.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Gateway Troubleshooting**](./gateway-troubleshooting.md)
-   [**Back to Home Page**](../index.md)

</div>
