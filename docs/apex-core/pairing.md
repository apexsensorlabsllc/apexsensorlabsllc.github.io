# Step 4: Pairing Sensors

Your bridge is now online! The last step is to pair your Zigbee sensors (like door or motion sensors) so they show up in your app.

---

### Understanding the LED Light

The LED light tells you everything you need to know about the Apex Core. For its main function, it has 3 solid lights. If your Apex Core has a red light, return to Step 3 before continuing.

| LED Color | What it Means | What to Do |
| :--- | :--- | :--- |
| 🔴 **Solid Red** | Needs Setup | Add it to your Apple Home or Home Assistant app. |
| 🟢 **Solid Green** | Paired Successfully | It is now paired to Home Assistant or Apple Home |
| 🔵 **Solid Blue** | Pairing Mode | It is looking for new Zigbee sensors. |

When the pairing button is pressed, it has 4 phases it cycles through while the button is held:

| LED Color | What it Means | What to Do |
| :--- | :--- | :--- |
| 🔵 **Blue Blink** | Phase 1 | Release button to start pairing sensors. |
| 🟡 **Yellow Blink** | Phase 2 | Release button to reset the Wi-Fi connection. |
| 🔴 **Red Blink** | Phase 3 | Release button for a full Factory Reset (erases everything). |
| ⚪ **White Blink** | Cancel | Release button to do nothing (safety cancel). |

<video controls width="100%">
  <source src="../pictures/Pairing.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Pairing Procedure

Follow the video above for pairing, and release when the light is **BLUE** to initiate pairing. If the light is already **SOLID BLUE** pairing is already active.

1.  **Start Pairing:** Press and hold the **BOOT button** on the side of your Apex Core.

2.  **Watch for Blue:** As soon as the LED starts a **Slow Blue Blink**, let go of the button.

3.  **Check for Solid Blue:** The LED will turn **Solid Blue**. This means it is now "listening" for new sensors. It will remain in pairing mode for 60 seconds, and then return to the Green status light.
![[Blue]](./pictures/9-Core_Blue.jpeg)

4.  **Ready Your Sensor:** Take your Zigbee sensor (like an Aqara sensor) and hold its own reset button for 5 seconds until its little light starts flashing in order to start pairing.
![[Sensor]](./pictures/17-Core_Pair_Sensor.png)

5.  **Success:** When they connect, the Apex Core LED will flash **Green** once and then stay Green. 
![[Green]](./pictures/Core_Green.jpeg)

### See it in your App
Your new sensor will pop up in your Apple Home or Home Assistant app automatically. You can now name it (like "Front Door") and start using it in your automations!

<img src="../pictures/18-Core_HA_Connected_Sensor.png" style="height: 400px; width: auto;">

<img src="../pictures/19-Core_HA_NewDevice.png" style="height: 400px; width: auto;">

<img src="../pictures/20-Core_HA_DeviceMenu.png" style="height: 400px; width: auto;">

<img src="../pictures/26-Core_AppleHome_Sensor.png" style="height: 400px; width: auto;">

---

### You're All Set!
Congratulations on setting up your Apex Core ecosystem.

<div class="grid cards" markdown>

-   [**Explore Other Products**](../index.md)
-   [**Troubleshooting Help**](./troubleshooting.md)
-   [**Back to Home Page**](../index.md)

</div>
