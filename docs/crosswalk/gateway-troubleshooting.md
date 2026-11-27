# Crosswalk Gateway Troubleshooting

If your Gateway is having trouble connecting to Wi-Fi or coordinating sensors, follow these steps.

## Initial Setup
1. Immediately after flashing, it should host its own Wi-Fi connection. Make sure you switch to this using your phone.
2. Once connected, visit http://192.168.4.1 in your phone's web browser. This will allow you to set up the Wi-Fi for the gateway.
3. Once this is done, remember to re-connect to your home's Wi-Fi on your phone.

---

## Gateway Doesn't Show Up After Wi-Fi Setup
If you've reconnected your phone to your home Wi-Fi but the dashboard won't load a minute or so after setup:

1.  **Try the Number Address:** If the setup page showed a number address such as `http://192.168.1.50`, try that instead of `http://apex.local`. Some phones, especially Android, can't open `apex.local`.
2.  **Check for the Setup Network:** Look at your phone's Wi-Fi list. If the `Apex-Setup` network is back, the Gateway couldn't join your Wi-Fi, most likely because of a wrong password. Connect to it, visit `http://192.168.4.1`, and enter your network name and password again, making sure you pick a **2.4GHz** network.
3.  **Power Cycle:** If neither works, unplug the Gateway, wait 10 seconds, and plug it back in. It will try your saved Wi-Fi details again.

---

## I Can't Open apex.local
1.  **Check Connection:** Make sure your computer or phone is on the **same Wi-Fi network** as the Gateway.
2.  **Use the IP Address:** If `http://apex.local` fails, look at your router's device list for "Crosswalk-Gateway" and type its IP address (e.g., `http://192.168.1.50`) into your browser.

---

## Sensors Stopped Reporting
If sensors that were working stop updating, and their **Last Seen** time stops changing, even though people are walking past:

1.  **Restart the Gateway:** Unplug it, wait 10 seconds, and plug it back in. Your sensors should start reporting again the next time they wake up, for example when someone walks past.
2.  **Why this happens:** Your router can move to a different Wi-Fi channel on its own, for example after it restarts or updates. On firmware 1.2.13, the Gateway can then lose contact with your sensors until it's restarted. The Gateway beta (1.3.3) fixes this.
3.  **Still not reporting?** See [Sensor Troubleshooting](./sensor-troubleshooting.md).

---

## MQTT Connection Problems
To check your MQTT connection, open the **Status** tab on your `apex.local` dashboard and look at the **MQTT** line.

!!! info "Stuck on 'Reconnecting'?"
    Saving your MQTT settings restarts the Gateway. The dashboard may keep showing a **Reconnecting** message even after the Gateway is back. Close the message and check the **Status** tab instead.

If the Status tab says MQTT is **Disconnected**:

1.  **Verify Broker IP:** Ensure the IP address of your Home Assistant (or broker) hasn't changed.
2.  **Check Credentials:** Double-check your Username and Password in the MQTT section of the **Settings** tab.
3.  **Port 1883:** Ensure your broker is listening on the standard port (1883) and is not blocked by a firewall.
4.  **Test Before Saving:** In the MQTT section, enter your settings and click **Test Connection** before you click **Save**. Saving restarts the Gateway, so testing first lets you catch mistakes without waiting for a restart.

---

## Firmware Updates
The Gateway updates itself from its own dashboard — see [Updating Firmware](./gateway-updates.md). If an update is interrupted and the Gateway no longer comes back online, you can always recover it by reflashing over USB from the [Flashing](./gateway-flashing.md) page.

---

!!! tip "Restart"
    Most Gateway issues can be fixed by simply unplugging it for 10 seconds and plugging it back in to refresh the network connection.
