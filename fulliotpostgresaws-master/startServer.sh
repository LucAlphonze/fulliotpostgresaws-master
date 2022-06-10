#!/bin/sh
cp .env ./restapi/.env
cp .env ./mqttbridge/.env
cp .env ./ejsdashboard/.env
docker-compose up