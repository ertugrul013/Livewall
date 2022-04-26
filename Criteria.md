# byCape

## Back-end assessment

#### Target

We want a HTTP endpoint that can take the URL of a video, a start timestamp, and a length
as parameters and output a trimmed video.

#### Assignment

###### API

We want you to write a NodeJS express app with a single API endpoint that takes the URL of
a video file, a start time in **milliseconds** and a lengthin **milliseconds** as parameters. This
endpoint should trim the video starting from the start time, and end after the requested
length is reached. The resulting video should be saved locally and a public URL should be
returned with which the video can be downloaded. Also we store the api request and output
in a local MongoDB.

Also, can you:

- Write a docker file to containerize your NodeJS express app with.
- Write the application in TypeScript
- Add unittests

Please share the application in a repo.

**Frontend**
Can you create a simple frontend that allows you to upload the video and

#### Requirements

- The application has to be written in NodeJS using theexpressframework
- The endpoint must accept parameters in a JSON format using a POST request.
- Responses from the endpoint should be in JSON format.
- The endpoint should have user input checking and report back to the user when an
  invalid input has been given.
- When trimming the video, video quality should be favoured over speed.
