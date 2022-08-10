echo '################ MONGO ENTRYPOINT START ################';

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db = db.getSiblingDB('$MONGO_DB_NAME');
db.createUser(
  {
    user: '$MONGO_USER',
    pwd: '$MONGO_PWD',
    roles: [{ role: 'readWrite', db: '$MONGO_DB_NAME' }],
  },
);
EOF

echo '################ MONGO ENTRYPOINT END ################';
