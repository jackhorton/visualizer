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
    mixins: [reflux.listenTo(store, 'globalTrackListener')],

    getInitialState(song) {
        return {
            activeTrack: false,
            playing: 'stopped'
        };
    },

    globalTrackListener(globalTrackState) {
        if (globalTrackState.currentSong.title === this.props.song.title) {
            this.setState({
                activeTrack: true,
                playing: globalTrackState.playing
            });
        } else if (this.state.activeTrack === true) {
            this.setState({
                activeTrack: false,
                playing: 'stopped'
            });
        }
    },

    onClick(e) {
        if (!this.state.activeTrack) {
            actions.play(this.props.song);
        }
    },

    render() {
        let classes = `track${this.state.activeTrack ? ' track--active' : ''}`;
        let trackMeta = (
            <div className="track--meta">
                <h5>{this.props.song.title}</h5>
                <h6>{this.props.song.artist[0]}</h6>
                <span className="track--meta--duration">{this.props.song.duration}</span>
            </div>
        );
        let trackState = (
            <div className="track--state">
                <div className={`track--state--${this.state.playing}`}></div>
            </div>
        );

        return (
            <div className={classes} onClick={this.onClick}>
                {trackMeta}
                {trackState}
            </div>
        );
    }
})

export default Tracklist;
