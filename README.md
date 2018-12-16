# modserver
Home automation server backed by NodeJS, controllable by a web interface.

### Interacting with the hardware
Each IoT device is running a basic web server waiting for incomming GET requests. 
The route of the request will determine the data that is sent back to central Node server.

#### General request format
* GET /api/[device name]/[action]
