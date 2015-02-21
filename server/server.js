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
	//save data to file
	fs=Npm.require('fs');
	path=Npm.require('path');
	dirName=path.resolve('.');
	dirName=dirName.substring(0,dirName.indexOf('HostApp'));
	fs.writeFile(dirName+'marketplaces/'+objMar._id+'.json', JSON.stringify(objMar, null, 4), function (err){
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
