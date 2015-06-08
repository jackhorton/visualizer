define(["backbone", "templates/welcome"], function(Backbone, welcomeTemplate) {
    var view = Backbone.View.extend({
        el: "#welcome",

        template: welcomeTemplate,

        initialize: function() {
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
