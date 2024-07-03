# Testing Traefik, Django, Celery
___
- To configure a Django application in a Docker container with Nginx and 
Traefik, you'll need to set up a few key components: 
  1. Docker containers for __Django__, 
  2. Docker containers for __Nginx__, 
  3. Docker containers for __Traefik__,  
  4. A __network__ for these containers to communicate

### <u>Docker Compose File</u>
Create a `docker-compose.yml` file to define your services.

```yaml
version: '3.7'

services:
  django:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: django
    env_file:
      - .env
    expose:
      - "8000"
    networks:
      - web

  nginx:
    build:
      context: .
      dockerfile: Dockerfile.nginx
    container_name: nginx
    ports:
      - "80:80"
    networks:
      - web

  traefik:
    image: traefik:v2.5
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "8080:8080" # Traefik Dashboard
      - "80:80" # HTTP
    networks:
      - web
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"

networks:
  web:
    driver: bridge

```