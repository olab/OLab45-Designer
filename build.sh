#!/bin/bash
git pull
npm install
test -d build && rm build -r
npm run build
service apache2 restart


