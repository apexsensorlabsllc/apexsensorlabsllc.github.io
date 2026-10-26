# Frequently Asked Questions (FAQ)

Find quick answers to common questions about the Apex Sensor Labs ecosystem.

---

## General Questions

<details>
<summary>Do I need an internet connection?</summary>
No! All Apex hardware is designed to work **100% locally**. Once you have flashed the firmware, your data never leaves your home network. An internet connection is only used if you choose to update your Gateway's firmware.
</details>

<details>
<summary>Which browser should I use for flashing?</summary>
You must use a **Chrome-based browser** (Google Chrome or Microsoft Edge) on a computer. Other browsers like Safari or Firefox do not support the Web Serial connection needed to talk to the hardware over USB.
</details>

<details>
<summary>Do these devices require a subscription?</summary>
Never. There are no monthly fees, cloud "tiers", or hidden costs. You own the hardware and the software running on it.
</details>

<details>
<summary>Why don't these use ESPHome?</summary>
While we love the open-source community, Apex hardware is designed for performance and battery life that general-purpose platforms like ESPHome cannot yet achieve. Our custom firmware is highly tuned for **extreme deep-sleep states** and contains proprietary logic (like our precision person-counting and dynamic bridging) that is not supported by standard ESPHome components. This ensures your devices are faster, more reliable, and last longer on a single charge.
</details>

---

## Crosswalk (Occupancy)

<details>
<summary>Why does the Crosswalk need a Gateway?</summary>
The sensors use a protocol called **ESP-NOW** which is incredibly battery-efficient but doesn't talk directly to Wi-Fi. The Gateway "listens" for these signals and translates them so your smart home can understand them.
</details>

<details>
<summary>Can one Gateway handle multiple doors?</summary>
Absolutely. You can pair multiple Crosswalk sensors to a single Gateway and organize them into different Rooms via the `apex.local` dashboard.
</details>

<details>
<summary>How long does the battery last?</summary>
Depending on how busy the door is, a single charge should last **3 to 6 months**. Battery level is reported to the Gateway, so you check it on the `apex.local` dashboard or in your smart home app rather than on the sensor itself. The Hardwired version has no battery and runs from USB-C power, so it never needs charging.
</details>

<details>
<summary>How do I know the sensor is on? It has no lights.</summary>
That's by design. Once a Crosswalk sensor is running on battery it keeps every light off to conserve power, so there is no light to indicate that it is awake and working. Confirm it is reporting on the `apex.local` dashboard instead. When you plug the sensor into USB, 🟡 Yellow means it is charging and 🟢 Green means it is fully charged. The Hardwired version is different: its 🔴 Red power light and 🟢 Green light stay on whenever it has power.
</details>

<details>
<summary>Do I need to re-pair sensors if the battery dies or power is lost?</summary>
Never. The Crosswalk Gateway has a persistent memory. Once a sensor is paired, it is saved until you manually delete it. If the sensor loses power, it will automatically reconnect to the Gateway as soon as it is turned back on.
</details>

---

!!! tip "Still have questions?"
    If you can't find your answer here, check the product-specific **Troubleshooting** guides or head to [Support](./support.md) to get in touch.
