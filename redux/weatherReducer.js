import {
  GET_LOCATION_DATA_FAILURE,
  GET_LOCATION_DATA_REQUEST,
  GET_LOCATION_DATA_SUCCESS,
  GET_WEATHER_DATA_FAILURE,
  GET_WEATHER_DATA_REQUEST,
  GET_WEATHER_DATA_SUCCESS,
} from './constants';

const initialState = {
  locationData: [],
  locationError: '',
  locationLoading: false,
  weatherData: {},
  weatherError: '',
  weatherLoading: false,
  lat: '',
  lon: '',
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_DATA_REQUEST:
      return {
        ...state,
        locationLoading: true,
      };
    case GET_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        locationLoading: false,
        locationData: action.payload,
        lat: action.payload[0].lat,
        lon: action.payload[0].lon,
        locationError: '',
      };
    case GET_LOCATION_DATA_FAILURE:
      return {
        ...state,
        locationLoading: false,
        locationData: [],
        locationError: action.payload,
      };
    case GET_WEATHER_DATA_REQUEST:
      return {
        ...state,
        weatherLoading: true,
      };
    case GET_WEATHER_DATA_SUCCESS:
      console.log('weather', action.payload);
      return {
        ...state,
        weatherLoading: false,
        weatherData: action.payload,
        weatherError: '',
      };
    case GET_WEATHER_DATA_FAILURE:
      return {
        ...state,
        weatherLoading: false,
        weatherData: [],
        weatherError: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
