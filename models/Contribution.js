var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Contribution Model, to track of individual contributions
 * ==========
 */

var Contribution = new keystone.List('Contribution', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Contribution.add({
	name: { type: String },
  amount: { type: Types.Money, required: true, initial: true },
	email: { type: Types.Email },
	affiliation: { type: Types.Select, options: 'Columbia, Others', default: 'Others', index: true },
  message: { type: String },
  createdDate: { type: Types.Datetime, index: true, default: Date.now },
});

Contribution.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Contribution.defaultColumns = 'name, amount, email, affiliation, message, createdDate';
Contribution.register();
