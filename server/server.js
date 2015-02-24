//var supportEmail="serhiy.khvashchuk@gmail.com";
var supportEmail="meteor.test.mailbox@gmail.com";

Meteor.startup(function(){
//console.log(Marketplaces.find().fetch());
});

Meteor.methods({

    sendEmail: function (doc) {
	
        check(doc, Schema.contact);
	
	var text = "From e-mail: " + doc.email + "\n\n\n\n"+ doc.message;

        this.unblock();

        return Email.send({
            to: supportEmail,
            from: doc.email,
            subject: "CEFshare contact form from "+doc.email,
            text: text
        });
    },

    getTheRoute : function (id) {
	var objMar=Marketplaces.findOne({_id:id});
	objMar.color="green";
	objMar.public={};
	objMar.public.color=objMar.color;
	objMar.public.marketplaceName=objMar.marketplaceName;
	//save data to file
	fs=Npm.require('fs');

	fs.writeFile(Meteor.settings.private.path+objMar._id+'.json', JSON.stringify(objMar, null, 4), function (err){
	    if (err) {
		console.log(err);
	    }else{
		console.log('saved');
	    };
	});

//call sh to clone the marketplace
//https://gentlenode.com/journal/meteor-14-execute-a-unix-command/33
 
//sample url to redirect
	return objMar.marketplaceName+".com";
    }

});
