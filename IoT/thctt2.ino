#include <WiFiUdp.h>
#include <NTPClient.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

const char *SSID = "*";
const char *PASSWORD = "*";
const char *URL = "http://192.168.101.101/smarthome1/API/SmartHome/AddSensor";
const char *URL1 = "http://192.168.101.101/smarthome1/API/SmartHome/getStatus";

ESP8266WiFiMulti WiFiMulti;
WiFiClient client;
HTTPClient http;
WiFiUDP u;
NTPClient n(u, "2.vn.pool.ntp.org");

String getTime;
//den 1
int sensor1 = D6;
int Relay1 = D5;
//den 2
int sensor = D8;
int Relay = D7;

String value;
int tmp;
String id;
String Status;
String idtmp;

void setup() {
  Serial.begin(115200);
  // Serial.setDebugOutput(true);
  Serial.println();
  Serial.println();
  Serial.println();
  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, PASSWORD);
  // wait for WiFi connection
  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  n.begin();
  pinMode(Relay1,OUTPUT);
  pinMode(sensor1,INPUT);
  pinMode(Relay,OUTPUT);
  pinMode(sensor,INPUT);
}

void postJsonData() {
  n.update();
  Serial.print("connecting to ");
  if ((WiFiMulti.run() == WL_CONNECTED)) {
    Serial.print("[HTTP] begin...\n");
    if (http.begin(client, URL)) { // HTTP
      Serial.print("[HTTP] POST...\n");
      // format JSON
      const int capacity = JSON_OBJECT_SIZE(4);
      StaticJsonDocument<capacity> doc;
      // Gửi thông tin json
      doc["status"] = value;
      doc["lampId"] = id;
      doc["day"] = n.getFormattedTime();
      char output[3000];
      serializeJson(doc, output);
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST(output);
      Serial.println(httpCode); //Print HTTP return code
      // file found at server
      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String payload = http.getString();
        Serial.println(payload);
        char input[3000];
        payload.toCharArray(input, 3000);
        //parseJson
        Serial.println("Begin parse json data ...");
        DynamicJsonDocument docResponse(2048);
        DeserializationError err = deserializeJson(docResponse, payload);
        if (err) {
          Serial.print(F("deserializeJson() failed with code "));
          Serial.println(err.c_str());
        }
        auto name = docResponse["name"].as<char*>();
        Serial.println(name);
      } else {
        Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end(); //Close connection Serial.println();
      Serial.println("closing connection");
    }
  }
}

void getJsonData()
{
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    http.begin(client, URL1);  //Specify request destination
    int httpCode = http.GET();                                  //Send the request

    if (httpCode > 0) { //Check the returning code

      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);             //Print the response payload

      char input[300];
      payload.toCharArray(input, 300);
      Status = String(input[12]) + String(input[13]);
      if(Status == "ON")
        idtmp = String(input[25]);
      else
        idtmp = String(input[26]);
    }

    http.end();   //Close connection

  }
}

//Den1
void PIRsensor1()
{
  tmp = digitalRead(sensor);
  if(tmp == HIGH )
  {
    value = "ON";
    id = "1";
    postJsonData();
    digitalWrite(Relay1,HIGH);
  }
  else 
  {
    value = "OFF";
    id = "1";
    postJsonData();
    digitalWrite(Relay1,LOW);
  }
}

void controlLed1()
{
  getJsonData();
  if(Status == "ON"&& idtmp == "1" )
  {
    digitalWrite(Relay1,HIGH);
  }
  else if(Status == "OF"&& idtmp == "1" )
  {
    PIRsensor1();
  }
}

//Den2
void PIRsensor()
{
  tmp = digitalRead(sensor);
  if(tmp == HIGH )
  {
    value = "ON";
    id = "2";
    postJsonData();
    digitalWrite(Relay,HIGH);
  }
  else 
  {
    value = "OFF";
    id = "2";
    postJsonData();
    digitalWrite(Relay,LOW);
  }
}

void controlLed()
{
  getJsonData();
  if(Status == "ON"&& idtmp == "2" )
  {
    digitalWrite(Relay,HIGH);
  }
  else if(Status == "OF"&& idtmp == "2" )
  {
    PIRsensor();
  }
}

void loop() {
  controlLed();
  controlLed1();
  
}
