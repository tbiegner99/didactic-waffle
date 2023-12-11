#!/bin/bash

case $1 in 
    pull-device-db | pddb)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/utils/pull-device-db.sh $@
        ;;
    alias)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/alias.sh $@
        ;;
     sh)
        shift
        SERVICE=$($STEPFUL_APP_HOME/local-dev/scripts/alias.sh $1)
        shift
        docker exec -it $SERVICE sh
        ;;

     exec | e)
        shift
        SERVICE=$($STEPFUL_APP_HOME/local-dev/scripts/alias.sh $1)
        shift
        docker exec -it $SERVICE $@
        ;;
    clean-install | ci)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/services/install.sh clean $@
        ;;
    install | ci)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/services/install.sh $@
        ;;
    logs | l) 
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/utils/log.sh $@
    ;;
    start | s)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/services/start.sh $@
    ;;
    stop | x)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/services/stop.sh $@
    ;;
    rebuild | rb)
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/services/rebuild.sh $@
    ;;

    db-reset | reset-db | dbr)
        shift;
        $STEPFUL_APP_HOME/local-dev/scripts/setup/reset-db.sh $@
        ;;
    db-migrate | migrate-db | dbm)
        $STEPFUL_APP_HOME/local-dev/scripts/setup/update-db.sh
        ;;
    db-update | dbu)
        $STEPFUL_APP_HOME/local-dev/scripts/setup/update-db.sh
        ;;

    generate-changeset | dbcs | gcs)
        shift;
        $STEPFUL_APP_HOME/local-dev/scripts/utils/generate-changeset.sh $@
        ;;

    restart | r) 
        shift
        $STEPFUL_APP_HOME/local-dev/scripts/services/restart.sh $@
    ;;
esac