# Crosswalk Gateway Troubleshooting

If your Gateway is having trouble connecting to Wi-Fi or coordinating sensors, follow these steps.

## Initial Setup
1. Immediately after flashing, it should host its own Wi-Fi connection. Make sure you switch to this using your phone.
2. Once connected, visit http://192.168.4.1 in your phone's web browser. This will allow you to set up the Wi-Fi for the gateway.
3. Once this is done, remember to re-connect to your home's Wi-Fi on your phone.

---

## Setup Page Says "Load failed"
After you click **Connect** on the Wi-Fi setup page, the Gateway saves your Wi-Fi details and restarts. Your phone loses its connection to the `Apex-Setup` network at the same moment, so the page may show **Load failed** or stop responding. This is expected.

1.  **Power Cycle:** Unplug the Gateway, wait 10 seconds, and plug it back in. It will use the Wi-Fi details you just saved.
2.  **Reconnect Your Phone:** Switch your phone back to your home Wi-Fi.
3.  **Open the Dashboard:** Visit `http://apex.local`. If it loads, the Gateway is on your network.
4.  **Still Not Connecting?** If the `Apex-Setup` network appears again, the Gateway couldn't join your Wi-Fi. Connect to it and re-enter your network name and password, making sure you pick a **2.4GHz** network.

---

## I Can't Open apex.local
1.  **Check Connection:** Make sure your computer or phone is on the **same Wi-Fi network** as the Gateway.
2.  **Use the IP Address:** If `http://apex.local` fails, look at your router's device list for "Crosswalk-Gateway" and type its IP address (e.g., `http://192.168.1.50`) into your browser.

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
