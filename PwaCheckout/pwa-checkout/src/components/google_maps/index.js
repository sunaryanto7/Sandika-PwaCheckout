import {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const {
  StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const GoogleMaps = compose(
  withProps((props) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.gmap_key}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: props.containerElement || <div style={{ height: '210px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    isMarkerShown: true,
  })),
  withHandlers({
    handleDragEnd: ({ dragMarkerDone }) => (event) => {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      dragMarkerDone(newPosition);
    },
  }),
  withStateHandlers((props) => {
    const {
      infoBoxDefaultOpen, markers,
    } = props;
    const isOpen = {};

    if (infoBoxDefaultOpen && markers.length > 0) {
      markers.forEach((_, index) => {
        isOpen[index] = true;
      });
    }

    return { isOpen };
  }, {
    onToggleOpen: ({ isOpen }) => (id) => ({
      isOpen: {
        ...isOpen,
        [id]: typeof isOpen[id] === 'undefined' ? true : !isOpen[id],
      },
    }),
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const { location } = refs.searchBox.getPlaces()[0].geometry;
          this.props.dragMarkerDone({
            lat: location.lat(),
            lng: location.lng(),
          });
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  const {
    searchBox = true,
    markers = [],
    defaultZoom = 17,
    defaultOptions,
    center,
    infoBoxStyle,
  } = props;
  const setZeroIfEmpty = (value) => {
    const emptyValues = [undefined, null, '', 'undefined', 'null'];
    return emptyValues.includes(value) ? 0 : Number(value);
  };
  const mapPosition = {
    lat: setZeroIfEmpty(props.mapPosition && props.mapPosition.lat),
    lng: setZeroIfEmpty(props.mapPosition && props.mapPosition.lng),
  };

  return (
    <>
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={mapPosition}
        defaultOptions={{ ...defaultOptions }}
        center={center || mapPosition}
      >
        {props.isMarkerShown
          && (markers && markers.length > 0)
          ? markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
              onClick={() => props.onToggleOpen(index)}
              icon={marker.image ? `${props.secureUrl}${marker.image}` : ''}
            >
              {props.isOpen[index] && (
                <InfoWindow onCloseClick={props.onToggleOpen}>
                  <div style={{ ...infoBoxStyle }}>
                    {marker.info}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))
          : (
            <Marker
              draggable
              onDragEnd={(event) => props.handleDragEnd(event)}
              position={mapPosition}
            />
          )}
      </GoogleMap>
      {searchBox && (
        <div data-standalone-searchbox="">
          <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Cari Lokasi"
              className="form-control"
            />
          </StandaloneSearchBox>
        </div>
      )}
    </>
  );
});

export default GoogleMaps;