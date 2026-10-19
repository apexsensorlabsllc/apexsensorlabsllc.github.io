# Crosswalk Gateway Troubleshooting

If your Gateway is having trouble connecting to Wi-Fi or coordinating sensors, follow these steps.

## Initial Setup
1. Immediately after flashing, it should host its own Wi-Fi connection. Make sure you switch to this using your phone.
2. Once connected, visit http://192.168.4.1 in your phone's web browser. This will allow you to set up the Wi-Fi for the gateway.
3. Once this is done, remember to re-connect to your home's Wi-Fi on your phone.

---

## I Can't Open apex.local
1.  **Check Connection:** Make sure your computer or phone is on the **same Wi-Fi network** as the Gateway.
2.  **Use the IP Address:** If `http://apex.local` fails, look at your router's device list for "Crosswalk-Gateway" and type its IP address (e.g., `http://192.168.1.50`) into your browser.

---

## MQTT Connection Problems
If your dashboard says "MQTT Disconnected":
1.  **Verify Broker IP:** Ensure the IP address of your Home Assistant (or broker) hasn't changed.
2.  **Check Credentials:** Double-check your Username and Password in the Gateway settings menu.
3.  **Port 1883:** Ensure your broker is listening on the standard port (1883) and is not blocked by a firewall.
4. The gateway has the ability to 'Test Connection' for MQTT. Enter your MQTT settings and click Test Connection prior to saving. Saving will reboot your device.

---

## Firmware Updates
The Gateway updates itself from its own dashboard — see [Updating Firmware](./gateway-updates.md). If an update is interrupted and the Gateway no longer comes back online, you can always recover it by reflashing over USB from the [Flashing](./gateway-flashing.md) page.

---

!!! tip "Restart"
    Most Gateway issues can be fixed by simply unplugging it for 10 seconds and plugging it back in to refresh the network connection.
