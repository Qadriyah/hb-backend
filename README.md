# HB Backend Challenge

A microservice that takes an arbitrary username/password pair to authenticate users, applies a josn patch to a json object and generate an image thumbnail

## Getting Started

The following instrauctions will get you a copy of the project up and runnig on your local machine.

### Prerequisites

You need `git` to get started.
Download and install a copy of [ git ](https://git-scm.com/downloads) for your operating system

## Installation

Run the following commands from the terminal to install the project on your local machine

```
git clone https://github.com/Qadriyah/hb-backend.git

cd hb-backend

npm install - to install the dependencies

npm build - to build the project

npm start - to run the project
```

## Running selective tests

Run the following to run the test suite

```
npm test
```

## Running with docker

### Docker image repository

```
https://hub.docker.com/repository/docker/qadriyah/backendimage
```

### Docker commands

Run the following commands to get the server run in a docker container

```
docker pull qadriyah/backendimage:latest

docker run -p 5000:5000 -d qadriyah/backendimage

The server will be available on http://localhost:5000
```

## List of endpoint

| Method | Route                  | Description                           |
| ------ | ---------------------- | ------------------------------------- |
| POST   | /api/auth              | Autheticates users                    |
| PATCH  | /api/private/patch     | Applies a json patch to a json object |
| GET    | /api/private/thumbnail | Generates an image thumbnail          |

## Built With

- Node - JavaScript runtime environment that executes JavaScript code outside of a web browser.
- Express - A web application framework for node
- Mocha/Chai/Supertest - Test environment frameworks
- nyc - used to generate test reports

## Usage

Open an http client like postman to test the endpoints

### Login endpoint

```
http:localhost:5000/api/auth

Sample data format:

{
	"username": "Baker",
	"password": "1234567"
}
```

### Json patch endpoint

```
http:localhost:5000/api/private/patch

Sample data format:
{
  "document": {
    "username": "Baker",
    "password": "123456"
  },
  "patch": [
    {"op": "replace", "path": "/username", "value": "Sekitoleko"},
    {"op": "add", "path": "/name", "value": "Baker Sekitoleko"}
  ]
}
```

### Thumbnail generation endpoint

```
http:localhost:5000/api/private/thumbnail
http:localhost:5000/api/private/thumbnail?imageSrc="public_image_url"

Takes an optional query parameter `imageSrc` that holds a public image URL
```

## Author

```
Baker Sekitoleko
```
