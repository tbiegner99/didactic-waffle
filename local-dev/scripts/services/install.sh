
if [ "$1" = "clean" ]; then
    shift
    $STEPFUL_APP_HOME/local-dev/scripts/services/service-command.sh clean $@
fi
$STEPFUL_APP_HOME/local-dev/scripts/services/service-command.sh install $@
$STEPFUL_APP_HOME/local-dev/scripts/services/service-command.sh start $@
