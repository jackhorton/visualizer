define(["backbone", "templates/welcome", "pubsub"], function(Backbone, welcomeTemplate, ps) {
    var view = Backbone.View.extend({
        el: "#welcome",

        template: welcomeTemplate,

        initialize: function() {
            this.listenTo(ps, "visualizer:login", this.remove);

            this.render();
        },

        // the templates come in pre-compiled
        // calling them as a function returns the html
        render: function() {
            this.$el.html(this.template());
        }
    });

    return view;
});
