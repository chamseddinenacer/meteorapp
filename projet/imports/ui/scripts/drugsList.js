import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Drugs } from '../../api/collections.js';
import { changeWindow, inspectDrugData } from '../../api/utilities.js';

import '../templates/drugsList.html';

Template.drugsList.helpers({
	drugs() {
		return Drugs.find({});
	},
});

Template.drugsList.events({
	'click #clearDrugs'(e) {
		e.preventDefault();
		Meteor.call('drugs.removeAll');
	}
});

Template.drug.events({
	'click .drug_inspect'(e) {
		e.preventDefault();
		inspectDrugData.set(Drugs.findOne(this._id));
		/* Meteor.call('inspected_drug.removeAll');
		Meteor.call('inspected_drug.insert', data); */
		changeWindow('windowNotice');
	},
	'click .drug_remove' (e) {
		e.preventDefault();
		swal({
			title: this.title,
			text: "Êtes vous sûr de vouloir supprimer ce médicament de votre pharmacie ?",
			buttons: {
				cancel: {
					text: "Annuler",
					value: 'cancel',
					visible: true,
				},
				confirm: {
					text: "Supprimer",
					value: 'confirm',
				}
			},
		})
		.then(result => {
			console.log(result);
			if(result == 'confirm'){
				Meteor.call('drugs.remove', this);
			}
		});
	}
});