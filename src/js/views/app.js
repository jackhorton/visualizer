define(["jquery",
        "backbone",
        "pubsub",
        "views/tracklist",
        "views/visualizer",
        "views/player"
], function($, Backbone, ps, TracklistView, VisualizerView, Player) {
    var view = Backbone.View.extend({
        // attach to the main wrapper
        el: "#main",

        // instantiate the app and all required views
        initialize: function() {
            this.$el.removeClass("loggedout").addClass("loggedIn");

            this.$el.append(new TracklistView());
            this.$el.append(new VisualizerView());

            this.listenTo(ps, "visualizer:song:change", this.updateTitle);
        },

        // update the title of the page to reflect the song playing
        updateTitle: function(track, artist) {
            $("title").innerHTML(artist + " - " + track.title)
        }
    });

    return view;
});
