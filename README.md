# Anton Maritime Single Window

This project is a small example piece of software known as "Anton Maritime Single Window", inspired by the European Maritime Single Window initiative.

## Overview

The software is designed to visualize open data of current port calls in a user-friendly manner.

## Running the Script

#### Using npm:

You need Node.js and npm installed on your machine. You can use `node -v` and `npm -v` to check if you have them installed.

1. Clone the repository and navigate into the cloned repository: `cd <yourpath>\maritime-app`
2. Install the dependencies: `npm install`
3. Start the application: `npm start`
4. The application (displays message "There are xxx portcalls.") should now be running and accessible in your browser at `http://localhost:3000`. And the message appears in the browser's console as well.

#### Using Docker:

Make sure Docker is installed and running on your machine before executing these commands.

1. Clone the repository and navigate into the cloned repository: `cd <yourpath>`
2. Build the Docker image from the Dockerfile: `docker build -t <app_name> .`

3. Run the Docker container: `docker run -p <yourport>:80 <app_name>`

4. The application (displays message "There are xxx portcalls.") should now be running and accessible in your browser at `http://localhost:<yourport>`. And the message appears in the browser's console as well.

You can name your Docker image `app_name` as per your preference.

You can replace `<yourport>` with any available port number on your machine.
