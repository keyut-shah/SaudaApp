import { combineReducers } from 'redux';
import PostReducer from './reducers/PostReducer';
import commonreducer from './reducers/CommonReducer';
export default combineReducers({
    PostReducer:PostReducer,
    commonreducer:commonreducer
})