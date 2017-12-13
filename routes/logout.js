module.exports = (app) => {
	app.get('/logout',function(req,res){
	// if the user logs out, destroy all of their individual session
		req.session.destroy(function(err) {
			if(err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		})
	})
}