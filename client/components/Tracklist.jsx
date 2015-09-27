'use strict';

import React from 'react';
import reflux from 'reflux';
import request from 'reqwest';
import qs from 'querystring';

import store from '../stores/track.js';
import actions from '../actions/track.js';

const Tracklist = React.createClass({
    componentDidMount() {
        let offset = this.state.songs.length;
        let query = qs.stringify({offset});

        request({
            url: `/api/songs?${query}`,
            type: 'json',
            method: 'get'
        }).then((response) => {
            this.setState({
                songs: this.state.songs.concat(response.songs),
                error: null
            });
        }).fail((error) => {
            this.setState({error});
        });
    },

    getInitialState() {
        return {
            songs: [],
            selected: -1,
        };
    },

    render() {
        let innerContent;

        if (this.state.error) {
            innerContent = <div className="tracklist--error"><span>An error has occured</span></div>;
        } else if (this.state.songs && this.state.songs.length > 0) {
            innerContent = this.state.songs.map((song, index) => {
                return <Tracklist.Track key={index} song={song} />
            });
        } else {
            innerContent = <div className="tracklist--empty"><span>There are no tracks!</span></div>
        }

        return (
            <div className="tracklist">
                {innerContent}
            </div>
        );
    }
});

Tracklist.Track = React.createClass({
    mixins: [reflux.connect(store)],

    onClick(e) {
        if (this.state.playing === 'playing' || this.state.playing === 'paused') {
            return;
        }

        console.log('derp');

        actions.play(this.props.song);
    },

    render() {
        let trackState;
        let classes = `track ${this.state.playing ? 'track--active' : ''}`;
        let trackMeta = (
            <div className="track--meta">
                <h5>{this.props.song.title}</h5>
                <h6>{this.props.song.artist[0]}</h6>
                <span>{this.props.song.duration}</span>
            </div>
        );

        // console.log('=======================');
        // console.log(this.props);
        // console.log(this.state);

        if (this.state.playing || this.state.paused) {
            trackState = (
                <div className="track--state">
                    {this.state.playing ?
                        <div className="track--state--playing"></div> :
                        <div className="track--state--paused"></div>}
                </div>
            );
        }

        return (
            <div className={classes} onClick={this.onClick}>
                {trackMeta}
                {trackState}
            </div>
        );
    }
})

export default Tracklist;
