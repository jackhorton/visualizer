'use strict';

import react from 'react';
import reflux from 'reflux';

import actions from '../actions/track';

const Controls = react.createClass({
    render() {
        return (
            <div class="controls">
                <span onClick={actions.play}>Play</span>
                <span onClick={actions.pause}>Pause</span>
            </div>
        );
    }
});

export default Controls;
