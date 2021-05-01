import { combineReducers } from 'redux';
import alertsStore from './alertsReducer';
import matchesStore from './matchesReducer';
import user from './userReducer';

export default combineReducers({ alertsStore, matchesStore, user });
