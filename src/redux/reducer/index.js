import {combineReducers} from 'redux';
import productUser from './productUser';

const myReducer=combineReducers({
	productUser:productUser,
});

export default myReducer;