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
         "views/welcome",
         "views/app"
], function($, Backbone, ps, Router, WelcomeView, AppView) {
    // set up the soundcloud sdk
    SC.initialize({
        client_id: "578875cadc55ccccac217296e207d111",
        client_secret: "1e27455c2b3e6ccdd2e14c70ab33ed5c",
        redirect_uri: "http://localhost:8000/connect"
    });

    // register routes
    new Router();

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

    // set up page structure
    new WelcomeView();

    // alert any components that the app has started
    ps.trigger("visualizer:start");
});
