import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({weather: weatherReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk, logger));
