'use strict';

import React from 'react';
import reflux from 'reflux';

import store from '../stores/track';
import actions from '../actions/track';

const Visualizer = React.createClass({
    mixins: [reflux.connect(store)],

    render() {
        return (
            <div className="visualizer">
                <Visualizer.Canvas />
                <Visualizer.Meta song={this.state.currentSong} />
            </div>
        );
    }
});

Visualizer.Canvas = React.createClass({
    mixins: [reflux.listenTo(store, 'updateState')],

    componentDidMount() {
        this.canvasElement = document.getElementById('visualizer--canvas');
        this.canvasElement.width = 300;
        this.canvasElement.height = 150;
        this.canvasContext = this.canvasElement.getContext('2d');
    },

    updateState(state) {
        if (state.audioContext !== this.audioContext) {
            this.audioContext = state.audioContext;
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.freqArray = new Uint8Array(this.analyser.frequencyBinCount);

            actions.addAudioNode(this.analyser);
        }

        if (state.playing === 'playing') {
            this.playing = true;
            this.visualize();
        } else if (state.playing !== 'playing') {
            this.playing = false;
        }
    },

    visualize() {
        // if (this.playing) {
        //     window.requestAnimationFrame(this.visualize);
        // }

        console.log('visualizing');

        // less typing
        let canvas = this.canvasContext;
        let width = this.canvasElement.width;
        let height = this.canvasElement.height;
        let barWidth = width / this.analyser.frequencyBinCount;
        let barHeight = 0;
        let x;

        // clear out the canvas
        canvas.clearRect(0, 0, width, height);
        canvas.fillStyle = 'rgb(0, 0, 0)';
        canvas.fillRect(0, 0, width, height);

        this.analyser.getByteFrequencyData(this.freqArray);
        canvas.fillStyle = 'rgb(200, 0, 0)';

        for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
            barHeight = this.freqArray[i];
            canvas.fillRect(x, height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    },

    render() {
        return (
            <div id="visualizer--canvas--wrapper">
                <canvas id="visualizer--canvas">
                    Sorry, your browser doesn't support canvas :(
                </canvas>
            </div>
        );
    }
});

Visualizer.Meta = React.createClass({
    render() {
        return (
            <div className="visualizer--meta">
                <div className="visualizer--meta--image">
                    <img src={this.props.song.image} />
                </div>
                <div className="visualizer--meta--song-info">
                    <h1>{this.props.song.title}</h1>
                    <h2>{this.props.song.artist}</h2>
                </div>
            </div>
        );
    }
});

export default Visualizer;
