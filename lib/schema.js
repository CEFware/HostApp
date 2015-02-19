Schema = {};

SimpleSchema.messages({
  "passwordMismatch": "Passwords do not match"
});

Schema.contact = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address"
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
});

Schema.marketplace = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address",
	optional : false
    },
    firstName: {
        type: String,
        label: "First Name",
        max: 100,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 100,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },
    password: {
	type: String,
	label: "Enter a password",
	min: 8,
	optional : true,
	custom : function () {
	    if (this.isUpdate && (this.value.length===0)) 
		return "required";
	}
    },
    confirmPassword: {
	type: String,
	label: "Re-type the password",
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
	allowedValues: ['ENG'],
	autoform : {
	    type: "select2",
	    options: {
		ENG: "English"
	    }
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
		product: "PRODUCT marketplace",
		rental: "RENTAL marketplace",
		service: "SERVICE marketplace"
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
        label: "Marketplace name",
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
