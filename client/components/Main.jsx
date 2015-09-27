'use strict';

import React from 'react';

import Tracklist from './tracklist';
import Visualizer from './visualizer';
import Controls from './controls';

const Main = React.createClass({
    render() {
        return (
            <main>
                <Tracklist />
                <Visualizer />
                <Controls />
            </main>
        );
    }
});

export default Main;
