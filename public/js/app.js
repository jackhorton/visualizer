"use strict";

SC.initialize({
    client_id: "578875cadc55ccccac217296e207d111",
    redirect_uri: "http://localhost:8000/connect"
});

SC.connect(function () {
    SC.get("/me", function (me) {
        alert("Hello, " + me.username);
    });
});