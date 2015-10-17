'use strict';

import reflux from 'reflux';

import actions from '../actions/track';

const state = {};

export default reflux.createStore({
    listenables: actions,

    getInitialState() {
        return state;
    },

    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioElement = document.createElement('audio');
        this.audioElement.preload = 'auto';
        document.body.appendChild(this.audioElement);
        this.nodes = {
            source: this.audioContext.createMediaElementSource(this.audioElement),
            destination: this.audioContext.destination,
            effects: []
        };
        this.currentSong = null;
        this.bufferInterval = -1;

        this.nodes.source.connect(this.nodes.destination);

        state.audioContext = this.audioContext;
        state.playing = 'stopped';
        state.currentSong = {};
        state.time = 0;
        state.buffered = 0.0;

        this.trigger(state);
    },

    onPlay(song) {
        if (song) {
            this.currentSong = song;
            this.audioElement.src = song.url;

            // infinite timers are bad timers
            clearInterval(this.bufferInterval);
        }

        this.audioElement.volume = 0.5;
        document.getElementsByTagName('audio')[0].play();
        state.playing = 'playing';

        // when we begin playing a song, keep updating the amount buffered every 500ms
        this.bufferInterval = setInterval(() => {
            let buffer = this.audioElement.buffered;

            // there should only be one TimeRange? check anyways
            if (buffer.length === 1) {
                let end = this.audioElement.buffered.end(0);
                let duration = this.audioElement.duration;

                state.buffered = end / duration;
                this.trigger(state);

                // stop this madness once we have buffered the entire song
                if (end === duration) {
                    clearInterval(this.bufferInterval);
                }
            } else {
                clearInterval(this.bufferInterval);
            }
        }, 500);

        this.trigger(state);
    },

    onPause() {
        this.audioElement.pause()
        state.playing = 'paused';

        clearInterval(this.bufferInterval);

        this.trigger(state);
    },

    onAddAudioNode(node) {
        if (this.nodes.effects.length > 0) {
            this.nodes.effects[this.nodes.effects.length - 1].disconnect();
            this.nodes.effects[this.nodes.effects.length - 1].connect(node);
        } else {
            this.nodes.source.disconnect();
            this.nodes.source.connect(node);
        }

        node.connect(this.nodes.destination);
        this.nodes.effects.push(node);
    },
});
