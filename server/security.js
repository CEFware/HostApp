Security.defineMethod("ifEmpty",{
    deny: function (type, arg, userId, doc, fieldNames){
	for (var i=0; i<fieldNames.length; i++){
	    if (doc[fieldNames[i]] && (doc[fieldNames[i]].length>0)) 
		return true;
	}	
	return false;
    }
});

//nobody may remove
Marketplaces.permit(['remove']).never().apply();

//anybody may insert
Marketplaces.permit(['insert']).apply();

//anybody may update only empty fields
Marketplaces.permit(['update']).ifEmpty().apply();
//Marketplaces.permit(['update']).apply(); //this for testing 



//nobody may remove & update 
Emails.permit(['remove','update']).never().apply();

//anybody may insert
Emails.permit(['insert']).apply();

