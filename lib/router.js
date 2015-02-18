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
	path : '/step-two/'
    });
 
    this.route('stepThree',{
	template : 'stepThree',
	path : '/step-three/'
    });

    this.route('notFound', { path: '*' });
});
