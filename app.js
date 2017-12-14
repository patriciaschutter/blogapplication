//npm install express express-session pug body-parser pg dotenv)

const express = require("express")
const app = express()
const session = require('express-session')
const bodyParser = require("body-parser")
const pg = require('pg')
const Client = pg.Client
const bcrypt = require("bcrypt")

require ('dotenv').load();

app.use(bodyParser.urlencoded({extended:true}))// 
app.set("view engine", "pug")

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

app.use(session(sess))

// Connecting to the right database, details in .env file
const client = new Client({
	user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
})
client.connect((err) => { 
	if (err) { console.error('connection error', err.stack)} 
	else { console.log('connected')}
})

require("./routes/index.js")(app) 

require("./routes/login.js")(app)
require("./routes/loginroute.js")(app, client, bcrypt)

require("./routes/signup.js")(app)
require("./routes/signuproute.js")(app, client, bcrypt)

require("./routes/logout.js")(app)

require("./routes/profile.js")(app)

require("./routes/addmessage.js")(app)
require("./routes/inputMessages.js")(app, client)

require("./routes/allMessages.js")(app, client)
require("./routes/allPosts.js")(app, client)
require("./routes/myPosts.js")(app, client)
require("./routes/selectUser.js")(app, client)

require("./routes/inputComment.js")(app, client)

// VOORBEELD
// app.post('/inputMessages', function(req, res){
// 	var inputTitle = req.body.title
// 	var inputMessage = req.body.message
	
// 	console.log('My input TITLE: ', inputTitle) // the title input from browser in terminal

// 	const query1 = { // inserting the message from client into database
// 		text: `INSERT INTO messages (title, body) values ('${inputTitle}', '${inputMessage}');`
// 	} 
// 	client.query(query1, (err, result) => { 
// 	})// processing the insert

// 	res.render('thanks') // Thank you message for 2 sec then back to form.
// }) 


app.listen(process.env.webport, ()=>{
	console.log('Running on', process.env.webport)
})

