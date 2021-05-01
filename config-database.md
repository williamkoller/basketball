## Commands in PostgreSQL

sudo su - postgres
psql template1

CREATE USER your_user WITH PASSWORD 'yourpassword';
CREATE DATABASE your_database;
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;
ALTER USER your_user WITH Superuser;
ALTER USER your_user PASSWORD 'yourpassword';