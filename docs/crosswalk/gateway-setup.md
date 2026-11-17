# Step 3: Connecting and Setup

Now you need to connect your Gateway to your home Wi-Fi and set up its connection to your smart home app.

---

## 1. Wi-Fi Configuration

1.  **Power On:** Plug your Gateway into a USB power adapter in a wall outlet. It doesn't need to stay connected to your computer. Give it a moment to start up.

2.  **Find the Hotspot:** On your phone or computer, open your Wi-Fi settings. Look for a network starting with `Apex-Setup` — each Gateway adds its own four-character suffix, so yours will look something like `Apex-Setup-ca3f`.

    <img src="../pictures/9-Wifi.png" alt="Phone Wi-Fi settings showing the Apex-Setup network" style="height: 400px; width: auto;">

3.  **Connect:** Join that network. Once connected, open a web browser on your phone and visit "http://192.168.4.1".

    <img src="../pictures/10-Setup.png" alt="The Apex Gateway Setup page loaded at 192.168.4.1" style="height: 400px; width: auto;">

4.  **Enter Credentials:** Pick your home's 2.4GHz Wi-Fi network from the list, type your password, and click **Connect**.

    <img src="../pictures/11-WifiSetup.png" alt="Apex Gateway Setup page with the Wi-Fi network and password fields filled in" style="height: 400px; width: auto;">

    !!! tip "List says 'No networks found'?"
        Give the Gateway a few seconds to finish scanning and reload the page. You can also type your network name into the top box by hand.

5.  **Connected:** A message appears below the **Connect** button saying **Connected!**, with two addresses for your Gateway: `http://apex.local` and a number address such as `http://192.168.1.50`. **Write down the number address**, since you may need it in the next section. The Gateway then restarts and joins your home network.

    <img src="../pictures/Wifi_Setup.png" alt="Apex Gateway Setup page with the Connected! message and the Gateway's addresses below the Connect button" style="height: 400px; width: auto;">

    !!! info "The message is red, but it worked"
        The **Connected!** message is shown in red text. As long as it says **Connected!**, your Gateway has joined your Wi-Fi.

    !!! info "Saw a different message?"
        Sometimes your phone drops off the `Apex-Setup` network before the Gateway can reply. The page will then say **The gateway is joining your WiFi**. That's normal: carry on to the next step. If the Gateway doesn't show up within a minute, see [Gateway Doesn't Show Up After Wi-Fi Setup](./gateway-troubleshooting.md#gateway-doesnt-show-up-after-wi-fi-setup).

6.  **Reconnect Your Phone:** Switch your phone back to your home Wi-Fi network.

---

## 2. The Apex Dashboard
Your Gateway has its own "Control Panel" that you can access from any browser in your house.

1.  **Open Browser:** Type `http://apex.local` into your browser's address bar.

    !!! tip "Trouble finding the dashboard?"
        Some phones (especially Android) and routers don't support `apex.local`. Type the number address from the **Connected!** message instead, e.g. `http://192.168.1.50`. If you didn't write it down, look for 'Crosswalk-Gateway' in your router's device list to find it.

2.  **The Main Screen:** You should now see the Apex Gateway dashboard, with the Rooms, Sensors, Settings, and Status tabs across the top.

    ![Apex Gateway dashboard on the Rooms tab, showing no rooms added yet](./pictures/12-Landing.jpg)

---

## 3. Smart Home Connection (MQTT)
To send the person counts to Home Assistant or other apps, you need to set up "MQTT".

1.  **Go to Settings:** On the dashboard, click the **Settings** tab at the top, then scroll down to find the **MQTT** section.

    ![Gateway dashboard Settings tab](./pictures/13-Settings.jpg)

2.  **Type Broker Info:** Enter your MQTT Broker's address (usually the IP of your Home Assistant server).

    ![MQTT settings card with broker host, port, username, and password fields](./pictures/14-MQTT.jpg)

    !!! tip "Test before you save"
        Click **Test Connection** to check your details before saving. If the test fails, double-check the address, username, and password. Fixing them now saves you a restart.

3.  **Save:** Click **Save**. The Gateway restarts to apply your settings.

    !!! info "'Reconnecting' message won't go away?"
        While the Gateway restarts, the dashboard may show a **Reconnecting** message that stays on screen even after the Gateway is back. This is normal. Wait a minute, then close the message.

4.  **Check the Connection:** Click the **Status** tab at the top of the dashboard. Next to **MQTT**, it should say **Connected**.

    ![Gateway Status tab showing MQTT as Connected](./pictures/15-MQTT-Connected.jpg)

    If it says **Disconnected**, see [MQTT Connection Problems](./gateway-troubleshooting.md#mqtt-connection-problems).

---

## 4. Gateway Connected
Your Apex Crosswalk Gateway is now connected and set up. It uses the Home Assistant discovery message by default, so your Gateway and your Crosswalk sensors appear automatically in Home Assistant or any smart home hub of your choice. Go check it out in your smart home!

![Home Assistant MQTT integration listing the discovered Apex Gateway](./pictures/16-HA%20MQTT.jpg)

![Apex Gateway device page in Home Assistant](./pictures/17-HA_Landing.jpg)

Your Apex Gateway lists information for you here to include 'Total Occupancy'. This is an aggregation of all room counts between all of your Crosswalk Sensors. If two people are in your 'Office' and one person is in the 'Living Room' this count would be 3. This also lists and links to all of your Crosswalk sensor devices. You can easily click 'Reset All Rooms' to revert the room counts to 0 across your entire setup.

!!! tip "Not using Home Assistant?"
    Systems like Node-RED, openHAB, or Hubitat can read your counts straight from MQTT. See the [MQTT Reference](./gateway-mqtt.md) for every topic the Gateway uses.

---

## 5. Add Rooms
Now we need to add and configure rooms before adding a sensor. Go to the Rooms tab at the top and add some rooms!

1. **Add a Room:** Type in the room name and click 'Add'

    ![Add Room card on the Rooms tab with a room name typed in](./pictures/15-Rooms.jpg)

2. **Configure Rooms:** Now that you have rooms set up, you can reset the counts, increment, decrement the room count, rename the room, or delete the room. This all syncs over MQTT to your smart home setup.

    ![Rooms tab listing several added rooms with their count controls](./pictures/18-RoomsAdded.jpg)

3. **Set up Sensors:** Now it's time to go set up your Crosswalk sensors. Click the link below to start setting up a sensor.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Next Step: Set up your Sensors**](./index.md)
-   [:octicons-arrow-right-24: **Keeping the Gateway Updated**](./gateway-updates.md)

</div>
