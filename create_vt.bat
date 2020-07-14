cd C:\docker\vt-map
git pull origin master
rmdir /s /q node_modules
del /q package-lock.json
npm install
docker-compose up
npm run deploy