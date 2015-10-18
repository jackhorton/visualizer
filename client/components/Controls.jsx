'use strict';

import React from 'react';
import reflux from 'reflux';

import actions from '../actions/track';

const Controls = React.createClass({
    play() {
        actions.play();
    },

    pause() {
        actions.pause();
    },

    toggleView() {
        const main = document.getElementsByTagName('main')[0];
        const appState = main.getAttribute('data-app-state');
        if (appState === 'visualizer') {
            main.setAttribute('data-app-state', 'tracklist');
        } else {
            main.setAttribute('data-app-state', 'visualizer');
        }
    },

    render() {
        return (
            <div className="controls">
                <span onClick={this.play}>Play</span>
                <span onClick={this.pause}>Pause</span>
                <span onClick={this.toggleView}>Toggle View</span>
            </div>
        );
    }
});

export default Controls;
