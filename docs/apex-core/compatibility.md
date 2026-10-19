# Device Compatibility

Apex Core dynamically maps Zigbee clusters to smart home endpoints. While many standard Zigbee devices will work "out of the box," the following devices have been explicitly verified by the Apex Sensor Labs team.

### Verified Devices

| Manufacturer | Model | Type | Status |
| :--- | :--- | :--- | :--- |
| **Aqara** | Door/Window Sensor | Contact | ✅ Verified |
| **Third Reality** | Contact Sensor | Contact | ✅ Verified |
| **Aqara** | P1 | Motion | ✅ Verified |
| **Aqara** | FP1E | mmWave | ✅ Verified |
| **Philips Hue** | Motion Sensor | Motion/Lux | ✅ Verified |
| **Third Reality** | Motion Sensor | Motion | ✅ Verified |

### Testing in Progress

The following devices are currently in our testing lab. Use with caution.

| Manufacturer | Model | Type | Status |
| :--- | :--- | :--- | :--- |
| **Aqara** | Water Leak Detector | Leak | 🧪 Untested |
| **Shelly** | Zigbee Line | Relay | 📅 Planned |

!!! tip "Generic Support"
    Because Apex Core uses a protocol-agnostic bridging logic, most standard Zigbee Contact, Motion, and Temperature sensors will work even if they are not listed here. 

!!! info "Feedback"
    Have you successfully paired a device not on this list? [Let us know](../support.md) so we can add it!
