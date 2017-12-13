module.exports = (app) => {
	app.get('/profile', (req, res) => {
		if(req.session.user){
			res.render('profile', {username: req.session.user.name})
		}
		else {
			res.render("login", {
					text: "You are not logged in, please login below"
			})
		}
	})
}