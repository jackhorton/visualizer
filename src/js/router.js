define(["backbone", "pubsub", "views/welcome", "views/app"], function(Backbone, ps, WelcomeView, AppView) {
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
            if (app.loggedin) {
                console.log("Starting app");
                app.main = app.main || {};
                return app.main.view = new AppView();
            } else {
                this.navigate("/welcome", {trigger: true, replace: true});
            }
        },

        // welcome page
        welcome: function() {
            app.welcome = app.welcome || {};
            return app.welcome.view = new WelcomeView();
        },

        // connect to the soundcloud api
        signin: function() {
            var that = this;
            SC.connect({
                redirect_uri: "http://localhost:8000/connect",
                callback: function() {
                    ps.trigger("visualizer:login");
                    app.loggedin = true;
                    if (app.welcome.view && typeof app.welcome.view === "object") {
                        app.welcome.view.remove();
                    }
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
