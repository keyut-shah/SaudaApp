
import { SHOW_LOADER, FETCH_SUCCESS, FETCH_FAILED, FETCH_ERROR, CURRENT_ACTION, UN_AUTHORISED,  } from "../types";

export const updateLoader = (loader) => {
    return async (dispatch) => {
        dispatch({
            type: SHOW_LOADER,
            payload: loader
        });
    }
}


export const changeLanguageActions = (language) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: language
        });
    }
}

export const updateUserRole = (role) => {
    return async (dispatch) => {
        dispatch({
            type: CURRENT_USER_ROLE,
            payload: role
        });
    }
}


export const updateUnAuth = () => {
    return async (dispatch) => {
        dispatch({
            type: UN_AUTHORISED,
            payload: '',
            flag: true
        });
    }
}

export const fetchFail = (dispatch, err) => {

    if (err.code === 401) {
        dispatch({
            type: UN_AUTHORISED,
            payload: err.message
        });
    } else {
        dispatch({
            type: FETCH_FAILED,
            payload: err.message
        });
    }
}
export const fetchSuccess = (ACTION, dispatch, res) => {
    console.log("res calue in the fetchsucess method is ",res)
    dispatch({
        type: CURRENT_ACTION,
        payload: ACTION,
    });
    if (res != null && res.code === 200 && res.status) {
        dispatch({
            type: ACTION + FETCH_SUCCESS,
            payload: res,
        });
        dispatch({
            type: ACTION,
            payload: null,
        });
    }
    else {
        dispatch({
            type: ACTION + FETCH_ERROR,
            payload: res.message,
        });
        dispatch({
            type: ACTION,
            payload: null,
        });

    }
};

// export const HandleResponse = (apiName, dispatch,res) => {
//     dispatch({
//         type: CURRENT_API,
//         payload: apiName
//     })
//     if (res != null && res.code === 200 && res.status) {
//         dispatch({
//             type: apiName + FETCH_SUCCESS,
//             payload: res
//         });
//     } else {
//         if (res.code === 401) {
//             dispatch({
//                 type: UN_AUTHORISED,
//                 payload: res.message
//             });
//         } else if (res.code === 400) {
//             dispatch({
//                 type: FETCH_FAILED,
//                 payload: res && res.message ? res.message : ""
//             });
//         }
//         else if (res) {
//             dispatch({
//                 type: apiName + FETCH_ERROR,
//                 payload: res && res.message ? res.message : Strings.Internet_Error
//             });
//             dispatch({
//                 type: apiName,
//                 payload: null
//             })

//         } else {
//             dispatch({
//                 type: FETCH_FAILED,
//                 payload: res && res.message ? res.message : Strings.Server_Error
//             });

//             dispatch({
//                 type: FETCH_FAILED,
//                 payload: null
//             });
//         }
//     }
// };