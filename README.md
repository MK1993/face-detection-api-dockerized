# FaceDetection-api - Dockerized

Dockerized version of face-detection-api.

1. Clone this repo
2. Run `npm install`
3. Make sure you have docker installed and running on your computer
4. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
5. You must add your own API key in the `controllers/handleimage.js` file to connect to Clarifai API.
6. You will also need to update Line 25 in server.js to your client app port (i.e. 3001)

#### Important: 
if you are getting conflict errors, you should run `docker stop <container name>` that is already running in the background. 
#### Important: 
if you are getting other errors, you should run `docker-compose down` to bring everything down, 
and start over.

To access backend's bash: Run `docker-compose exec face-detection-api bash`

To access postgres: (adjust PORT number if needed) Run `psql postgres://<username>:<password>@localhost:5432/face-detection-docker`

To access redis: Run `docker-compose exec redis redis-cli`

You can grab Clarifai API key [here](https://www.clarifai.com/)

** Make sure you use postgreSQL instead of mySQL for this code base.
