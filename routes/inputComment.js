module.exports = (app, client) => {
	app.post('/inputComment', function(req, res){
		if(req.session.user){
			var sessionUser = req.session.user.name
			var comment = req.body.comment
			var messageID = req.body.messageID
			





			const query1 = { // inserting the message into database
				text: `INSERT INTO comments (comment, message_id, user_id) SELECT '${comment}', '${messageID}', users.id FROM users WHERE users.username = '${sessionUser}';`
			} 

			client.query(query1, (err, result) => {
				console.log("inserted into comments table")
				res.render('allMessages', {
					text: 'Thank you, your comment has been added',
					username: req.session.user.name,
					messagesArray: []
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
