# Step 3: Adding to Home

Now that your Apex Core is ready, you need to add it to your favorite smart home app. This makes the bridge "live" on your network and ready to connect your Zigbee devices.

---

### Before You Start
- Make sure your phone is on your home's **2.4GHz Wi-Fi**.
- Make sure **Bluetooth** is turned on.
- Ensure your Apex Core is powered on (LED should be **Solid Red**).

### Setup by Platform

When you plug your device in it should have a BRIGHT RED light, indicating it hasn't been commissioned yet.
![[Red]](./pictures/1-Core_Red.jpeg)

Choose your smart home platform below for specific instructions:

=== "Home Assistant"

    1. **Add Device:** In Home Assistant, navigate to the menu, and click "Devices & services".

        <img src="../pictures/10-Core_HA_Menu.png" style="height: 400px; width: auto;">

    2. **Device Menu:** Under devices in Home Assistant, locate and click the smart home integration.

        <img src="../pictures/11-Core_HA_Devices.png" style="height: 400px; width: auto;">

    3. **Integration Menu:** Under the integration menu, click "Add Device" at the top.

        <img src="../pictures/12-Core_HA_Matter.png" style="height: 400px; width: auto;">

    4. **Add Device:** Once the device prompt comes up, click "No, it's new".

        <img src="../pictures/13-Core_HA_New.png" style="height: 400px; width: auto;">

    5. **Home Add:** The add prompt will appear, asking to add the device to Home Assistant. Scan the QR code generated earlier, then click "Add".

        <img src="../pictures/14-Core_HA_Add.png" style="height: 400px; width: auto;">

    6. **Uncertified:** A warning will appear that the device is uncertified. If you agree, click "Add anyway".

        <img src="../pictures/15-Core_HA_Uncertified.png" style="height: 400px; width: auto;">

    7. **New Device:** Once finished, the device will appear in Home Assistant as a bridge device. You have now successfully added Apex Core to Home Assistant!

        <img src="../pictures/16-Core_HA.png" style="height: 400px; width: auto;">

    8. **Finish:** Once connected, the Apex Core LED will turn **Solid Blue** since it automatically turns Zigbee pairing/steering on to add the first sensor. After 60 seconds, it should turn **Solid Green**.

=== "Apple Home"

    1. **Open Apple Home:** Tap the `+` icon in the top right and select **Add Accessory**.

        ![[Apple_Start]](./pictures/21-Core_AppleHome_Start.png)

        ![[Apple_Start]](./pictures/22-Core_AppleHome_Add.png)

    2. **Scan QR:** Scan the **QR code generated earlier** to add to Apple Home. Apex Core can take a few minutes to add to Apple Home.

    3. **Select Location:** Select the room the bridge is in.

        ![[Room]](./pictures/23-Core_AppleHome_Room.png)

    4. **Success:** You have successfully added Apex Core to Apple Home! Now time to pair a sensor.

        ![[Apple_Success]](./pictures/24-Core_AppleHome_Added.png)

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Next Step: Pairing Sensors (Step 4)**](./pairing.md)

</div>
