getUserLanguage = function () {
    var language = window.navigator.userLanguage || window.navigator.language;
    language=language[0]+language[1];
    return TAPi18n.getLanguage() || language;
};

Meteor.startup(function() {

    //preparing for internationalization
    Session.set("showLoadingIndicator", true); //to show that change of language started and user needs to wait till it finishes

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });


    //working with settings.json
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
        }
    };

    if (!Meteor.settings) {
        console.log("No METEOR_SETTINGS passed in, using locally defined settings.");
        Meteor.settings=settings;
    };

    Meteor.call ('getEnv', function (error,environment) {
	if (environment === "production") {
            Meteor.settings.public = Meteor.settings.public.production;
	} else if (environment === "staging") {
            Meteor.settings.public = Meteor.settings.public.staging;
	} else {
            Meteor.settings.public = Meteor.settings.public.development;
	};
	console.log("Using [ " + environment + " ] Meteor.settings");
	
	//setting the right title
	document.title=Meteor.settings.public.marketplaceName;
    });
});
