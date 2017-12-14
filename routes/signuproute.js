module.exports = (app, client, bcrypt) => {
	app.post("/signuproute", (req, res)=> {
		var userName = req.body.username
		var passWord = req.body.password
		
		console.log(req.body.username + ' and ' + req.body.password)

		bcrypt.hash(passWord, 8, function(err, hash) {
			if(err !== undefined){
				console.log(err)
			} 
			else {

				const query1 = {
					text: `SELECT * FROM users WHERE username = '${userName}';`
				}
				
				const query2 = {
					text: `INSERT INTO users (username, password) values ('${userName}', '${hash}');`
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
			}
		})
	})
}




// bcrypt.hash('myPassword', 10, function(err, hash) {
//   // Store hash in database
// });
// To verify the password later on:

// bcrypt.compare('somePassword', hash, function(err, res) {
//   if(res) {
//    // Passwords match
//   } else {
//    // Passwords don't match
//   } 
// });

