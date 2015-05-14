# dharara

Keystone.js based application for bootstrapping a pledging campaign for Earth quake relief in Nepal.

Starting
--------

Starting without Docker

- Make sure you have Mongo installed. If its not on the same server, set the MONGO_URI environment variable.
- Run the following:

```
npm install
node keystone.js
```

Starting with Docker
- Install Docker and docker-compose
- In Dockerfile, edit MONGO_URI to expected URI. Usually setting the IP to the Host IP works.
- Run the following being in the parent directory:

```
docker-compose up
```

Administration
--------------

Once the app is running, open it in your browser. (http://localhost:3000) . Click 'Sign In' on top left or go to http://localhost:3000/keystone . Use 'admin@example.com' for email and 'admin' for password. Use the admin page
to manage users, change admin password etc. 

You can also manage your campaign contents from here.


Development
-----------

- See gulpfile.js



