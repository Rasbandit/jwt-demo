const express = require('express')
const bodyParser = require('body-parser')

// jsonwebtoken is the library that allows us to generate and verify our JWTs
const jwt = require('jsonwebtoken')

const app = express()
const port = 3001

// This is our secret. It will be used to encrpyt and verify our JWTs.
// The security our information depends on this being hidden, so you don't want to push this to github.
// But for this example we're just going to have it in the open.
const secret = "This is a secret"

app.use(bodyParser.json())

// This custom middleware is going to check every request to see if it's carrying a valid JWT
app.use(function(req,res,next){
    // This checks to see if the request is actually just trying to login.
    // if it is, we'll let them pass without needing a token.
    if(req.originalUrl === '/api/login') {
        next()
    } else {
        // Here we are grabbing the token from the query of the request.
        // You can pass a token any way you can pass a string of characters, since that is all it is.
        // Common ways are also in the body and the header.
        // Here we are only looking at the query for simplicity's sake 
        var token = req.query.token

        // Here we are checking the token we get.
        // the .verify method takes in the token we want to decode, the secret we used to encrypt it, and (optionally) a callback function
        jwt.verify(token, secret, function(err, decoded){
            // if there is an issue decoding it, such as the token is invalid, it will pass us an err object
            // this tells us that the token the request gave is invalid, and we can prevent them from accessing any of our data
            if (err) {
                return res.status(401).json('Failed to authenticate token.');    
              } else {

                // if it does succeed in decoding the token, we save the decoded payload onto the request, and send the request to where it was trying to go.
                req.decoded = decoded;
                next();
              }
        })
    }
})

// Hard coded user
var user = {
    username: 'user',
    password: 'password123'
}

app.post('/api/login', function (req, res) {
    // Here we are checking to see if the username and password we were sent in the body is the same as our hard-code user
    // Normally, this is where you'd query your database, but for this example we're just using hard coded data
    if(req.body.username === user.username && req.body.password === user.password) {
        // if the username and password matches, we generate a new JWT
        // the .sign method takes in a payload to encode, and the secret by which we want to encode it. We'll have to use this same secret to verify it
        // We then send the newly made token back to the client, whose responsibility it is to save it
        var token = jwt.sign(user, secret)
        res.status(200).send(token)
    } else {
        res.status(401).json('Incorrect username or password')
    }
})


var data = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Morbi sit amet leo ut lorem facilisis consectetur rutrum eu diam.",
    "Nullam vestibulum leo a purus tincidunt, vel consequat eros cursus.",
    "Pellentesque mattis velit eget vehicula aliquet.",
    "Vivamus porttitor erat at molestie fermentum.",
    "Morbi ac est nec urna rutrum facilisis."
]

app.get('/api/getdata', function (req, res) {
    res.status(200).send(data)
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})