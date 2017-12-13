module.exports = (app) => {
	app.get('/addmessage', (req, res) => {
		if(req.session.user){
			res.render('addmessage', {username: req.session.user.name})
		}
		else {
			res.render("login", {
						text: "You are not logged in, please login below"
			})
		}
	})
}