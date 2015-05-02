var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Organization Model, to track of individual Organizations
 * ==========
 */

var Organization = new keystone.List('Organization', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Organization.add({
	name: { type: String, required: true, initial: true },
  rating: { type: Number },
  description: { type: String },
	focus: { type: String },
	url: { type: String, required: true, initial: true },
	organizationLogoURL: { type: String },
	type: { type: String },
	notes: { type: String},
	priority: { type: Number, default: 0 },
});

Organization.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Organization.defaultColumns = 'name, rating, url, type, description';
Organization.register();
