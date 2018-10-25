#define PC_BAUDRATE 115200
#define BLUETOOTH_BAUDRATE 9600
#define PIN 5

#include <SoftwareSerial.h>
SoftwareSerial SerialBT(2, 3); // RX, TX

bool A = true;
bool B = true;
bool C = true;
bool D = true;
int analogCount = 0;

void setPwmFrequency(int pin, int divisor) {
  byte mode;
  if(pin == 5 || pin == 6 || pin == 9 || pin == 10) {
    switch(divisor) {
      case 1: mode = 0x01; break;
      case 8: mode = 0x02; break;
      case 64: mode = 0x03; break;
      case 256: mode = 0x04; break;
      case 1024: mode = 0x05; break;
      default: return;
    }
    if(pin == 5 || pin == 6) {
      TCCR0B = TCCR0B & 0b11111000 | mode;
    } else {
      TCCR1B = TCCR1B & 0b11111000 | mode;
    }
  } else if(pin == 3 || pin == 11) {
    switch(divisor) {
      case 1: mode = 0x01; break;
      case 8: mode = 0x02; break;
      case 32: mode = 0x03; break;
      case 64: mode = 0x04; break;
      case 128: mode = 0x05; break;
      case 256: mode = 0x06; break;
      case 1024: mode = 0x07; break;
      default: return;
    }
    TCCR2B = TCCR2B & 0b11111000 | mode;
  }
}

void setup()
{
  setPwmFrequency(5,1024);
  pinMode(PIN, OUTPUT);
  Serial.begin(PC_BAUDRATE);
  SerialBT.begin(BLUETOOTH_BAUDRATE);
  // for (int i = 8; i <= 11; i++)
  // {
  //   pinMode(i, OUTPUT);
  //   digitalWrite(i, HIGH);
  // }
}

void loop()
{
  if (SerialBT.available())
  {
    char data = SerialBT.read();

    if (data == 'a')
    {

      digitalWrite(8, A ? LOW : HIGH);
      A = !A;
    }
    else if (data == 'b')
    {
      digitalWrite(9, B ? LOW : HIGH);
      B = !B;
    }
    else if (data == 'c')
    {
      digitalWrite(10, C ? LOW : HIGH);
      C = !C;
    }
    else if (data == 'd')
    {
      digitalWrite(11, D ? LOW : HIGH);
      D = !D;
    }
    else if (data == 'h')
    {
      if(analogCount <= 127){
        analogCount += 9;
      }
    }
    else if (data == 'l')
    {
      if(analogCount > 0){
        analogCount -= 9;
      }
    }

    Serial.println(data);
  }

  analogWrite(5,analogCount); 
}
