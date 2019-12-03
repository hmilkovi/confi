#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER confi;
    CREATE DATABASE confi;
    GRANT ALL PRIVILEGES ON DATABASE confi TO confi;
EOSQL