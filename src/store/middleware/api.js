import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const { url, method, data, onStart, onSuccess, onError, headers } =
      action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action);

    // Return the promise so that you can chain .then() and .catch() after dispatching

    return axios
      .request({
        baseURL: process.env.REACT_APP_API_URL,
        url,
        method,
        data,
        headers,
      })
      .then((response) => {
        // Dispatch the success action if onSuccess is defined
        if (onSuccess) {
          dispatch({ type: onSuccess, payload: response.data });
        }
        // Otherwise, just notify that the API call was successful
        dispatch(actions.apiCallSuccess(response.data));
        return response; // Resolve the promise with the response object
      })
      .catch((error) => {
        // Dispatch the error action if onError is defined
        if (onError) {
          dispatch({
            type: onError,
            payload: error.message ? error.message : error,
          });
        }
        // Otherwise, just notify that the API call failed
        dispatch(actions.apiCallFailed(error.message ? error.message : error));
        return Promise.reject(error); // Reject the promise with the error object
      });
  };

export default api;
