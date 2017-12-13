module.exports = (app, client) => {
	app.post('/allPosts', function(req, res){
		if(req.session.user){
			const query1 = { // to get username, title, body
				text: `SELECT users.username, messages.title, messages.id, messages.body FROM users INNER JOIN messages ON users.id=messages.user_id;`
			}

			client.query(query1, (err, result) => {
				console.log("result.rowsSSS from all messages: ", result.rows)
				res.render('allMessages', {
					messagesArray: result.rows,
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




