define(["jquery",
        "backbone",
        "pubsub",
        "views/tracklist",
        "views/visualizer",
        "views/player"
], function($, Backbone, ps, TracklistView, VisualizerView, AudioController) {
    var view = Backbone.View.extend({
        // attach to the main wrapper
        el: "#main",

        // instantiate the app and all required views
        initialize: function() {
            this.$tracklist = this.$("#tracklist");
            this.$visualizer = this.$("#visualizer-wrapper");
            this.$controls = this.$("#controls");
            this.$commentlist = this.$("#commentlist");

            // this.$tracklist.html(new TracklistView().render().el);
            // this.$visualizer.html(new VisualizerView().render().el);
            // this.$controls.html(new AudioController().render().el);

            this.listenTo(ps, "visualizer:song:change", this.updateTitle);
        },

        // update the title of the page to reflect the song playing
        updateTitle: function(track, artist) {
            $("title").innerHTML(artist + " - " + track.title)
        }
    });

    return view;
});
