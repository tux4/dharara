var keystone = require('keystone'),
	Contribution = keystone.list('Contribution');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals,
		campaign = keystone.list('Global').model.findOne();

	// Set locals
	locals.section = 'organization';

	// Set locals
	locals.section = 'pledge';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	view.on('post', { action: 'pledge' }, function(next) {

		var newContribution = new Contribution.model(),
			updater = newContribution.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'amount, name, email, message',
			errorMessage: 'There was a problem submitting your pledge:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				var addAmount = parseFloat(req.body.amount)  || 0;
				if (addAmount !== 0) {
					campaign.update({$inc: {'currentTotal': addAmount}}, function(arg1, arg2, resp) {
						if (resp.ok) {
							console.log('New Contribution made: ', addAmount);
						} else {
							console.error('New Contribution failed to update');
						}
					});
				}
				locals.pledgeSubmitted = true;
			}
			next();
		});

	});

	view.query('organizations', keystone.list('Organization').model.find().sort('sortOrder'));

	view.query('campaign', keystone.list('Global').model.findOne());
	// Render the view
	view.render('organization');

};
