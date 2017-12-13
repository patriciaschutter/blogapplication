module.exports = (app, client) => {
	app.post('/inputMessages', function(req, res){
		if(req.session.user){
			var sessionUser = req.session.user.name
			var inputTitle = req.body.title
			var inputMessage = req.body.message

			const query1 = { // inserting the message into database
				text: `INSERT INTO messages (title, body, user_id) SELECT '${inputTitle}', '${inputMessage}', users.id FROM users WHERE users.username = '${sessionUser}';`
			} 

			client.query(query1, (err, result) => {
				console.log("inserted into messages table")
				res.render('addmessage', {
					text: 'Thank you, your blog has been posted',
					username: req.session.user.name
				})
			})
		}
		else {
			res.render("login", { 
						text: "You are not logged in, please login below"
			})
		}
	})
}
