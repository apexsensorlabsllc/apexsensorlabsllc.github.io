# Step 1: Flashing Your Sensor

The Crosswalk Sensor is the part that goes on your door. You need to flash it before you mount it.

!!! tip "Why we Flash First"
    To ensure you have the absolute latest features and the most secure, privacy-focused version of our local software, we start every setup by quickly updating the device's firmware. This ensures your sensor is running the most battery-efficient version of our code.

!!! info "Browser Requirement"
    You **must** use **Google Chrome** or **Microsoft Edge** on a computer to flash your device. Other browsers like Safari or Firefox do not support the connection needed.

---

## Preparation
- **Crosswalk Sensor**
- **USB-C Cable**
- **Computer** with Chrome or Edge installed.

## Flashing Procedure

1.  **Connect:** Plug your Crosswalk Sensor into your computer.

2.  **Flash:** Click the **Install** button below.

    <div align="center">
        <script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"></script>
        <esp-web-install-button manifest="../sensor-manifest.json">
            <button slot="install" class="md-button md-button--primary">Install Crosswalk Sensor</button>
        </esp-web-install-button>
    </div>

3.  **Wait:** Do not unplug the sensor until the screen says "Installation Complete". 

4.  **Ready:** Your sensor is now ready to be paired with your Gateway.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Next Step: Pairing & Configuration (Step 2)**](./sensor-config.md)

</div>

