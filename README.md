# FaceDetection-api - Dockerized

Dockerized version of face-detection-api.

1. Clone this repo
2. Run `npm install`
3. Make sure you have docker installed and running on your computer
4. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
5. You must add your own API key in the `controllers/handleimage.js` file to connect to Clarifai API.
6. You will also need to update Line 25 in server.js to your client app port (i.e. 3001)

#### Important: 
if you are getting conflict erros, you should run `docker stop <container name>` that is already running in the background. 
#### Important: 
if you are getting other erros, you should run `docker-compose down` to bring everything down, 
and start over.
