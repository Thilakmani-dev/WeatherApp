import {REACT_WEATHER_API_KEY} from '../config';
import {
  GET_LOCATION_DATA_FAILURE,
  GET_LOCATION_DATA_REQUEST,
  GET_LOCATION_DATA_SUCCESS,
  GET_WEATHER_DATA_FAILURE,
  GET_WEATHER_DATA_REQUEST,
  GET_WEATHER_DATA_SUCCESS,
} from './constants';

export const getLocationDataRequest = () => {
  return {
    type: GET_LOCATION_DATA_REQUEST,
  };
};

const getLocationDataSuccess = data => {
  return {
    type: GET_LOCATION_DATA_SUCCESS,
    payload: data,
  };
};

const getLocationDataFailure = error => {
  return {
    type: GET_LOCATION_DATA_FAILURE,
    payload: error,
  };
};

export const getLocationData = city => {
  return dispatch => {
    dispatch(getLocationDataRequest);
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${REACT_WEATHER_API_KEY}`,
    )
      .then(response => response.json())
      .then(result => {
        const locationDetails = result;
        dispatch(getLocationDataSuccess(locationDetails));
      })
      .catch(error => {
        dispatch(getLocationDataFailure(error.message));
      });
  };
};

export const getWeatherDataRequest = () => {
  return {
    type: GET_WEATHER_DATA_REQUEST,
  };
};

const getWeatherDataSuccess = data => {
  return {
    type: GET_WEATHER_DATA_SUCCESS,
    payload: data,
  };
};

const getWeatherDataFailure = error => {
  return {
    type: GET_WEATHER_DATA_FAILURE,
    payload: error,
  };
};

export const getWeatherData = (lat, lon) => {
  return dispatch => {
    dispatch(getWeatherDataRequest);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${REACT_WEATHER_API_KEY}`,
    )
      .then(response => response.json())
      .then(result => {
        const weatherDetails = result;
        console.log('action', result);
        dispatch(getWeatherDataSuccess(weatherDetails));
      })
      .catch(error => {
        dispatch(getWeatherDataFailure(error.message));
      });
  };
};
