/*

 A simple web server running on ES32 or ESP8266 that recieves GET requests from
 a Node server. The program will print the IP address and most
 recent GET requests to the Serial monitor.

 Given the IP address of your hardware is yourAddress:
 http://yourAddress/api/sensor/value

 This example is written for a network using WPA encryption. For
 WEP or WPA, change the Wifi.begin() call accordingly.

 */

#include <ESP8266WiFi.h>
#include <Adafruit_MPL3115A2.h>
#include <Wire.h>

const char* ssid = "_";
const char* password = "nu141720";

WiFiServer server(80);  // listen for requests on on port 80
Adafruit_MPL3115A2 baro = Adafruit_MPL3115A2();

void setup() {
  Serial.begin(115200);

  delay(10);

  // Connecting to the WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();  // listen for incoming clients

  if (!baro.begin()) {
    Serial.println("Couldnt find sensor");
    return;
  }

  delay(2000);

  float tempC = baro.getTemperature();
  float tempF = (tempC * (1.8)) + 32;
  String temperature = String(tempF);
  Serial.println(temperature);

  if (client) {                      // if you get a request,
    Serial.println("New request.");  // print a message out the serial port
    String currentLine = "";  	  // make a String to hold incoming data from the client
    while (client.connected()) {  // loop while the client's connected
      if (client.available()) {   // if there's bytes to read from the client,
        char c = client.read();   // read a byte, then
        Serial.write(c);          // print it out the serial monitor
        if (c == '\n') {          // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a
          // row. that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200
            // OK) and a content-type so the client knows what's coming, then a
            // blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:application/json");
            client.println("Connection: close");
            client.println();

            // HTTP Body
            client.print("{\"value\":\"");
            client.print(temperature);
            client.print("\"}");

            // The HTTP response ends with another blank line:
            client.println();
            // break out of the while loop:
            break;
          } else {  // if you got a newline, then clear currentLine:
            currentLine = "";
          }
        } else if (c != '\r') {  // if you got anything else but a carriage
                                 // return character,
          currentLine += c;      // add it to the end of the currentLine
        }

        // Check to see what the client requested
      }
    }
    // close the connection:
    client.stop();
    Serial.println("Client Disconnected.");
  }
}
