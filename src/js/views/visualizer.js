define(["jquery",
        "backbone",
        "pubsub",
        "templates/visualizer"
], function($, Backbone, ps, visualizerTemplate) {
    var view = Backbone.View.extend({
        el: "#visualizer-wrapper",

        template: visualizerTemplate,

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.append(this.template());
        }
    });

    return view;
});
