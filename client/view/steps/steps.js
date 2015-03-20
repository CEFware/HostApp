AutoForm.addHooks(['stepOne'],{
    onSuccess: function (formType, result){
	Router.go('stepTwo', {_id:result});
    }
});

AutoForm.addHooks(['stepTwo'],{
    onSuccess: function (formType, result){
	Router.go('stepThree', {_id:Router.current().params._id});
    }
});

AutoForm.addHooks(['stepThree'],{
    onSuccess: function (formType, result){
	//show cogs
	this.template.$('.btn-lg').prop("disabled","disabled");
	this.template.$('.btn-lg').addClass("disabled");
	this.template.$('.placeForCogs').html('<i class="fa fa-refresh fa-spin"></i>');
	//disable the button

	//save data to file --> run sh to clone the marketplace --> send to new shop 
	Meteor.call('getTheRoute',Router.current().params._id, function (error, result) {Router.go("/external/"+result);});
    }
});


Template.stepTwo.rendered= function (){
//    this.$('select[name=country]').select2({placeholder:TAPi18n.__("Select country of operation")});
    this.$('select[name=language]').select2({minimumResultsForSearch: -1,placeholder:TAPi18n.__("Marketplace main language")});
    this.$('select[name=marketplaceType]').select2({minimumResultsForSearch: -1, placeholder:TAPi18n.__("Choose marketplace type")});
};

Template.stepThree.rendered= function (){
    this.$('select[name=marketplaceType]').select2({minimumResultsForSearch: -1, placeholder:TAPi18n.__("Choose marketplace type")});
};
