#mkdir -p $STEPFUL_APP_HOME/local-dev/postgres-data
docker-compose -f $STEPFUL_APP_HOME/local-dev/docker-compose.infra.yml up -d
$STEPFUL_APP_HOME/local-dev/scripts/services/service-command.sh start $@
