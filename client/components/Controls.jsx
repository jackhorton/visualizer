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

    render() {
        return (
            <div className="controls">
                <span onClick={this.play}>Play</span>
                <span onClick={this.pause}>Pause</span>
            </div>
        );
    }
});

export default Controls;
