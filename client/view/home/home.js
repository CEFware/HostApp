Template.home.helpers({
  contactFormSchema: function() {
    return Schema.contact;
  }
});

AutoForm.addHooks(['contactForm'],{
    onSuccess: function (){
	Flash.success(1,"Thank you!",2000);
    }
});
