#! /bin/bash

docker run -e PGPASSWORD=stepful-app --network=stepful-app-local-dev --rm jbergknoff/postgresql-client  psql -h stepful-app-db -d stepful-app -U stepful-app -p 5432 -c "DROP SCHEMA \"stepful-app\" CASCADE; "

if [[ $1 = "--disable-seed" ]]
then
  docker run -e PGPASSWORD=stepful-app --network=stepful-app-local-dev --rm jbergknoff/postgresql-client psql -h stepful-app-db -d stepful-app -U stepful-app -p 5432 -c "CREATE SCHEMA \"stepful-app\";"
else
  docker run -v $STEPFUL_APP_HOME/local-dev/scripts/seed:/seed -e PGPASSWORD=stepful-app --network=stepful-app-local-dev --rm jbergknoff/postgresql-client  psql -h stepful-app-db -d stepful-app -U stepful-app -p 5432 -f "/seed/dump-stepful-app.sql"
fi

docker run -e PGPASSWORD=stepful-app --network=stepful-app-local-dev --rm jbergknoff/postgresql-client  psql -h stepful-app-db -d stepful-app -U stepful-app -p 5432 -c "ALTER SCHEMA public RENAME TO \"stepful-app\"; "
docker run -v $STEPFUL_APP_HOME/database/stepful-app:/liquibase/lib --network=stepful-app-local-dev liquibase/liquibase liquibase update  --username=stepful-app --password=stepful-app --url=jdbc:postgresql://stepful-app-db:5432/stepful-app --changelogFile=changelog-root.xml


docker run -v $STEPFUL_APP_HOME/local-dev/scripts/seed:/seed -e PGPASSWORD=stepful-app --network=stepful-app-local-dev --rm jbergknoff/postgresql-client  psql -h stepful-app-db -d stepful-app -U stepful-app -p 5432 -f "/seed/seed-postgres-stepful-app.sql"
