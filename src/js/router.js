define(["backbone", "pubsub"], function(Backbone, ps) {
    var Router = Backbone.Router.extend({
        // routes are used for linking directly to specific songs
        // theyll become more useful when I implement generic soundcloud browsing
        routes: {
            "": "home",
            "welcome": "welcome",
            "signin": "signin",
            "sound/:sound_id": "playSong"
        },

        // homepage
        home: function() {
            // TODO: do something with this
            return;
        },

        // welcome page
        welcome: function() {
            // TODO: do something with this
            return;
        },

        // connect to the soundcloud api
        signin: function() {
            var that = this;
            SC.connect({
                redirect_uri: "http://localhost:8000/connect",
                callback: function() {
                    ps.trigger("visualizer:login");
                    that.navigate("", {trigger: true});
                },
                scope: "non-expiring"
            });
        },

        // tell the tracklist to switch to a new track
        playSong: function(id) {
            // TODO: do something with this
            return;
        }
    });

    return Router;
});
