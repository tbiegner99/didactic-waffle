set -x
CMD=$1
case $CMD in 
    build)
    COMMAND="up -d --build"
    ;;
    start)
    COMMAND="up -d"
    ;;
    stop)
    COMMAND="down"
    ;;
    remove)
    COMMAND="rm"
    ;;
    install)
    COMMAND="run"
    ;;
    clean)
    COMMAND="run"
    ;;
esac

shift
if [ -z "$@" ]; then
    ARGS=$(find $STEPFUL_APP_HOME/backend -type f -iname "docker-compose.yml" -exec printf ' -f %s ' '{}' +)

    ARGS="-f $STEPFUL_APP_HOME/local-dev/docker-compose.services.yml -f $STEPFUL_APP_HOME/ui/docker-compose.yml $ARGS"

    docker-compose -p  $ARGS $COMMAND
else 
    ARGS="-f $STEPFUL_APP_HOME/local-dev/docker-compose.services.yml "
    for ALIAS in $@
    do
        SERVICE=$($STEPFUL_APP_HOME/local-dev/scripts/alias.sh $ALIAS)
        
        if [ "$SERVICE" = "stepful-app-ui" ]; then
            COMPOSE_FILE="-f $STEPFUL_APP_HOME/ui/docker-compose.yml"
        else
            COMPOSE_FILE=$(find $STEPFUL_APP_HOME/backend/$SERVICE -type f -iname "docker-compose.yml" -exec printf ' -f %s ' '{}' +)
        fi

       
        if [ ! -z "$COMPOSE_FILE" ]; then
            docker stop $SERVICE 
            docker rm $SERVICE
            ARGS="$COMPOSE_FILE $ARGS"
            if [ "install" = "$CMD" ]; then
                COMMAND="$COMMAND --rm -w /srv/package/cmd $SERVICE go install"
            elif [ "clean" = "$CMD" ]; then
                COMMAND="$COMMAND --rm -w /srv/package $SERVICE go clean -modcache"
            fi
        else 
            echo "NO compose file for service $SERVICE. Ignoring..."
        fi
        
    done
    if [ ! -z "$ARGS" ]; then
        docker-compose  $ARGS -p stepful-app $COMMAND
    fi
fi
