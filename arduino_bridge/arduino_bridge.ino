
#define PC_BAUDRATE 115200
#define BLUETOOTH_BAUDRATE 9600

#include <SoftwareSerial.h>
SoftwareSerial SerialBT(2, 3); // RX, TX

bool A = true;
bool B = true;
bool C = true;
bool D = true;
int lowDelay = 8;
int highDelay = 8;

void setup()
{
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);

  Serial.begin(PC_BAUDRATE);
  SerialBT.begin(BLUETOOTH_BAUDRATE);
  for (int i = 8; i <= 11; i++)
  {
    pinMode(i, OUTPUT);
    digitalWrite(i, HIGH);
  }
}

void dimmer()
{
  digitalWrite(A0, LOW);
  delay(lowDelay);
  digitalWrite(A0, HIGH);
  delay(highDelay);
}

void loop()
{
  dimmer();

  if (SerialBT.available())
  {
    char data = SerialBT.read();

    if (data == 'a')
    {

      digitalWrite(8, A ? LOW : HIGH);
      A = !A;
      toggleFunc(8, A);
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

      lowDelay != 0 ? lowDelay -= 1 : 0;
      highDelay < 16 ? highDelay += 1 : 16;

      Serial.print("LOWDELAY : ");
      Serial.println(lowDelay);
      Serial.print("HIGHDELAY : ");
      Serial.println(highDelay);
    }
    else if (data == 'l')
    {
      highDelay != 0 ? highDelay -= 1 : 0;
      lowDelay < 16 ? lowDelay += 1 : 16;

      Serial.print("LOWDELAY : ");
      Serial.println(lowDelay);
      Serial.print("HIGHDELAY : ");
      Serial.println(highDelay);
    }

    Serial.println(data);
  }
}
