# Step 2: Pairing & Configuration

Before you mount the sensor, you need to link it to your Gateway. Keep the sensor near you for this step, since you'll power it on while the Gateway is waiting for it.

---

## 1. Linking to the Gateway
To add a new sensor, you must first put the Gateway into "Pairing Mode."

1.  **Open Dashboard:** Navigate to `http://apex.local` on your browser. Go to the Sensors tab.

    ![Sensors tab on the Apex Gateway dashboard](./pictures/19-Sensors.jpg)

2.  **Open the Pairing Window:** In the **Add Sensor** card, click **Open Pairing Window (60s)**.

    ![Add Sensor card with pairing mode active and a 60 second countdown running](./pictures/20-Pairing.jpg)

3.  **The Countdown:** A 60-second countdown will appear on your screen that allows a Crosswalk Sensor to start pairing.

4.  **Activate the Sensor:** While the timer is counting down, power on your Crosswalk sensor. It will automatically boot up and initiate the pairing sequence with the Crosswalk Gateway.

    === "Battery-Powered"

        The battery is already inside the case, but it isn't plugged in. To connect it:

        1.  Slide the back cover of the case **partway** open. You only need enough room to reach the battery plug, so don't take it all the way off.
        2.  Plug the battery's small white connector into the matching socket on the board.
        3.  Slide the back cover closed again.

        ![Back cover slid partway open, showing the battery and its plug next to the board](./pictures/CW_Slide_Top.jpeg)

        !!! info "Watch the dashboard, not the sensor"
            Once it's running on battery, the sensor keeps all of its lights off to save power — so there is no light to tell you it is awake and working. The Gateway dashboard is where you confirm pairing.

    === "Hardwired"

        Plug a USB-C cable into the sensor and into a USB power adapter.

        !!! info "Watch the dashboard, not the sensor"
            The red power light and the green light come on as soon as the sensor has power. They only mean the board is powered, not that it has paired. The Gateway dashboard is where you confirm pairing.

    - **Note:** The sensor will scan for the Gateway automatically.

5.  **Success:** When successful, the dashboard will display "Sensor Paired Successfully" and the new device will appear in your list.

    ![Gateway dashboard confirming the sensor paired successfully](./pictures/21-PairingSuccess.jpg)

6. **Home Assistant:** Check out your new sensor in Home Assistant!

    ![Home Assistant showing the Crosswalk rooms and sensors](./pictures/22-HA%20Rooms%20Sensors.jpg)

    The Apex Crosswalk Gateway should now show a connected sensor as well.

    ![Apex Gateway device page in Home Assistant listing the connected sensor](./pictures/23-HA%20Landing.jpg)

    Check out a Room.

    ![Home Assistant room entity showing the current occupancy count](./pictures/24-HA%20Room.jpg)

    Now go look at the sensor.

    ![Home Assistant device page for an individual Crosswalk sensor](./pictures/25-HA%20Sensor.jpg)

---

## 2. Device Settings
Now you can customize how this sensor behaves in your home. Go back to the Apex Gateway web page.

1.  **Find Your Sensor:** On the **Sensors** tab, find your new sensor in the list. A new sensor is named **Sensor** followed by a four-character code, such as `Sensor e574`, and shows an **online** badge.

2.  **Rename It:** On that sensor's card, click the **Rename** button below the Mode menu. Give it a clear name like "Office Door" or "Office - Bathroom Door", then confirm.

    ![Sensor card on the Sensors tab with the Rename button below the Mode menu](./pictures/21-PairingSuccess.jpg)

!!! info "Leave the Mode as 'Not configured' for now"
    You'll choose the counting mode in the next step, once the sensor is mounted on the doorway. Until then it won't count anyone.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Next Step: Mounting (Step 3)**](./sensor-install.md)

</div>
