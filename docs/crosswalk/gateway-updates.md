# Updating Firmware

Your Crosswalk Gateway updates itself over your home network. You do not need to plug it back into a computer or use the install button again.

!!! info "Current Version"
    The latest Gateway firmware is **1.2.10**. Your Gateway shows the version it is currently running on the dashboard.

---

## 1. Open the Dashboard

Type `http://apex.local` into any browser on your home network.

!!! tip "Trouble finding the dashboard?"
    If `http://apex.local` doesn't load, look for **Crosswalk-Gateway** in your router's device list and type its IP address into your browser instead.

---

## 2. Check for an Update

Go to **Settings** and open the firmware update section. The Gateway checks with Apex Sensor Labs and tells you whether a newer version is available.

---

## 3. Install

Start the update and leave the Gateway alone. It downloads the new firmware, installs it, and restarts on its own.

!!! warning "Keep it powered"
    Do not unplug the Gateway while it is updating. Interrupting an update partway through can leave the device needing a USB reflash to recover.

---

## 4. Confirm

Once the Gateway restarts, reload `http://apex.local` and check that the version number on the dashboard has changed.

If the dashboard doesn't come back after a couple of minutes, unplug the Gateway for 10 seconds and plug it back in.

---

## What About the Sensors?

Crosswalk sensors do **not** update over the air. To update a sensor, connect it to your computer over USB and use the install button on the [Sensor Flashing](./sensor-flashing.md) page, exactly as you did during first-time setup.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Gateway Troubleshooting**](./gateway-troubleshooting.md)
-   [**Back to Home Page**](../index.md)

</div>
