
import { SHOW_LOADER,  FETCH_POST_DATA ,  } from "../types";
import { getApi } from "../../services/Api_callfunction";
import { GET_POST , } from "../../services/api_config";
import { fetchSuccess, fetchFail } from "../actions/commonaction";
import { Platform } from 'react-native';
export const PostAction = (header={}, id) => {
    console.log("can we come to post action part")
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true })
        Promise.all([getApi(GET_POST, FETCH_POST_DATA)])
            .then(function (values) {
                dispatch({ type: SHOW_LOADER, payload: false })
                /* Handle Response of all Apis */
                setTimeout(() =>
                    fetchSuccess(FETCH_POST_DATA, dispatch, values[0]),
                    Platform.OS == "android" ? 0 : 1000)
            }).catch(err => {
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err)
            })
    }
}
