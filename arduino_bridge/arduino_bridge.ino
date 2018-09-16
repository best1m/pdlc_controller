
#define PC_BAUDRATE 9600
#define BLUETOOTH_BAUDRATE 9600

#include <SoftwareSerial.h>
SoftwareSerial SerialBT(2, 3); // RX, TX


void setup() {
  Serial.begin(PC_BAUDRATE);
  SerialBT.begin(BLUETOOTH_BAUDRATE);
 
 }
 
void loop() {
 
 if(SerialBT.available())
   {     
      char data = SerialBT.read(); 
      switch(data)
      {
        case 'a': Serial.write("this is A");break;
        case 'b': Serial.write("this is B");break; 
        case 'c': Serial.write("this is C");break; 
        case 'd': Serial.write("this is D");break; 
        default : Serial.write("pardon?");break;
      }
     
   }
   
}
