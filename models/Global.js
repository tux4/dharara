var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Global Model, that defines the campaign name, expected contribution etc
 * ==========
 */

var Global = new keystone.List('Global', {
	map: { name: 'campaignName' },
	autokey: { path: 'slug', from: 'campaignName', unique: true },
	nodelete: true,
	nocreate: true,
});

Global.add({
	campaignName: { type: String, required: true, index: true},
	campaignLogo: { type: Types.CloudinaryImage },
  currentTotal: { type: Types.Money },
  goal: { type: Types.Money },
  introduction: {
		image: { type: Types.CloudinaryImage },
		short: { type: Types.Html, wysiwyg: true, height: 150 },
		long: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	primaryContact: { type: Types.Email, initial: true, required: true, index: true },
});

Global.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Global.defaultColumns = 'campaignName, currentTotal, goal, primaryContact';
Global.register();
