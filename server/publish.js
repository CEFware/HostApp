Meteor.publish("currentMarketplace", function (id) {
    return Marketplaces.find({_id:id});
});
