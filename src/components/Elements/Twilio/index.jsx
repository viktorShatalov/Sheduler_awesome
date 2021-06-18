import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';

import { connect, createLocalVideoTrack, LocalVideoTrack } from 'twilio-video';
import Draggable from 'react-draggable';

import axios from 'axios';

import classnames from 'classnames';

import st from './twilio.module.scss';

import getRole from 'helpers/getRoleByURL';
import addZero from 'helpers/addZero';

const getFormatTime = (time) => new Date(time).toLocaleTimeString('en-US',
{
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
}).toLocaleLowerCase();

class TwilioChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      identity: null,
      roomName: '',
      roomNameErr: false,
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,

      elapsedTime: 0,
      localTrack: null,
      activeRoom: null,
      videoEnabled: true,
      audioEnabled: true,

      participantConnected: false
    };

    this.user = props.user === 'lawyer' ? props.event.user : props.event.schedule.lawyer;

    this.timer = null;

    this.joinRoom = this.joinRoom.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.handlerMute = this.handlerMute.bind(this);
    this.handlerCamera = this.handlerCamera.bind(this);
  };

  localMedia = React.createRef();
  remoteMedia = React.createRef();

  componentWillMount() {
    // window.navigator.getUserMedia = ( navigator.getUserMedia ||
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia ||
    //   navigator.msGetUserMedia);
  };

  componentDidMount() {
    this.updateElapsedTime();

    const id = this.props.event.id;

    axios.get(`/${getRole(this.props.location.pathname)}/booking/${id}/video/token`)
      .then(({data}) => {
        const { room_name, token } = data.data;
        this.setState({ roomName: room_name, token });

        this.joinRoom();
      });


  };

  componentWillUnmount() {
    // this.leaveRoom();
  }

  joinRoom() {
    const connectOptions = {
      name: this.state.roomName,
      audio: true,
      // audio: false,
      video: { width: 800 }
    };

    // navigator.mediaDevices.getUserMedia({audio: false, video: true})
    //   .then((stream) => {
    //     console.log(stream.getTracks());
    //     stream.getTracks().forEach(track => track.stop());

        connect(this.state.token, connectOptions).then(this.roomJoined, error => {
          console.log('Could not connect to Twilio: ' + error.message);
        });
      // })
      // .catch((err) => console.log(err));
  };

  getTracks(participant) {
    return Array.from(participant.tracks.values()).filter(function (publication) {
       return publication.track;
    }).map(function (publication) {
       return publication.track;
    });
 };

  roomJoined(room) {
    this.getElapsedTime();
    this.props.onJoinRoom();

    this.setState(prevState => ({
      ...prevState,
      hasJoinedRoom: true,
      activeRoom: room
    }), () => {

      // const localParticipant = room.localParticipant;
      // localParticipant.tracks.forEach(track => {
      //   track.unpublish();
      // });

      const localMediaContainer = this.localMedia.current;
      const localVideoTrack = Array.from(room.localParticipant.videoTracks.values())[0].track;
      localMediaContainer.appendChild(localVideoTrack.attach());

      this.setState(prevState => ({
        ...prevState,
        localTrack: localVideoTrack
      }));

      // createLocalVideoTrack().then(track => {
      //   this.setState(prevState => ({
      //     ...prevState,
      //     localTrack: track
      //   }));

      //   const localMediaContainer = this.localMedia.current;
      //   localMediaContainer.appendChild(track.attach());
      // });


      // Участники, которые уже в комнате
      room.participants.forEach(participant => {
        this.setState({participantConnected: true});

        participant.tracks.forEach(publication => {
          const track = publication.track;
          if (track) {
            this.remoteMedia.current.appendChild(track.attach());
          }

          if (publication.isSubscribed) {
            this.handleTrackDisabled(track);
          }
        });

        participant.on('trackSubscribed', track => {
          this.remoteMedia.current.appendChild(track.attach());
        });
      });

      // Участники, которые подключились
      room.on('participantConnected', participant => {
        console.log(`Participant "${participant.identity}" connected`);
        this.setState({participantConnected: true});

        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = publication.track;
            this.remoteMedia.current.appendChild(track.attach());
            this.handleTrackDisabled(track);
          }
        });
      
        participant.on('trackSubscribed', track => {
          this.remoteMedia.current.appendChild(track.attach());
        });
      });

      // room.on('participantConnected', participant => {
      //   console.log(`A remote Participant connected: ${participant}`);
  
      //   participant.tracks.forEach(publication => {
      //     if (publication.isSubscribed) {
      //       const track = publication.track;
      //       document.getElementById('remote-media').appendChild(track.attach());
      //     }
      //   });

      //   participant.tracks.forEach(publication => {
      //     if (publication.track) {
      //       document.getElementById('remote-media-div').appendChild(publication.track.attach());
      //     }
      //   });
      
      //   participant.on('trackSubscribed', track => {
      //     console.log(this.remoteMedia.current);
      //     this.remoteMedia.current.appendChild(track.attach())
      //     // document.getElementById('remote-media').appendChild(track.attach());
      //   });
      // });

      room.on('participantDisconnected', participant => {
        this.detachParticipantTracks(participant);
        this.setState({participantConnected: false});


        this.remoteMedia.current.innerHTML = '';

        console.log(`Participant disconnected: ${participant.identity}`);
      });
    });
  }

  handleTrackDisabled(track) {
    // console.log('disabled', track);
    track.on('disabled', (e) => {
      /* Hide the associated <video> element and show an avatar image. */
    });
  };

  detachParticipantTracks(participant) {
    console.log(participant);
    // var tracks = this.getTracks(participant);
    // this.detachTracks(tracks);
  }

  detachTracks(tracks) {
    console.log(tracks);
    for (let track of tracks) {
      const htmlElements = track.detach();
      for (let htmlElement of htmlElements) {
        htmlElement.remove();
      }
    }
  }

  handlerMute() {
    const enabled = !this.state.audioEnabled;

    this.state.activeRoom.localParticipant.audioTracks.forEach(publication => {
      if (enabled) {
        publication.track.enable();
      } else {
        publication.track.disable();
      }
    });

    this.setState(prevState => ({
      ...prevState,
      audioEnabled: enabled
    }));
  };
  
  handlerCamera() {
    const enabled = !this.state.videoEnabled;

    this.state.activeRoom.localParticipant.videoTracks.forEach(publication => {
      if (enabled) {
        publication.track.enable();

        // publication.track.stop();
        // publication.unpublish();

      } else {
        publication.track.disable();
      }
    });

    this.setState(prevState => ({
      ...prevState,
      videoEnabled: enabled
    }));
  };

  leaveRoom() {
    this.state.localTrack.stop();
    clearInterval(this.timer);

    this.state.activeRoom.disconnect();

    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });

    this.props.onLeaveRoom();
  };

  updateElapsedTime() {
    const time = (new Date().getTime() - new Date(this.props.event.schedule.date_start).getTime())/1000;

    const hour = addZero(Math.floor(time/3600));
    const minute = addZero(Math.floor((time - hour*3600) / 60));

    const second = addZero(Math.floor(time - hour*3600 - minute*60));

    this.setState({elapsedTime: `${hour}:${minute}:${second}`});
  };

  getElapsedTime() {
    this.timer = setInterval(() => {
      this.updateElapsedTime();
    }, 1000);
  };

  render() {
    const { hasJoinedRoom, audioEnabled, videoEnabled, elapsedTime, participantConnected} = this.state
    const {event} = this.props;

    const start = getFormatTime(event.schedule.date_start);
    const end = getFormatTime(event.schedule.date_end);

    const title = `${event.schedule.description} ${start}-${end}`;

    return (
      <div className={classnames(st.container)}>
        {hasJoinedRoom ?
        <Fragment>
          <div className={classnames(st.video)}>
            <div className={st.remote} ref={this.remoteMedia} id="remote-media" />

            { !participantConnected &&
              <h2 className={st.video_disconected}>Participant {this.user.first_name} {this.user.last_name} disconnected</h2>
            }

            <div className={st.info}>
              <p className={st.info_time}>{elapsedTime}</p>
            </div>
          </div>

          <div className={st.controls}>
            <button
              type="button"
              className={classnames(st.mute, st.control_btn, {[st.control_disabled]: !audioEnabled})}
              onClick={this.handlerMute}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><path fill="#000" fillRule="evenodd" d="M7.875 5.375a3.125 3.125 0 116.25 0v6.25a3.125 3.125 0 11-6.25 0v-6.25zM11 16a4.375 4.375 0 004.375-4.375v-6.25a4.375 4.375 0 10-8.75 0v6.25A4.375 4.375 0 0011 16zm6.875-3.125h-1.25c-.57 2.504-2.949 4.375-5.625 4.375s-5.056-1.87-5.625-4.375h-1.25c.552 3 3.164 5.319 6.25 5.597v1.278H9.75a.625.625 0 000 1.25h2.5a.625.625 0 100-1.25h-.625v-1.278c3.086-.278 5.698-2.598 6.25-5.597z" clipRule="evenodd"/></svg>
            </button>

            <button
              type="button"
              className={classnames(st.camera, st.control_btn, {[st.control_disabled]: !videoEnabled})}
              onClick={this.handlerCamera}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22"><path fill="#1B1D1E" fillRule="evenodd" d="M4.8 5.35A1.65 1.65 0 003.15 7v8c0 .911.739 1.65 1.65 1.65h7.9A1.65 1.65 0 0014.35 15v-1.752a.65.65 0 01.94-.581l3.56 1.78v-6.98l-3.604 1.474a.65.65 0 01-.896-.602V7a1.65 1.65 0 00-1.65-1.65H4.8zM1.85 7A2.95 2.95 0 014.8 4.05h7.9A2.95 2.95 0 0115.65 7v.371l3.604-1.473a.65.65 0 01.896.602v9a.65.65 0 01-.94.581l-3.56-1.78V15a2.95 2.95 0 01-2.95 2.95H4.8A2.95 2.95 0 011.85 15V7z" clipRule="evenodd"/></svg>
            </button>

            <button
              onClick={this.leaveRoom}
              className={classnames(st.stop, st.control_btn)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" fill="none" viewBox="0 0 24 10"><path fill="#fff" fillRule="evenodd" d="M15.163 2.351a14.587 14.587 0 00-6.348 0l-.006.001a14.814 14.814 0 00-6.187 2.94.913.913 0 00-.054 1.345l.001.002 1.658 1.657.011.012a.913.913 0 001.209.101c.638-.49 1.33-.905 2.062-1.239h.001a.913.913 0 00.536-.825V4.943a.65.65 0 01.478-.626 13.152 13.152 0 016.975 0 .65.65 0 01.477.626v1.402a.913.913 0 00.536.824l.002.001c.731.334 1.423.75 2.062 1.24a.913.913 0 001.198-.093l.005-.004 1.657-1.657a.912.912 0 00-.058-1.343 14.814 14.814 0 00-6.21-2.96l-.005-.002zm.28-1.27a15.887 15.887 0 00-6.908 0 16.114 16.114 0 00-6.733 3.201l-.01.008a2.213 2.213 0 00-.14 3.27l1.65 1.65a2.213 2.213 0 002.928.236l.005-.003a9.383 9.383 0 011.813-1.09A2.213 2.213 0 009.346 6.35v-.9a11.852 11.852 0 015.33 0v.9a2.213 2.213 0 001.299 2.003l.269-.592-.27.592c.643.293 1.252.66 1.813 1.09l.005.004A2.213 2.213 0 0020.7 9.23l1.655-1.656a2.217 2.217 0 00.417-2.547 2.212 2.212 0 00-.565-.715l-.008-.007a16.114 16.114 0 00-6.756-3.223z" clipRule="evenodd"/></svg>
            </button>
          </div>

          <Draggable
            defaultClassName={st.dragBlock}
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            scale={1}
            >
              <div
                className={classnames(st.ownStream, 'handle')}
                ref={this.localMedia}
              ></div>
          </Draggable>

        </Fragment>
        :
        <div className={st.connecting}>
          <h2>Connecting...</h2>
        </div>
        }
      </div>
    );
  }
}

export default withRouter(TwilioChat);