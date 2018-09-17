
#define PC_BAUDRATE 9600
#define BLUETOOTH_BAUDRATE 9600

#include <SoftwareSerial.h>
SoftwareSerial SerialBT(2, 3); // RX, TX

bool A = true;
bool B = true;
bool C = true;
bool D = true;

void setup()
{
  Serial.begin(PC_BAUDRATE);
  SerialBT.begin(BLUETOOTH_BAUDRATE);
  for (int i = 8; i <= 11; i++)
  {
    pinMode(i, OUTPUT);
    digitalWrite(i, HIGH);
  }
  
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
//      toggleFunc(8, A);
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
  
  }
}

void toggleFunc(int pin, bool boolData)
{

//  boolData == 1 ? pinMode(pin, OUTPUT) : digitalWrite(pin, HIGH);
//  boolData = !boolData;
 
  
}
