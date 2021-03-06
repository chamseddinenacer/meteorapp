import '../templates/drugsList.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Drugs } from '../../api/collections.js';
import { lastActivePage } from '../../api/utilities.js';

export const deleteEnabled = new ReactiveVar(false);

Template.drugsList.helpers({
	drugs() {
		// return all drugs whose _id is containd in this category's foreign keys
		return Drugs.find({ _id: { $in: Template.instance().data.extKeys } });
	},
	trashIcons: [
		{imgsrc: '/images-svg/rubbish-bin.svg'}
	]
});

Template.drugsList.events({
	'click #clearDrugs'(e) {
		e.preventDefault();
		//Toggle Rubbish bin red background when clicked	
		$('#clearDrugs').toggleClass("btn-danger");
		
		if (deleteEnabled.get()) {
			// user is already deleting drugs
			deleteEnabled.set(false);
		} else {
			// user is not already deleting drugs
			deleteEnabled.set(true);
		}
	},
	'click #backButton'() {
		Router.go('/');
	}
});

Template.drug.helpers({
	deleteEnabled() {
		return deleteEnabled.get();
	},
	hasImage() {
		return Template.instance().data.imgpath != undefined;
	}
})

Template.drug.events({
	'click .drug_container'(e) {
		e.preventDefault();
		Router.go(`/details/${this._id}`);
		lastActivePage.set('/');
	},
	'click .drug_remove'(e) {
		e.preventDefault();
		Meteor.call('drugs.remove', this._id)
	}
});