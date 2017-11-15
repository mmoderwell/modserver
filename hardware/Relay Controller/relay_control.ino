/*

 A simple web server running on ES32 or ESP8266 that recieves GET requests from
 a Node server. It is used to control a four channel relay which are
 individually controllable. The program will print the IP address and most
 recent GET requests to the Serial monitor and OLED screen.

 Given the IP address of your hardware is yourAddress:
 http://yourAddress/api/lights/one/on turns the first relay on.
 http://yourAddress/api/lights/four/off turns the fourth relay off.

 This example is written for a network using WPA encryption. For
 WEP or WPA, change the Wifi.begin() call accordingly.

 */

#include <WiFi.h>
#include "SSD1306.h"  // alias for `#include "SSD1306Wire.h"`

const char* ssid = "_";
const char* password = "nu141720";

// Define pins used for each relay
int relay_one = 12;
int relay_two = 13;
int relay_three = 14;
int relay_four = 15;

SSD1306 display(0x3c, 5, 4);  // define pins for OLED display
WiFiServer server(80);        // listen for requests on on port 80

void setup() {
  Serial.begin(115200);

  pinMode(relay_one, OUTPUT);  // set the relay pin mode
  pinMode(relay_two, OUTPUT);
  pinMode(relay_three, OUTPUT);
  pinMode(relay_four, OUTPUT);

  delay(10);

  // Initialize the display.
  display.init();

  display.flipScreenVertically();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.setFont(ArialMT_Plain_10);

  // Connecting to the WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  display.clear();
  display.drawString(0, 10, "Connecting to");
  display.drawString(0, 26, ssid);

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

int value = 0;

void loop() {
  WiFiClient client = server.available();  // listen for incoming clients
  String ip = WiFi.localIP().toString();
  display.clear();
  display.drawString(0, 10, "Connected.");
  display.drawString(0, 26, ip);

  if (client) {                      // if you get a request,
    Serial.println("New request.");  // print a message out the serial port
    String currentLine =
        "";  // make a String to hold incoming data from the client
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
            client.println("Content-type:text/html");
            client.println("Connection: keep-alive");
            client.println("Keep-Alive: timeout=5, max=1000");
            client.println();

            // HTTP Body
            String status_one = String(digitalRead(relay_one));
            String status_two = String(digitalRead(relay_two));
            String status_three = String(digitalRead(relay_three));
            String status_four = String(digitalRead(relay_four));

            client.print("{\"one\":\"");
            client.print(status_one);
            client.print("\",");
            client.print("\"two\":\"");
            client.print(status_two);
            client.print("\",");
            client.print("\"three\":\"");
            client.print(status_three);
            client.print("\",");
            client.print("\"four\":\"");
            client.print(status_four);
            client.print("\",");
            client.print("\"success\":\"");
            client.print("true");
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

        // Check to see what the client requested:

        if (currentLine.endsWith("/status")) {
          display.clear();
          display.drawString(0, 10, "Light status was requested");
          display.drawString(0, 26, currentLine);
          display.display();
          delay(1000);
        }

        if (currentLine.endsWith("/on")) {
          String newLine = currentLine.substring(0, currentLine.length() - 3);
          if (newLine.endsWith("/one")) {
            digitalWrite(relay_one, HIGH);
          }
          if (newLine.endsWith("/two")) {
            digitalWrite(relay_two, HIGH);
          }
          if (newLine.endsWith("/three")) {
            digitalWrite(relay_three, HIGH);
          }
          if (newLine.endsWith("/four")) {
            digitalWrite(relay_four, HIGH);
          }

          display.clear();
          display.drawString(0, 10, "Light turned on.");
          display.drawString(0, 26, currentLine);
          display.display();
          delay(1000);
        }
        if (currentLine.endsWith("/off")) {
          String newLine = currentLine.substring(0, currentLine.length() - 4);
          if (newLine.endsWith("/one")) {
            digitalWrite(relay_one, LOW);
          }
          if (newLine.endsWith("/two")) {
            digitalWrite(relay_two, LOW);
          }
          if (newLine.endsWith("/three")) {
            digitalWrite(relay_three, LOW);
          }
          if (newLine.endsWith("/four")) {
            digitalWrite(relay_four, LOW);
          }

          display.clear();
          display.drawString(0, 10, "Light turned off.");
          display.drawString(0, 26, currentLine);
          display.display();
          delay(1000);
        }
      }
    }
    // close the connection:
    client.stop();
    Serial.println("Client Disconnected.");
  }
  display.display();
}
