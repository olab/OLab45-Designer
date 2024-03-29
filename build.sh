#!/bin/bash
git pull
npm install
npm run build
service nginx restart


