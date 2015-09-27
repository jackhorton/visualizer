'use strict';

// allow full es6/es7 support elsewhere
require('babel/register');

// sad commonjs required for entry file
const express = require('express');
const fs = require('fs');
const q = require('q');
const async = require('async');
const getMetaData = require('musicmetadata');

const songPath = '/Users/jackhorton/Music/iTunes/iTunes Media/Music/SAVOY/Self Predator';
const app = express();

function loadSongData(file, callback) {
    let song;
    getMetaData(fs.createReadStream(`${songPath}/${file}`), {duration: true}, (err, metadata) => {
        if (err) {
            return callback (err);
        }

        song = metadata;
        song.url = `/songs/${file}`;

        // dont send back raw data in this response
        song.data = null;
        song.picture = null;

        return callback(err, song);
    });
}

function loadSongs() {
    let deferred = q.defer();

    fs.readdir(songPath, (readdirErr, files) => {
        if (readdirErr) {
            deferred.reject(readdirErr);
        }

        async.map(files, loadSongData, (metadataErr, results) => {
            if (metadataErr) {
                deferred.reject(metadataErr);
            } else {
                deferred.resolve(results);
            }
        });
    });

    return deferred.promise;
}

app.use('/dist', express.static('./dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/songs/:songTitle', (req, res) => {
    console.log('playing ' + req.params.songTitle);
    res.set({'Content-Type': 'audio/mpeg3'});
    fs.createReadStream(`${songPath}/${req.params.songTitle}`).pipe(res);
});

app.get('/api/songs', (req, res) => {
    loadSongs().then((songs) => {
        res.send({songs});
    }).fail((err) => {
        res.status(500).send(err);
    });
});

app.listen(8000, () => {
    console.log('Started server');
});
