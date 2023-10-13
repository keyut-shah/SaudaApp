import { Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { store } from '../../App';
/* GET Api Call */
export async function getFetch(apiUrl, actionType, ) {
    console.log("==================================")
    console.log(" URL:- " + apiUrl)
    console.log("actionType:- " + actionType)
    const state = await NetInfo.fetch();
    if (state.isConnected) {
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                
                // 'Accept-Language': Strings.getLanguage(),
                // 'AppVersion': VersionInfo.buildVersion,
                // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
            },
        }).then((response) => {
            console.log("response after the fetch is ");
            return response.json()
        }).then((responseJson) => {
            console.log("responsejson after fetch is ",responseJson);
            return responseJson;
        }).catch((error) => {
            console.error("error occur while fetchinf the data ",error);
            return { responseCode: 404, message: "Network Error! Please try again later." }
        });
        return response;
    } else {
        return { responseCode: 404, status: false, message: "Network Error! Please try again later." }
    }
}

/* Api wrapper for GET Request */
export var getApi = (apiUrl, actionType) => {
        console.log("get api method call in api calll function ")
        console.log("Api url in getapi si ", apiUrl +" action type in getapi  function is ", actionType)
    return new Promise(async (resolve, reject) => {
        const resData = await getFetch(apiUrl, actionType);
        // console.log(actionType + " GET API Response:- " + JSON.stringify(resData))
        if (resData == false) {
            reject({ code: 404, message: "Network Error! Please try again later." })
        } else if (resData.code == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}

/* POST Api Call */
export async function postFetch(apiUrl, actionType, header = {}, body = {}) {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'POST',
            mode: "no-cors",
            headers: header,
            body: JSON.stringify(body),
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error)
            return { responseCode: 404, message: "Network Error! Please try again later." }
        });
        return response;
    } else {
        return { responseCode: 404, message: "Network Error! Please try again later." }
    }
}

/* POST File Fetch Api Call */
export async function postFileFetchFetch(apiUrl, actionType, header = {}, body = {}) {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'POST',
            mode: "no-cors",
            headers: header,
            body: body,
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error)
            return { responseCode: 404, message: "Network Error! Please try again later." }
        });
        return response;
    } else {
        return { responseCode: 404, message: "Network Error! Please try again later." }
    }
}

/* Api wrapper for POST Request */
export var postApi = (apiUrl, actionType, header, body = {}) => {

    console.log("==================================")
    console.log(" URL:- " + apiUrl)
    console.log("actionType:- " + actionType)
    // console.log("header:- ", header)
    console.log("body:- " + JSON.stringify(body))
    var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': "Bearer " + header,
        // 'Accept-Language': Strings.getLanguage(),
        // 'AppVersion': VersionInfo.buildVersion,
        // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
    }
    return new Promise(async (resolve, reject) => {
        const resData = await postFetch(apiUrl, actionType, headers, body);
        console.log(actionType + " POST Response:- " + JSON.stringify(resData))
        if (resData == false) {
            reject({ code: 404, message: "Network Error! Please try again later." })
        } else if (resData.code == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}

export var postFileApi = (apiUrl, actionType, header, body = {}) => {

    console.log("==================================")
    console.log(" URL:- " + apiUrl)
    console.log("actionType:- " + actionType)
    console.log("header:- ", header)
    console.log("body:- " + JSON.stringify(body))

    var headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'authorization': "Bearer " + header,
        // 'Accept-Language': Strings.getLanguage(),
        // 'AppVersion': VersionInfo.buildVersion,
        // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
    }

    return new Promise(async (resolve, reject) => {
        const resData = await postFileFetchFetch(apiUrl, actionType, headers, body);
        console.log(resData, 'inside  postFileApi')
        console.log("POST Response:- " + JSON.stringify(resData))
        if (resData == false) {
            reject({ code: 404, message: "Network Error! Please try again later." })
        } else if (resData.code == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}

/* Api wrapper for DELETE Request */
export var deleteApi = (apiUrl, actionType, header) => {

    console.log("==================================")
    console.log(" URL:- " + apiUrl)
    console.log("actionType:- " + actionType)
    // console.log("header:- ", header)
    // console.log("body:- " + JSON.stringify(body))
    var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': "Bearer " + header,
        // 'Accept-Language': Strings.getLanguage(),
        // 'AppVersion': VersionInfo.buildVersion,
        // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
    }
    return new Promise(async (resolve, reject) => {
        const resData = await deleteFetch(apiUrl, actionType, headers);
        console.log("DELETE Response:- " + JSON.stringify(resData))
        if (resData == false) {
            reject({ code: 404, message: "Network Error! Please try again later." })
        } else if (resData.code == 401) {
            reject(resData)
        } else {
            resolve(resData)
        }
    });
}

/* DELETE Api Call */
export async function deleteFetch(apiUrl, actionType, header = {}) {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
        store.dispatch({ type: actionType });
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            mode: "no-cors",
            headers: header,
            // body: JSON.stringify(body),
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error)
            return { responseCode: 404, message: "Network Error! Please try again later." }
        });
        return response;
    } else {
        return { responseCode: 404, message: "Network Error! Please try again later." }
    }
}

