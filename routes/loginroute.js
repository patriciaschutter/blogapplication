module.exports = (app, client) => {
	app.post("/loginroute", (req, res) => {
		var userName = req.body.username
		var passWord = req.body.password
		console.log(req.body.username + ' and ' + req.body.password)

		const query1 = {
			text: `SELECT id FROM users WHERE username = '${userName}' and password = '${passWord}';`
		}

		client.query(query1, (err, result) => {
			console.log("result.rows query1 = ", result.rows)
			console.log("res.rows.length: ", result.rows.length)
			if (result.rows.length == 1){ // so if there is a match with username and password
				req.session.user = {name: userName}
				console.log("req.session.user.name: ", req.session.user.name)
				if(req.session.user.name){
					res.render("profile", {username: req.session.user.name})
				}
			}
			else {
				res.render("login", {
					text: "Username and/or password are incorrect"
				})
			}
		})
	})
}