Template.changeLang.events({
    'change' : function (event) {
        if (TAPi18n.getLanguage() != event.currentTarget.value) {
            TAPi18n.setLanguage(event.currentTarget.value);
        }
    }
});

Template.changeLang.helpers({
    languages : function() {
	return [{ "code":"en", "name":"English", "selected": (TAPi18n.getLanguage()=="en" ? "selected" : "")},
		{ "code":"ua", "name":"Українська", "selected": (TAPi18n.getLanguage()=="ua" ? "selected" : "")}];
    }
});


