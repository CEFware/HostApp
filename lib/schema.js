languagesOptions = function (variant) {
    var arrR=[];
    switch (variant) {
        case "codes":
        _.each(TAPi18n.getLanguages(),function (v,k,o) {
            arrR.push(k);
        });
        break;
        case "options":
        _.each(TAPi18n.getLanguages(),function (v,k,o) {
            arrR.push({value: k, label: v.name});
        });
        break;
    };
    return arrR;
};

Schema = {};

SimpleSchema.messages({
  "passwordMismatch": function () {return i18n.t("Passwords do not match")}
});

Schema.contact = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: function () {return TAPi18n.__("E-mail address")}
    },
    message: {
        type: String,
        label: function () {return TAPi18n.__("Message")},
        max: 1000
    }
});

Schema.emails = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: function () {return TAPi18n.__("E-mail address")}
    },
    createdAt: {
	type: Date,
	autoValue: function() {
            if (this.isInsert) {
		return new Date;
            } else if (this.isUpsert) {
		return {$setOnInsert: new Date};
            } else {
		this.unset();
            }
	}
    }
});

Schema.marketplace = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: function () {return TAPi18n.__("E-mail address")},
	optional : false
    },
    firstName: {
        type: String,
        label: function () {return TAPi18n.__("First Name")},
        max: 100,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },
    lastName: {
        type: String,
        label: function () {return TAPi18n.__("Last Name")},
        max: 100,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },
    password: {
	type: String,
	label: function () {return TAPi18n.__("Enter a password")},
	min: 8,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },
    confirmPassword: {
	type: String,
	label: function () {return TAPi18n.__("Re-type the password")},
	min: 8,
	custom: function () {
	    if (this.value !== this.field('password').value) {
		return "passwordMismatch";
	    }
	},
	optional : true
    },

    country : {
	type: String,
	autoform : {
	    type: "select2",
	    options : function () {
		return Countries.find().map(function (obj){
		    return {label:obj.name, value: obj.name};
		});
	    }
	},
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },

//here we'll provide the selection from the translations we have ready
    language : {
	type: String,
	allowedValues: function () {return languagesOptions('codes')},
	autoform : {
	    type: "select2",
	    options: function() {return languagesOptions('options')},
	},
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },

    marketplaceType : {
	type: String,
	allowedValues: ['product','rental','service'],
	autoform : {
	    type: "select2",
	    options: {
		product: function () {return TAPi18n.__("PRODUCT marketplace")},
		rental: function () {return TAPi18n.__("RENTAL marketplace")},
		service: function () {return TAPi18n.__("SERVICE marketplace")}
	    }
	},
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },

    marketplaceName: {
        type: String,
        label: function () {return TAPi18n.__("Marketplace name")},
        max: 144,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },

    createdAt: {
	type: Date,
	autoValue: function() {
            if (this.isInsert) {
		return new Date;
            } else if (this.isUpsert) {
		return {$setOnInsert: new Date};
            } else {
		this.unset();
            }
	}
    }

});

Marketplaces.attachSchema(Schema.marketplace);
Emails.attachSchema(Schema.emails);
