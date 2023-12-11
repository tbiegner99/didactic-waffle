cd $STEPFUL_APP_HOME/database/stepful-app

if [[ -z "$1" ]]; then
    echo "Pass a description of changes as first arg"
    exit 1
fi

xmlstarlet --version

if [[ "$?" != "0" ]]; then
echo "xmlstarlet not installed. Install it."
exit 4;
fi
# open develop
liquibase --changelog-file=changelog-root.xml diff-changelog \
--url=jdbc:postgresql://ENTER_HERE/stepful-app \
--username stepful-app --password stepful-app \
--reference-url=jdbc:postgresql://127.0.0.1/stepful-app \
--reference-username stepful-app \
--reference-password stepful-app;

FILENAME="$(date -I)-${1}.xml"
 CONTENT=`xmlstarlet sel -N xsi="http://www.liquibase.org/xml/ns/dbchangelog" -t -c "/xsi:databaseChangeLog/xsi:changeSet"  changelog-root.xml`


xmlstarlet ed -L -N xsi="http://www.liquibase.org/xml/ns/dbchangelog" \
 -d "/xsi:databaseChangeLog/xsi:changeSet" \
 -s "/xsi:databaseChangeLog" -t elem -n includeTMP \
 -i "//includeTMP" -t attr -n "file" -v "changelogs/${FILENAME}" \
 -r //includeTMP -v include changelog-root.xml

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<databaseChangeLog
   xmlns=\"http://www.liquibase.org/xml/ns/dbchangelog\"
   xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
   xmlns:pro=\"http://www.liquibase.org/xml/ns/pro\"
   xsi:schemaLocation=\"http://www.liquibase.org/xml/ns/dbchangelog
      http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd
      http://www.liquibase.org/xml/ns/pro 
      http://www.liquibase.org/xml/ns/pro/liquibase-pro-4.1.xsd\">

${CONTENT}

</databaseChangeLog>" > changelogs/$FILENAME

 (cat changelogs/$FILENAME | xml tr $STEPFUL_APP_HOME/local-dev/scripts/utils/sort-changesets.xml | xml fo --nsclean) > tmp.xml 
  mv tmp.xml changelogs/$FILENAME

# cat changelogs/$FILENAME | xml fo --nsclean > changelogs/$FILENAME