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
	url: { type: String, required: true, initial: true },
	organizationLogo: { type: String },
	type: { type: Types.Select, options: 'Immediate Relief, Long Term Reconstruction' },
  description: { type: String },
});

Organization.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Organization.defaultColumns = 'name, rating, url, type, description';
Organization.register();
