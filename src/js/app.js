SC.initialize({
    client_id: "578875cadc55ccccac217296e207d111",
    client_secret: "1e27455c2b3e6ccdd2e14c70ab33ed5c",
    redirect_uri: "http://localhost:8000/connect"
});

SC.connect(function() {
    SC.get('/me/favorites', function(favorites) {
        console.log(favorites);
        SC.stream(favorites[0].stream_url, function(sound) {
            sound.play();
        });
    });
});
