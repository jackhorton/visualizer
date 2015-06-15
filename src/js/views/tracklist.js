define(["jquery",
        "backbone",
        "pubsub",
        "templates/tracklist"
], function($, Backbone, ps, tracklistTemplate) {
    var view = Backbone.View.extend({
        el: "#tracklist",

        template: tracklistTemplate,

        initialize: function() {
            console.log("wtf");
            this.render();
        },

        render: function() {
            this.$el.append(this.template());
        }
    });

    return view;
});
