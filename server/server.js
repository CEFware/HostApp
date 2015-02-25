Meteor.startup(function(){
    var environment=Meteor.call ('getEnv');
    var settings = {
        "public": {
            "development":
            {
                "marketplaceName": "DEVELOPMENT",
                "color":"green"
            },
            "staging":
            {
                "marketplaceName": "STAGING",
                "color":"green"
            },
            "production":
            {
                "marketplaceName": "PRODUCTION",
                "color":"green"
            }
        },
        "private": {
            "development":
            {
                "path":"/home/shkomg/marketplaces/",
                "supportEmail":"meteor.test.mailbox@mail.com"
            },
            "staging":
            {
                "path":"/root/marketplaces/",
                "supportEmail":"meteor.test.mailbox@mail.com"
            },
            "production":
            {
                "path":"/home/shkomg/marketplaces/",
                "supportEmail":"meteor.test.mailbox@mail.com"
            }
        }
};

    if (!process.env.METEOR_SETTINGS) {
	console.log("No METEOR_SETTINGS passed in, using locally defined settings.");
	Meteor.settings=settings;
    };

    if (environment === "production") {
	Meteor.settings.public = Meteor.settings.public.production;
	Meteor.settings.private = Meteor.settings.private.production;
    } else if (environment === "staging") {
	Meteor.settings.public = Meteor.settings.public.staging;
	Meteor.settings.private = Meteor.settings.private.staging;
    } else {
	Meteor.settings.public = Meteor.settings.public.development;
	Meteor.settings.private = Meteor.settings.private.development;
    };
    console.log("Using [ " + environment + " ] Meteor.settings");

});

Meteor.methods({

    sendEmail: function (doc) {
	
        check(doc, Schema.contact);
	
	var text = "From e-mail: " + doc.email + "\n\n\n\n"+ doc.message;

        this.unblock();

        return Email.send({
            to: Meteor.settings.private.supportEmail,
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
    },

    getEnv : function () {
	return  (process.env.METEOR_ENV || "development");
    }
});
