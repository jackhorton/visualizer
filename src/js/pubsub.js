define(["underscore", "backbone"], function(_, Backbone) {
    // set up our personal publish/subscribe bus
    var pubsub = _.extend({}, Backbone.Events);

    return pubsub;
});
