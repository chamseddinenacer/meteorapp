import '../templates/profile.html';

import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Profile } from '../../api/collections';

let displayInputs = new ReactiveVar(Profile.findOne() == undefined ? false : true);

Template.profile.helpers({
  fields: [
      { fieldName: 'Sexe',
        fieldId: 'sex' },
      { fieldName: 'Prénom', 
        fieldId: 'fn'},
      { fieldName: 'Nom',
        fieldId: 'ln' },
      { fieldName: 'Age',
        fieldId: 'age' },
      { fieldName: 'Taille',
        fieldId: 'hgt' },
      { fieldName: 'Poids',
        fieldId: 'wgt' },
      { fieldName: 'Numéro AVS',
        fieldId: 'avs' },
    ],
  profImage: [
    {
      imgsrc: '/images-svg/profile.svg'
    }
  ],
  hasProfileData() {
    return Template.instance().data != undefined;
  },
  getProfileField(index){
    return Template.instance().data[index];
  },
  getDisplay(){
    return displayInputs.get();
  }
});

Template.profile.events({
  'click #confirmButton'() {
    let profileArray = Array.from(document.querySelectorAll('.field_textInput')).map(v => v.value);
    Meteor.call('profile.insert', profileArray)
    displayInputs.set(false);
  },
  'click #modifyButton'() {
    displayInputs.set(true);
  },
  'click #confirmModify'() {
    let profileArray = Array.from(document.querySelectorAll('.field_textInput')).map(v => v.value);
    Meteor.call('profile.update', Profile.findOne({})._id, profileArray.reduce((o, key, i) => Object.assign(o, {[i] : key}),{}));
    displayInputs.set(false);
  }
});