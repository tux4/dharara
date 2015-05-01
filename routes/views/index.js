var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.query('contributions', keystone.list('Contribution').model.find().limit(10).sort('-createdDate').select('name message amount'));
	view.query('campaign', keystone.list('Global').model.findOne())
	// Render the view
	view.render('index');

};
