module.exports = (app, client) => {
	app.post("/signuproute", (req, res)=> {
		var userName = req.body.username
		var passWord = req.body.password
		console.log(req.body.username + ' and ' + req.body.password)

		const query1 = {
			text: `SELECT * FROM users WHERE username = '${userName}';`
		}

		const query2 = {
			text: `INSERT INTO users (username, password) values ('${userName}', '${passWord}');`
		}

		client.query(query1, (err, result) =>{
			console.log("query 1 executed: ", result.rows)
			console.log("res.rows.length: ", result.rows.length)
			if (result.rows.length <= 0){
				client.query(query2)
				req.session.user = {name: userName}
				console.log("req.session.user.name: ", req.session.user.name)
				console.log("query 2 executed, inserting done")
				if(req.session.user.name){
					res.render("profile", {username: req.session.user.name})
				}
			}
			else {
				res.render("signup", {
					text: "Username already exist"
				})
			}
		})
	})
}