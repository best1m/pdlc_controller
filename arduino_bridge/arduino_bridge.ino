#define PC_BAUDRATE 9600
#define BLUETOOTH_BAUDRATE 9600

#include <SoftwareSerial.h>

SoftwareSerial SerialBT(2, 3); // RX, TX

void setup() {

    Serial.begin(PC_BAUDRATE);
    SerialBT.begin(BLUETOOTH_BAUDRATE);
}

void loop() {
    if (SerialBT.available()) {
        Serial.write(SerialBT.read());
    }

    if (Serial.available()) {
        SerialBT.write(Serial.read());
    }
}