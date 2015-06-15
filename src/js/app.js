require.config({
    shim: {
        "soundcloud": {
            exports: "SC"
        }
    },
    paths: {
        jquery: "../lib/jquery-2.1.4.min",
        backbone: "../lib/backbone-min",
        underscore: "../lib/underscore-min",
        handlebars: "../lib/handlebars-v3.0.3",
        templates: "../templates/compiled"
    }
});

require(["jquery",
         "backbone",
         "pubsub",
         "router",
         "settings"
], function($, Backbone, ps, Router, settings) {
    // set up the soundcloud sdk
    SC.initialize(settings.soundcloud);

    // set up namespace
    window.app = window.app || {};

    // register routes
    app.router = new Router();

    // track urls
    Backbone.history.start({pushState: true});

    // force hrefs to be handled by backbone
    $(document).on("click", "a:not([data-bypass])", function(evt) {
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        var root = location.protocol + "//" + location.host;

        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    // alert any components that the app has started
    ps.trigger("visualizer:start");
});
