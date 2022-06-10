@echo off
copy ".env" "./restapi/.env"
copy ".env" "./mqttbridge/.env"
copy ".env" "./ejsdashboard/.env"
docker-compose up