#!/bin/bash
git pull
npm install --force
export NODE_OPTIONS=--openssl-legacy-provider
npm run-script build
service nginx restart
