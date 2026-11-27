# Step 2: Flashing Your Gateway

The Crosswalk Gateway is the "hub" for your Apex Crosswalk sensors. Before it joins your home, you'll install the latest firmware on it.

!!! tip "Why we Flash First"
    To ensure you have the absolute latest features and the most secure, privacy-focused version of our local software, we start every setup by quickly updating the device's firmware. This ensures your hardware is running the best possible version of the Crosswalk Gateway before it joins your home.

!!! info "Browser Requirement"
    You **must** use **Google Chrome** or **Microsoft Edge** on a **Windows PC or Mac** to flash your device. We do not support other browsers for flashing.

    **Reading this on your phone?** Open **docs.apexsensorlabs.com** on your computer and go to **Crosswalk Gateway → Step 2: Flashing**.

---

## Preparation
- **Crosswalk Gateway Hub**
- **USB-C Cable**
- **Computer** with Chrome or Edge installed.

## Finding the BOOT Button

To flash the Gateway, you need to hold down its BOOT button while you plug it in. The button is inside the case, so **take the lid off the case** first. There are two small buttons on the board. The BOOT button is the one **closest to the USB-C port**, circled below.

![Gateway with the case lid removed, the BOOT button closest to the USB-C port circled in red](./pictures/2-NoLid_BOOT.jpeg)

## Flashing Procedure

1.  **Connect:** Hold down the BOOT button, circled in red above. With the button held down, plug the Gateway into your computer's USB port. Let go of the boot button once it's plugged in.

2.  **Start Flash:** Click the **Install** button below.

    <div align="center">
        <script type="module" src="https://unpkg.com/esp-web-tools@10.5.2/dist/web/install-button.js?module"></script>
        <esp-web-install-button manifest="../gateway-manifest.json">
            <button slot="activate" class="md-button md-button--primary">Install Crosswalk Gateway</button>
        </esp-web-install-button>
    </div>

3.  **Select Device:** A small window will pop up. Select the entry that says "USB Serial" or "Enhanced COM Port" and click **Connect**.

    ![Browser serial port picker with the USB Serial device selected](./pictures/5-CommsPort.jpg)

4. **Install Gateway Firmware:** Click Install Crosswalk Gateway

    ![ESP Web Tools dialog with the Install Crosswalk Gateway option](./pictures/6-Install.jpg)

5. **Click Confirm:** Click Confirm to finish installation.

    ![ESP Web Tools confirmation dialog before installation begins](./pictures/8-Confirm.jpg)

6.  **Wait:** Do not unplug the device until the screen says "Installation Complete". 

7.  **Finish:** Unplug the Gateway and put the lid back on the case. Your Gateway is now ready to connect to your home network.

---

??? warning "Beta firmware (for testers)"
    Beta firmware lets you try new features before they're released. It's still being tested, so it may have bugs. **If you're setting up your Gateway for the first time, use the regular install button above.**

    **Current beta: 1.3.3.** Adds a **Mounting** setting for each sensor, for doorways taller than a standard door: **Standard (6'8" door)**, **7 ft door**, **8 ft door**, and **Custom (advanced)**. Also fixes sensors that stop reporting after your router changes its Wi-Fi channel, until the Gateway is restarted.

    !!! danger "Put your Gateway and all your sensors on the beta together"
        A beta Gateway doesn't work with sensors on the regular firmware, and a regular Gateway doesn't work with beta sensors. If you install the beta on your Gateway, install it on **every** sensor too. See [Sensor Flashing](./sensor-flashing.md).

    To install it, follow the same steps above, but click this button in step 2 instead:

    <div align="center">
        <esp-web-install-button manifest="../gateway-beta-manifest.json">
            <button slot="activate" class="md-button">Install Crosswalk Gateway (Beta)</button>
        </esp-web-install-button>
    </div>

    **Once you're on the beta:**

    - **Turn off update checks:** In the dashboard, open **Settings**, find the **Firmware** section, and untick **Auto-check for updates**.
    - **"Update available: 1.2.13" means going back:** The Gateway offers the regular release as an update, because it's a different version from the beta. Clicking **Install Update** takes the Gateway off the beta, and your beta sensors will stop working with it until you put them back on the regular firmware too. Only click it if you're leaving the beta.
    - **New betas come by USB only:** Your Gateway won't receive future betas on its own. To get one, install it again with the button above.
    - **Going back to the regular firmware:** Put the Gateway back by clicking **Install Update** when it shows "Update available: 1.2.13" (press **Check for Updates** first if auto-check is off), or with the regular install button above. Then reinstall the regular firmware on **every** sensor from the [Sensor Flashing](./sensor-flashing.md) page.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Next Step: Connecting & Setup (Step 3)**](./gateway-setup.md)

</div>
