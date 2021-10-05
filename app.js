const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const accountSid = 'ACd284e813eeae6da68319666a962f47d3';
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const express = require('express');

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, PATCH');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})

app.post('/', (req, res) => {
    // console.log(req.body)
    client.messages
    .create({
        body: req.body.msg,
        messagingServiceSid: 'MGea76f5e9e32111b1a302b97e121e5360',
        to: req.body.tn
    })
    // .then(message => console.log(message.sid))
    .done();
})


app.listen(3000, () => {
    console.log(`API REST is running in port 3000 !!!`)
})

