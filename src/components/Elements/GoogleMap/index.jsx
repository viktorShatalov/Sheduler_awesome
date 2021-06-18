import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import classnames from 'classnames';

import { mapKey } from 'setts/googleKey';

import './mapstyles.scss';
import st from './map.module.scss';

import ActivePin from 'assets/img/pin_active.svg';
import DefaultPin from 'assets/img/pin_default.svg';
import SmallPin from 'assets/img/pin_small.svg';

import LazyLoadImg from 'components/UI/LazyLoadImg';
import Icon from 'components/UI/Icon';

const CustomMarker = ({ marker, isOpen, selectedLawyer, mouseOnMarker, inList,handlerOpen, ...props }) => {
  const position = {
    lat: Number(marker.lat),
    lng: Number(marker.long)
  };

  const lawyer = marker.company.lawyers[0];

  return (
    <Marker
      position={position}
      icon={
        (isOpen || selectedLawyer === lawyer.id) ? ActivePin : !inList ? SmallPin : DefaultPin}
      {...props}
    >
      {
        isOpen &&
        <InfoWindow>
          <div className={st.map_info}>
            <div className={st.map_info_avatar}>
              <LazyLoadImg
                alt={`${lawyer.first_name} ${lawyer.last_name}`}
                src={lawyer.avatar || null}
                effect="blur"
              />
            </div>
            <p className={st.map_info_name}>{lawyer.first_name} {lawyer.last_name}</p>
            <p>
              <Link
                to={`/view-profile/${lawyer.slug}`}
                className={classnames('esq-btn esq-utility', st.map_info_view)}
              >
                <Icon name="open-eye" />
                <span>View profile</span>
              </Link>
            </p>
          </div>
        </InfoWindow>
      }
    </Marker>
  );
};

const GoogleMapComponent = withScriptjs(withGoogleMap(props => {
  const [init, setInit] = useState(false);

  const [currentOpen, setOpenMarker] = useState(null);
  const [sendedBounds, setSendedBounds] = useState(null);
  const [currentBounds, setBounds] = useState(null);
  const [currentCenter, setCenter] = useState(null);

  let map = useRef(null);

  const handlerOpenMarker = (marker) => {
    setOpenMarker(marker);

    props.onOpenMarker(marker);
  };

  const handlerMapClick = () => {
    if (currentOpen) {
      props.onOpenMarker(null);
      setOpenMarker(null);
    }
  };

  const updateMap = (data = null) => {
    const res = data || currentBounds;

    setSendedBounds(res);

    handlerMapClick();

    props.onChangeBounds(res);
  };

  const boundsChanged = (e) => {
    if (!map) return;

    const _center = map.getCenter();

    if (!_center) return;

    const center = {
      lat: _center.lat(),
      lng: _center.lng(),
    };

    const bounds = map.getBounds();

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const data = {
      eastLong: ne.lng() + 0.01,
      westLong: sw.lng() - 0.01,
      northLat: ne.lat() - 0.01,
      southLat: sw.lat() + 0.01
    };

    setBounds(data);

    setCenter(center);

    if (!init) {
      // setSendedBounds(data);
      setInit(true);

      // setTimeout(() => { updateMap(data) }, 0);
      updateMap(data)
      // props.onInitLoad(data);
    }
  };

  useEffect(() => {
    Object.keys(props.center).length > 0 && setInit(false);
  }, [props.center]);

  return (
    <div>
      {
        JSON.stringify(sendedBounds) !== JSON.stringify(currentBounds) &&
        <button
          type="button"
          className={st.map_redo}
          onClick={() => updateMap(null)}
        >
          <Icon name="refresh" />Redo search here
          </button>
      }

      <GoogleMap
        ref={ref => map = ref}
        center={props.center}
        defaultZoom={11}
        defaultOptions={{
          fullscreenControl: false,
          streetViewControl: false,
          scrollwheel: false,
          mapTypeControl: false,
          clickableIcons: false,
          minZoom: 6,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_TOP
        },
        }}
        onClick={handlerMapClick}
        onBoundsChanged={boundsChanged}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={3}
          styles={[
            {
              url: DefaultPin,
              height: 34,
              width: 26,
              textColor: 'white',
              textSize: 13
            }
          ]}
        >
          {(props.markers && props.markers.length > 0) &&
            props.markers.map(marker =>
              <CustomMarker
                key={marker.id}
                marker={marker}
                inList = {props.isMobileState || (props.lawyersInList.find(item => item.id === marker.company.lawyers[0].id)) }
                selectedLawyer={props.selectedLawyer}
                isOpen={currentOpen && (currentOpen.id === marker.id)}
                onClick={() => handlerOpenMarker(marker)}
                onMouseOver={() => !currentOpen && props.mouseOnMarker(marker)}
                onMouseOut={() => !currentOpen && props.mouseOnMarker(null)}
              />
            )
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  )
}));

class Map extends Component {
  render() {
    const {
      className,
      markers = [],
      lawyersInList = [],
      onInitLoad,
      isMobileState,
      selectedLawyer,
      onChangeBounds,
      onOpenMarker,
      mouseOnMarker,
      center,
      ...props
    } = this.props;

    return (
      <div
        className={className}
        {...props}
      >
        <GoogleMapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapKey}`}
          containerElement={<div style={{ height: `100%`, width: '100%' }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={markers}
          center={center}

          isMobileState={isMobileState}
          selectedLawyer={selectedLawyer}
          lawyersInList={lawyersInList}

          onInitLoad={onInitLoad}
          onChangeBounds={onChangeBounds}
          onOpenMarker={onOpenMarker}
          mouseOnMarker={mouseOnMarker}
        />
      </div>
    );
  }
};
export default Map;