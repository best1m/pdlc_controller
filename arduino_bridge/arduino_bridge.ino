#define PC_BAUDRATE 115200
#define BLUETOOTH_BAUDRATE 9600
#define PIN_5 5
#define PIN_6 6

#define PIN_7 7
#define PIN_8 8
#define PIN_9 9
#define PIN_10 10

#include <SoftwareSerial.h>
SoftwareSerial SerialBT(0, 1); // RX, TX

bool A = true;
bool B = true;
bool C = true;
bool D = true;
int analogCount = 0;

// setPwmFrequency-------------------------------------

// void setPwmFrequency(int pin, int divisor) {
//   byte mode;
//   if(pin == 5 || pin == 6 || pin == 9 || pin == 10) {
//     switch(divisor) {
//       case 1: mode = 0x01; break;
//       case 8: mode = 0x02; break;
//       case 64: mode = 0x03; break;
//       case 256: mode = 0x04; break;
//       case 1024: mode = 0x05; break;
//       default: return;
//     }
//     if(pin == 5 || pin == 6) {
//       TCCR0B = TCCR0B & 0b11111000 | mode;
//     } else {
//       TCCR1B = TCCR1B & 0b11111000 | mode;
//     }
//   } else if(pin == 3 || pin == 11) {
//     switch(divisor) {
//       case 1: mode = 0x01; break;
//       case 8: mode = 0x02; break;
//       case 32: mode = 0x03; break;
//       case 64: mode = 0x04; break;
//       case 128: mode = 0x05; break;
//       case 256: mode = 0x06; break;
//       case 1024: mode = 0x07; break;
//       default: return;
//     }
//     TCCR2B = TCCR2B & 0b11111000 | mode;
//   }
// }

void setup()
{
  Serial.println('hello world');
  // setPwmFrequency(5,1024);

  // 5 and 6 pins set 60hz
  TCCR0B = (TCCR0B & 0b11111000) | 0x05;
  
  // 9 and 10 pins set 120hz
  // TCCR1B = (TCCR1B & 0b11111000) | 0x04;
  // TCCR1A |= B00110000; //9 ~ 10pin output with inverted output


  // invert 6 pin
  // TCCR0A = TCCR0A & ~B00110000; //switch off output B 
  TCCR0A |= 0x30;  //5 ~ 6pin output with inverted output

  

  pinMode(PIN_5, OUTPUT);
  pinMode(PIN_6, OUTPUT);
  pinMode(PIN_7, OUTPUT);
  pinMode(PIN_8, OUTPUT);
  pinMode(PIN_9, OUTPUT);
  pinMode(PIN_10, OUTPUT);

  Serial.begin(PC_BAUDRATE);
  SerialBT.begin(BLUETOOTH_BAUDRATE);

  // -------relay module init------

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

      digitalWrite(PIN_7, A ? LOW : HIGH);
      A = !A;
    }
    else if (data == 'b')
    {
      digitalWrite(PIN_8, B ? LOW : HIGH);
      B = !B;
    }
    else if (data == 'c')
    {
      digitalWrite(PIN_9, C ? LOW : HIGH);
      C = !C;
    }
    else if (data == 'd')
    {
      digitalWrite(PIN_10, D ? LOW : HIGH);
      D = !D;
    }
    else if (data == 'h')
    {
      if(analogCount <= 118){
        analogCount += 9;
      }
    }
    else if (data == 'l')
    {
      if(analogCount > 0){
        analogCount -= 9;
      }
    }
    else if (data == 'o')
    {
      analogCount = 118;
    }
    else if (data == 'f')
    {
      analogCount = 0;

    }

    Serial.println(data);
  }

  analogWrite(PIN_5, analogCount); 
  analogWrite(PIN_6, - analogCount); 
  // analogWrite(9, analogCount); 
  // analogWrite(10, - analogCount); 
}
