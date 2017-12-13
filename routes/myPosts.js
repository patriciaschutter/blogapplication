module.exports = (app, client) => {
	app.post('/myPosts', function(req, res){
		if(req.session.user){
			console.log(req.session.user.name)
			var userSearch = req.session.user.name
			console.log("USERSEARCX", userSearch)

			const query1 = {
				text: `SELECT users.username, messages.title, messages.body FROM users INNER JOIN messages ON users.id=messages.user_id WHERE user_id = (SELECT (id) FROM users WHERE username = '${userSearch}');`
			}

			client.query(query1, (err, result) => {
				console.log("result.rows query ", result.rows)
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