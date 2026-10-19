# Apex Core Help & Troubleshooting

If your bridge isn't working quite right, follow these simple steps to get back on track.

## Understanding the LED Light

The light on the front of your Apex Core tells you exactly what it's doing.

![[Core]](./pictures/1-Core_Red.jpeg)

| LED Color | What it Means | What to Do |
| :--- | :--- | :--- |
| 🔴 **Solid Red** | Needs Setup | Add it to your Apple Home or Home Assistant app. |
| 🟢 **Solid Green** | Paired Successfully | Everything is working correctly! |
| 🔵 **Solid Blue** | Pairing Mode | It is looking for new Zigbee sensors. |
| 🔵 **Blue Blink** | Phase 1 | Release button to start pairing sensors. |
| 🟡 **Yellow Blink** | Phase 2 | Release button to reset the Wi-Fi connection. |
| 🔴 **Red Blink** | Phase 3 | Release button for a full Factory Reset (erases everything). |
| ⚪ **White Blink** | Cancel | Release button to do nothing (safety cancel). |

---

## My Sensor Isn't Appearing
If you tried to add a sensor but don't see it in your app:

1.  **Is it in Range?** Move the sensor closer to the bridge (within 5 feet) just for the first pairing.
2.  **Reset the Sensor:** Most sensors need you to hold their reset button for 5-10 seconds until their own light flashes.
3.  **Wait a Moment:** It can take up to 30 seconds for the new sensor to "wake up" in your smart home app.

---

## Starting Over (Smart Home Connection Reset)
If you want to move your bridge to a different app (like switching from Apple Home to Home Assistant):

<video controls width="100%">
  <source src="../pictures/Pairing.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Remember - Yellow means that it resets the pairing to your smart home network, but keeps track of all the paired Zigbee devices. Red means it clears both the commissioning to your smart home network **and** your paired zigbee devices.

1.  **Hold the Button:** Press and hold the **BOOT button** on the top.
2.  **Wait for Yellow:** Keep holding until the LED starts a **Slow Yellow Blink**.
3.  **Let Go:** Release the button.
4.  **Pair Again:** You can now scan the QR code into your new app. (Your existing Zigbee sensors will stay saved!)

---

## Removing the Bridge from Your App

### Apple Home
1.  Open the **Apple Home** app.
2.  Find the **Apex Core** and tap the **Settings (Gear)** icon.
3.  Scroll to the very bottom and tap **Remove from Home**.

### Home Assistant
1.  Go to **Settings** > **Devices & Services**.
2.  Select the smart home integration.
3.  Find your **Apex Core**, click the three dots, and select **Delete**.

Removing Apex Core will automatically remove any bridged devices.

---

## Removing a Sensor
If you want to remove a single sensor from your bridge, you don't need to touch the Apex Core hardware.

1.  **Open Your App:** Open Apple Home, Home Assistant, or Google Home.
2.  **Delete the Sensor:** Find the specific sensor you want to remove and select **Delete** or **Remove**.
3.  **Automatic Sync:** The Apex Core will automatically detect this removal and clear that Zigbee sensor from its internal memory. 

---

## Removing Everything (Factory Reset)
If you want to clear your entire network and start fresh (removing **all** paired Zigbee sensors):

1.  **Hold the Button:** Press and hold the **BOOT button** on the side.
2.  **Wait for Red:** Keep holding past the Blue and Yellow phases until the LED starts a **Slow Red Blink**.
3.  **Let Go:** Release the button. The bridge will reboot and all sensor data will be erased.
4.  **Pairing:** You will now need to pair your sensors again from scratch.

---

!!! tip "Simple Tip"
    If the bridge seems stuck, just unplug it from the wall, wait 10 seconds, and plug it back in. Most of the time, this fixes the issue!
