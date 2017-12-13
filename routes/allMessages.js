module.exports = (app, client) => {
	app.get('/allMessages', function(req, res){
		if(req.session.user){
			// const query1 = { // to get username, title, body
			// 	text: `SELECT users.username, messages.title, messages.body FROM users INNER JOIN messages ON users.id=messages.user_id;`
			// }

			// client.query(query1, (err, result) => {
			// 	console.log("result.rows from all messages: ", result.rows)
				res.render('allMessages', {
					messagesArray: [],
					username: req.session.user.name
				})
			// })
		}
		else {
			res.render('login', {
					text: "You must be logged in to view messages, please login below"
			})
		}
	})
}



