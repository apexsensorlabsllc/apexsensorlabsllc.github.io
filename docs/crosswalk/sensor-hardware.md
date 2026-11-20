# Hardware & Pinout

!!! tip "Built something with your Crosswalk? Tell us!"
    We'd love to hear how you've written your own code or used your Crosswalk Sensor in a new way. Email us at [contact@apexsensorlabs.com](mailto:contact@apexsensorlabs.com) and share your project.

This page is for people who want to write their own firmware for the Crosswalk Sensor, for example with ESPHome or the Arduino IDE. It lists what's connected to each pin and how to power the distance sensors.

!!! warning "Advanced, and not supported"
    Custom firmware isn't supported by Apex Sensor Labs.

    - **It won't work with the Crosswalk Gateway.** The Gateway only talks to the official sensor firmware.
    - **Battery life depends on your code.** The official firmware sleeps between people walking past to last months on a charge. Firmware that keeps Wi-Fi on will drain the battery much faster.

    **You can always go back.** Reinstall the official firmware from the [Sensor Flashing](./sensor-flashing.md) page. Please do that before contacting support.

---

## At a Glance

| | |
| :--- | :--- |
| **Module** | ESP32-C6-MINI-1-N4 (ESP32-C6, 4 MB flash) |
| **Distance sensors** | 2× VL53L1X time-of-flight sensors, looking down through the doorway |
| **Motion sensor** | AS312 PIR |
| **Door sensors** | 2× AH1912 hall-effect sensors (left and right) |
| **Battery gauge** | MAX17048 (Battery-Powered version only) |
| **USB-C** | Connected to the ESP32-C6's built-in USB, for flashing and serial output. No extra driver needed. |
| **Buttons** | **BOOT** (GPIO9) and **RESET** |

The Battery-Powered and Hardwired versions use the same board. The Hardwired version has no battery, so the battery gauge isn't powered.

---

## Pinout

| GPIO | Connected to | Direction | Notes |
| :--- | :--- | :--- | :--- |
| **2** | Distance sensor power switch | Output | **LOW = on, HIGH = off.** See [Distance Sensor Power](#distance-sensor-power). |
| **3** | Motion sensor (PIR) output | Input | HIGH for about 2.3 seconds after motion. Can wake the ESP32-C6 from deep sleep. |
| **4** | Distance sensors I²C **SDA** | I²C | Shared by both distance sensors. Boot-mode (strapping) pin. |
| **5** | Distance sensors I²C **SCL** | I²C | Shared by both distance sensors. Boot-mode (strapping) pin. |
| **6** | Battery gauge I²C **SDA** | I²C | A separate bus from the distance sensors. |
| **7** | Battery gauge I²C **SCL** | I²C | A separate bus from the distance sensors. |
| **18** | Distance sensor 1 **XSHUT** | Output | LOW holds the sensor off. Used to give the two sensors different addresses. |
| **19** | Distance sensor 2 **XSHUT** | Output | LOW holds the sensor off. Used to give the two sensors different addresses. |
| **21** | Power LED | Output | HIGH = on. |
| **22** | Left door hall sensor | Input | LOW when a magnet is near. **Enable the internal pull-up**: there's no pull-up on the board. |
| **23** | Right door hall sensor | Input | LOW when a magnet is near. **Enable the internal pull-up**: there's no pull-up on the board. |
| **9** | BOOT button | Input | LOW when pressed. Hold it while plugging in USB to enter download mode. |
| **12 / 13** | USB D− / D+ | USB | Built-in USB. Don't use these as GPIO. |

All other GPIOs are unused, and none are brought out to a connector.

### I²C Addresses

| Device | Bus | Address |
| :--- | :--- | :--- |
| VL53L1X (each) | GPIO4 / GPIO5 | **0x29** at power-up. Both start at the same address. See below. |
| MAX17048 | GPIO6 / GPIO7 | **0x36** |

The official firmware moves the distance sensors to **0x30** and **0x32**. You can use any free addresses.

---

## Distance Sensor Power

The two distance sensors run on their own **switched 3.3 V supply**, so they can be turned off completely while the ESP32-C6 is in deep sleep. GPIO2 controls a switch on that supply:

| GPIO2 | Distance sensors |
| :--- | :--- |
| **LOW** | **Powered** |
| **HIGH** | **Off** |

!!! danger "LOW turns it on"
    It's the opposite of what most people expect. If your distance sensors don't respond at all, check that you're driving GPIO2 **LOW**.

**What's on the switched supply:** both VL53L1X sensors, plus the pull-up resistors on their I²C lines (GPIO4/5) and their XSHUT lines (GPIO18/19). Nothing else.

**What's not on the switched supply:** the ESP32-C6, the motion sensor, both door sensors, and the battery gauge (powered by the battery) stay powered when GPIO2 is HIGH. The power LED isn't on the switched supply either. Your code turns it on and off with GPIO21.

### Rules for Your Code

1.  **It starts off.** The switch is held off until your code drives GPIO2 LOW, so the distance sensors are unpowered at boot.
2.  **Wait before talking to the sensors.** After driving GPIO2 LOW, wait at least **70 ms** before any I²C traffic. The official firmware waits 100 ms after switching it back on.
3.  **Give the sensors different addresses every time you power them up.** Both start at 0x29. Hold both XSHUT pins LOW, then:
    1. Set GPIO18 HIGH, wait 5 ms, and move that sensor to a new address.
    2. Set GPIO19 HIGH, wait 5 ms, and move that sensor to a different address.

    Switching the supply off and on resets both sensors to 0x29, so repeat this after every power cycle.
4.  **Turning the supply off:** stop ranging first, then drive both XSHUT pins LOW, then set GPIO2 HIGH. Talking to unpowered sensors just times out, and leaving XSHUT HIGH can feed power into the sensors through the pin.
5.  **Keep it off through deep sleep.** If your code uses deep sleep, hold GPIO2 HIGH while asleep (in Arduino: `rtc_gpio_hold_en(GPIO_NUM_2)`, and `rtc_gpio_hold_dis` when you wake). Otherwise the pin floats, the switch can partly turn on, and the distance sensors drain the battery while the board is asleep.
6.  **Don't drive GPIO4/5 LOW at boot.** They're boot-mode (strapping) pins.

The distance sensors' interrupt pins aren't connected, so read them by polling.

---

## Example Code

These examples show the basics: powering the distance sensors, reading them, and reading the motion and door sensors.

=== "Arduino"

    Uses the **VL53L1X** library by Pololu and the **SparkFun MAX1704x Fuel Gauge** library, both available in the Arduino Library Manager. Select the **ESP32C6 Dev Module** board and turn on **USB CDC On Boot** to see the output over USB.

    ```cpp
    #include <Wire.h>
    #include <VL53L1X.h>
    #include <SparkFun_MAX1704x_Fuel_Gauge_Arduino_Library.h>

    #define PIN_SENSOR_POWER 2    // LOW = distance sensors on
    #define PIN_PIR          3
    #define PIN_SDA          4    // distance sensors
    #define PIN_SCL          5
    #define PIN_GAUGE_SDA    6    // battery gauge
    #define PIN_GAUGE_SCL    7
    #define PIN_XSHUT_1      18
    #define PIN_XSHUT_2      19
    #define PIN_LED          21
    #define PIN_DOOR_LEFT    22
    #define PIN_DOOR_RIGHT   23

    TwoWire sensorBus = TwoWire(0);
    TwoWire gaugeBus  = TwoWire(1);
    VL53L1X sensor1, sensor2;
    SFE_MAX1704X gauge;

    bool startSensor(VL53L1X& s, int xshutPin, uint8_t address) {
      digitalWrite(xshutPin, HIGH);   // release this sensor only
      delay(5);
      s.setBus(&sensorBus);
      s.setTimeout(500);
      if (!s.init()) return false;
      s.setAddress(address);          // move it off the shared 0x29
      s.startContinuous(50);
      return true;
    }

    void setup() {
      Serial.begin(115200);

      pinMode(PIN_PIR, INPUT);
      pinMode(PIN_DOOR_LEFT, INPUT_PULLUP);    // no pull-up on the board
      pinMode(PIN_DOOR_RIGHT, INPUT_PULLUP);
      pinMode(PIN_LED, OUTPUT);
      digitalWrite(PIN_LED, HIGH);             // on while testing; set LOW to save battery

      // Hold both distance sensors off, then power the switched supply.
      pinMode(PIN_XSHUT_1, OUTPUT);
      pinMode(PIN_XSHUT_2, OUTPUT);
      digitalWrite(PIN_XSHUT_1, LOW);
      digitalWrite(PIN_XSHUT_2, LOW);
      pinMode(PIN_SENSOR_POWER, OUTPUT);
      digitalWrite(PIN_SENSOR_POWER, LOW);     // LOW = on
      delay(100);                              // let the supply settle

      sensorBus.begin(PIN_SDA, PIN_SCL);
      sensorBus.setClock(400000);
      Serial.printf("Sensor 1: %s\n", startSensor(sensor1, PIN_XSHUT_1, 0x30) ? "ok" : "FAILED");
      Serial.printf("Sensor 2: %s\n", startSensor(sensor2, PIN_XSHUT_2, 0x32) ? "ok" : "FAILED");

      gaugeBus.begin(PIN_GAUGE_SDA, PIN_GAUGE_SCL);
      if (!gauge.begin(gaugeBus)) Serial.println("No battery gauge (normal on Hardwired)");
    }

    void loop() {
      Serial.printf("dist1=%u mm  dist2=%u mm  motion=%d  leftMagnet=%d  rightMagnet=%d  battery=%.0f%%\n",
                    sensor1.read(), sensor2.read(),
                    digitalRead(PIN_PIR),
                    digitalRead(PIN_DOOR_LEFT) == LOW,
                    digitalRead(PIN_DOOR_RIGHT) == LOW,
                    gauge.getSOC());
      delay(200);
    }
    ```

    !!! tip "Turn the LED off on battery"
        This example leaves the power LED on so you can see the board is running. On the Battery-Powered version, turn it off (`digitalWrite(PIN_LED, LOW)`) once you're done testing, and before deep sleep.

=== "ESPHome"

    This sets up the motion sensor, both door sensors, the LED, and the distance sensors' power. ESPHome doesn't have a built-in VL53L1X component, so you'll need to add one yourself as an external component. Power the sensors and set their addresses as described in [Rules for Your Code](#rules-for-your-code).

    ```yaml
    esphome:
      name: crosswalk-custom
      on_boot:
        priority: 800
        then:
          - output.turn_on: distance_sensor_power

    esp32:
      variant: esp32c6
      board: esp32-c6-devkitc-1
      framework:
        type: esp-idf

    logger:
    api:
    ota:
      - platform: esphome
    wifi:
      ssid: !secret wifi_ssid
      password: !secret wifi_password

    output:
      # GPIO2 is LOW = on, so invert it: "on" in ESPHome powers the sensors.
      - platform: gpio
        id: distance_sensor_power
        pin:
          number: GPIO2
          inverted: true
      - platform: gpio
        id: power_led
        pin: GPIO21

    binary_sensor:
      - platform: gpio
        name: "Motion"
        device_class: motion
        pin: GPIO3

      # The hall sensors pull LOW when a magnet is near, and need the
      # internal pull-up. Inverted so ON = magnet detected.
      - platform: gpio
        name: "Left Door Magnet"
        pin:
          number: GPIO22
          inverted: true
          mode:
            input: true
            pullup: true
      - platform: gpio
        name: "Right Door Magnet"
        pin:
          number: GPIO23
          inverted: true
          mode:
            input: true
            pullup: true

    light:
      - platform: binary
        name: "Power LED"
        output: power_led
    ```

    !!! info "Battery-Powered sensors and ESPHome"
        ESPHome keeps Wi-Fi on all the time, which drains the battery quickly. ESPHome works best on the Hardwired version. On the Battery-Powered version, look at ESPHome's `deep_sleep` component, with the motion sensor (GPIO3) as the wake-up pin.

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Reinstall the Official Firmware**](./sensor-flashing.md)
-   [**Sensor Troubleshooting**](./sensor-troubleshooting.md)

</div>
