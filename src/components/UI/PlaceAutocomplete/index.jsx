import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import useOnclickOutside from "react-cool-onclickoutside";

const PlaceAutocomplete = (props) => {
  console.log(props);

  return null;
};

export default withScriptjs(withGoogleMap(PlaceAutocomplete));