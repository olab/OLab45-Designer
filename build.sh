#!/bin/bash
set -x 
if [ $# -eq 0 ]
  then
    echo "No arguments supplied: release | debug"
    exit -1
fi
git pull
if [ ! -L "build" ]; then
  ln -s /var/www/vhosts/olab46/$1/designer$1 build
fi

npm install

if [ "$1" == "debug" ]; then
  npx webpack --node-env development
fi

if [ "$1" == "release" ]; then
  npx webpack --node-env production
fi

service nginx restart


