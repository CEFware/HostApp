Router.configure ({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate : 'notFound'
});

Router.map (function () {	    
    this.route('home',{
	template : 'home',
	path : '/'
    });
 
    this.route('stepOne',{
	template : 'stepOne',
	path : '/step-one'
    });

    this.route('stepTwo',{
	template : 'stepTwo',
	path : '/step-two/:_id',
	waitOn : function () {
	    return Meteor.subscribe('currentMarketplace',this.params._id);
	}, 
	data : function () {
	    return Marketplaces.findOne({_id:this.params._id});
	}
    });
 
    this.route('stepThree',{
	template : 'stepThree',
	path : '/step-three/:_id',
	waitOn : function () {
	    return Meteor.subscribe('currentMarketplace',this.params._id);
	}, 
	data : function () {
	    return Marketplaces.findOne({_id:this.params._id});
	}
    });

    this.route('notFound', { path: '*' });
});
