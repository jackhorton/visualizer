'use strict';

import react from 'react';

import Tracklist from './tracklist';
import Visualizer from './visualizer';
import Controls from './controls';

const Main = react.createClass({
    render() {
        return (
            <div class="merr">
                <Tracklist />
                <Visualizer />
                <Controls />
            </div>
        );
    }
});

export default Main;
