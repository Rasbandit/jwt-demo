# JWT Demo
## Installation
Once you've cloned the project and installed the `node_modules`, run `npm start` in one terminal and `node server/index.js` in another. The login form requires a hard-coded user: username: user, password: password123
## Introduction
What are JWTs? JWT stands for JSON Web Token. JWTs are way of encrypting a JSON object into a string that can be saftey transfered across the internet. The are able to be "signed" with a secret, and we can use that secret to decrypt it and verify that it wasn't tampered along the way.

JWTs are really handy for two reasons:
 1. They are very small, making them viable to be sent as part of the URL, request body, or header.
 1. Because you can safetly store data in them, you can store user data inside them. This makes it so your server doesn't have to remember everything about every user that is logged in and using your site. With something like Sessions, your server has to store all the session information in memory which can quickly become a scalability problem. Using JWTs for your authorization puts the responsibility of remembering on the client.
 
## Authentication using JWTs
Here is the basic idea behind using JWTs for authentication:
1. The client sends a request to your server to login, containing a username and password.
2. Your server checks the username and password to see if it matches a user and the password is correct.
3. If it is, it generates or "signs" a JWT using the user's information and a predefined secret.
4. The server sends the newly created JWT back to the client, and it is its responsibility to remember the token and send it back with every subsequent request.
5. The client makes a request to one of your other endpoints, hopefully with the token your server gave it.
6. Your server will look at the token and "verify" it. The server uses the secret that it used to originally encode the JWT.
7. If the server is able to properly verify the token, it will send the request along to its original destination.
8. If it is unable to verify the token, it will prevent the request from going any further and send an error back.
 
You can see a working demo of this is in the included code. You'll mainly want to look at the `server/index.js`. It is the entirety of the backend, where most of the work is being done. You can also check out the `src/components/app.js` to see how it stores and uses the token the server gives it.

We haven't covered everything there is to knwo about JWTs, just enough to get something working. If you would like to read more about JWTs, I recommend starting with the offical site: https://jwt.io/introduction/