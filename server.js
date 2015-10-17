'use strict';

// sad commonjs required for entry file
import express from 'express';
import fs from 'fs';
import async from 'async';
import getMetaData from 'musicmetadata';
import path from 'path';

const songPath = '/Users/jackhorton/Music/iTunes/iTunes Media/Music/SirensCeol/The Method To The Madness';
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
    return new Promise((resolve, reject) => {
        fs.readdir(songPath, (readdirErr, files) => {
            if (readdirErr) {
                reject(readdirErr);
            }

            async.map(files, loadSongData, (metadataErr, results) => {
                if (metadataErr) {
                    reject(metadataErr);
                } else {
                    resolve(results);
                }
            });
        });
    });
}

app.use('/dist', express.static('./dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/songs/:songTitle', (req, res) => {
    console.log('playing ' + req.params.songTitle);
    const songFilePath = `${songPath}/${req.params.songTitle}`;

    fs.stat(songFilePath, (err, stats) => {
        res.set({
            'Content-Type': 'audio/mpeg3',
            'Content-Length': stats.size,
            'Transfer-Encoding': 'chunked'
        });
        fs.createReadStream(songFilePath).pipe(res);
    });


});

app.get('/api/songs', (req, res) => {
    loadSongs().then((songs) => {
        res.send({songs});
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.listen(8000, () => {
    console.log('Started server');
});
