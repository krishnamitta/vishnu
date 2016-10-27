import config from 'config' // eslint-disable-line

import axios from 'axios'
import objectToQueryString from './object_to_query_string'

export const buildURI = (resourceURI, queryParameters = {}) => {
  let URI = config.services.endpoint + resourceURI
  if (Object.keys(queryParameters).length > 0) {
    URI += `&${objectToQueryString(queryParameters)}`
  }
  return URI
}

export const dispatchAction = (url, actionType) => {
  return (dispatch) => {
    axios.get(url).then((response) => {
      const data = response.data.d.results ? response.data.d.results : response.data.d
      dispatch({ type: actionType, data })
    }).catch((error) => {
      dispatch({ type: actionType, data: [] })
    })
  }
}
