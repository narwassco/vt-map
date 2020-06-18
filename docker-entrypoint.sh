#!/bin/bash

cd /tmp/src/vt-map
git reset --hard
git pull origin master
rm -rf node_modules
npm i
npm run build