#!/bin/bash
SERVICE=$($STEPFUL_APP_HOME/local-dev/scripts/alias.sh $1)
echo $1 $SERVICE
docker logs $SERVICE --tail 50 --follow
