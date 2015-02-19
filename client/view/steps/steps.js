AutoForm.addHooks(['stepOne'],{
    onSuccess: function (operation, result, template){
	Router.go('stepTwo', {_id:result});
    }
});

AutoForm.addHooks(['stepTwo'],{
    onSuccess: function (operation, result, template){
	Router.go('stepThree', {_id:Router.current().params._id});
    }
});

AutoForm.addHooks(['stepThree'],{
    onSuccess: function (operation, result, template){
	//show cogs
	template.$('.btn').prop("disabled","disabled");
	template.$('.btn').addClass("disabled");
	template.$('.placeForCogs').html('<i class="fa fa-refresh fa-spin"></i>');
	//disable the button

	//save data to file --> run sh to clone the marketplace --> send to new shop 
	Meteor.call('getTheRoute',Router.current().params._id, function (error, result) {Router.go("/external/"+result);});
    }
});


Template.stepTwo.rendered= function (){
//    this.$('select[name=country]').select2({placeholder:"Select country of operation"});
    this.$('select[name=language]').select2({minimumResultsForSearch: -1,placeholder:"Marketplace main language"});
    this.$('select[name=marketplaceType]').select2({minimumResultsForSearch: -1, placeholder:"Choose marketplace type"});
};

Template.stepThree.rendered= function (){
    this.$('select[name=marketplaceType]').select2({minimumResultsForSearch: -1, placeholder:"Choose marketplace type"});
};
