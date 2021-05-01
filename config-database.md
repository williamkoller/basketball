## Commands for database setup in PostgreSQL 

### Steps to follow to work on this template:

1 - sudo su - postgres

2 - psql template1

3 - CREATE USER your_user WITH PASSWORD 'yourpassword';

4 - CREATE DATABASE your_database;

5- GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;

6 - ALTER USER your_user WITH Superuser;

7 - ALTER USER your_user PASSWORD 'yourpassword';