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
//	template.$().
	//make meteor run sh to clone the marketplace -> show cogs -> send to new shop 
	//Meteor.call('getTheRoute',result, function (route) {Router.go(route);});
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
