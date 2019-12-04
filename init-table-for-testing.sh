#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS citext;

    CREATE TABLE IF NOT EXISTS booking(
        id  serial not null primary key,
        firstname varchar(240) not null,
        lastname varchar(240) not null,
        email citext unique not null,
        phone varchar(200) not null,
        confirmation_code citext unique not null,
        conference_name text not null
    );
EOSQL