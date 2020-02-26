# temi Blockly Webapp
This is a webapp built on Node.js/Express, used for building temi apps.


## Prerequisites
### Docker 
For installation instructions on Ubuntu, see: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04


## Build Image
```
$ docker build -t <username>/webapp .
```


## Run Container
```
docker run --restart unless-stopped -d -p 80:8080 rayhrst/webapp
```

* The `--restart unless-stopped` flag starts the container (e.g. at boot) unless it is manually stopped.
* The `-d` flag runs the container in detached mode, leaving the container running in the background. 
* The `-p` flag redirects a public port to a private port inside the container.


## Usage
On the same computer, point your browser to [http://localhost](http://localhost).
