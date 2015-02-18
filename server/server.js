//var supportEmail="serhiy.khvashchuk@gmail.com";
var supportEmail="meteor.test.mailbox@gmail.com";

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
    }

});
