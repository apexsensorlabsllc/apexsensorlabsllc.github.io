# Support

## Troubleshooting and Help

If you're having issues with your Apex hardware, we're here to help. Because our devices are designed for local-first, privacy-focused home automation, most issues can be resolved with a few simple steps.

### Common Troubleshooting

Before reaching out, please check the following:

- **Connectivity:** Ensure your Gateway is powered on, connected to your home Wi-Fi, and within range of your sensors.
- **Power:** For battery-powered sensors, plug the sensor into USB and check that it charges — 🟡 Yellow means charging, 🟢 Green means full.
- **Firmware:** Ensure your device is running the latest firmware. The Gateway can [update itself from its dashboard](./crosswalk/gateway-ota.md).

### Quick Fixes

- **Gateway Issues:** For Wi-Fi, dashboard, or MQTT problems, see the [Crosswalk Gateway Troubleshooting Guide](./crosswalk/gateway-troubleshooting.md).
- **Sensor Issues:** For count inaccuracies, pairing failures, or orientation help, refer to the [Crosswalk Sensor Troubleshooting Guide](./crosswalk/sensor-troubleshooting.md).
- **Checking Sensor Status:** Crosswalk sensors keep their lights off while running on battery, so the [sensor light reference](./crosswalk/sensor-troubleshooting.md#understanding-the-sensor-lights) explains what you can and cannot tell from the hardware itself.

!!! tip "Common Suggestions"
    - **Reboot:** Sometimes a simple power cycle (unplug and replug) is all that's needed to bring the Gateway back onto the network.
    - **Proximity:** When pairing new sensors, keep them in the same room as the Gateway for the most reliable initial handshake.
    - **Dashboard First:** The `apex.local` dashboard is the fastest way to see what every sensor and room is currently reporting.

!!! warning "A Note on Privacy"
    Apex Sensor Labs hardware does not have a cloud portal. This means we cannot "remotely access" your device to troubleshoot it. All support happens through local debugging on your own network, with us walking you through it.

### Reporting Issues

During the Crosswalk beta, email is the fastest way to reach us. Please include:

- Which device you're having trouble with (Gateway or Sensor)
- The firmware version shown on your `apex.local` dashboard
- What you expected to happen, and what happened instead

- **Email:** support@apexsensorlabs.com
- **Website:** [apexsensorlabs.com](https://apexsensorlabs.com)

!!! info "DIY Community"
    A community space for Apex users to share automations and setups is on the way. Until then, email us — beta feedback goes straight to the engineer building the hardware.
