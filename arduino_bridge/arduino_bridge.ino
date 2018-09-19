
#define PC_BAUDRATE 115200
#define BLUETOOTH_BAUDRATE 9600

#include <SoftwareSerial.h>
SoftwareSerial SerialBT(2, 3); // RX, TX

bool A = true;
bool B = true;
bool C = true;
bool D = true;

void setup()
{
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  digitalWrite(A0, HIGH);

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
    int countData = (int)SerialBT.read();

    if (data == 'a')
    {
      while(true){
        digitalWrite(A0, LOW);
        delay(14);
        digitalWrite(A0, HIGH);
        delay(2);
      }
      //  digitalWrite(8, A ? LOW : HIGH);
      //  A = !A;
//      toggleFunc(8, A);
    }
    else if (data == 'b')
    {
      //  digitalWrite(9, B ? LOW : HIGH);
      //  B = !B;
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

    Serial.println(data);
    Serial.println(countData);
  
  }
}

