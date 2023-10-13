import { FETCH_SUCCESS, FETCH_ERROR,FETCH_POST_DATA  } from "../types";

export const INITIAL_STATE = {
    message: '',
    resData: null,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        
        case FETCH_POST_DATA:
            return { ...state, message: null, resData: null }
        case FETCH_POST_DATA + FETCH_SUCCESS:
            return { ...state, message: null, resData: JSON.stringify(action.payload) }
        case FETCH_POST_DATA + FETCH_ERROR:
            return { ...state, message: action.payload, resData: null }

        default:
            return state

    }
}
