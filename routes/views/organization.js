var moment = require('moment');
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
	locals.addAmount = parseFloat(req.body.amount)  || 0;

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
				if (locals.addAmount !== 0 && locals.addAmount < 5000) {
					campaign.update({$inc: {'currentTotal': locals.addAmount}}, function(arg1, arg2, resp) {
						if (resp.ok) {
							console.log('New Contribution made: ', locals.addAmount);
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
