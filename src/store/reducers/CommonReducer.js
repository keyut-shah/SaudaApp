import {   SHOW_LOADER,  UN_AUTHORISED, CURRENT_ACTION } from '../types';

import { FETCH_FAILED } from '../types';
const INITIAL_STATE = {
    api_type: '', language: 'en', token: '',
    isLoading: false, fetchFailed: false, unauthorised: false, message: '',
    countinue: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, isLoading: action.payload, message: null }
       
        case FETCH_FAILED:
            return { ...state, isLoading: false, fetchFailed: true, unauthorised: false, message: action.payload }

        case UN_AUTHORISED:
            if (!state.unauthorised) {
                return {
                    ...state, isLoading: false, fetchFailed: false, unauthorised: true, message: null
                }
            }
            break
        case CURRENT_ACTION:
            return { ...state, api_type: action.payload, fetchFailed: false, unauthorised: false, message: null }
        default:
            return state;
    }
}