import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH } from '../../../config/constants'
import {AUCTION} from '../../../config/constants'

export const logout = () => {
  return (dispatch) => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    dispatch({ type: AUTH.LOGOUT_SUCCESS })
    browserHistory.push('/')
  }
}

export const loginRequest = (credentials) => {
  return ((dispatch) => {
axios.all([

      axios.post('/login', credentials, { withCredentials: true})
    ])
    .then(axios.spread ( function( userresponse) {
      if (userresponse.status == 200) {

        dispatch({ type: AUTH.LOGIN_SUCCESS, data: userresponse.data })
        //dispatch ({type:AUCTION.LIST_SUCCESS,data: dataresponse.data})
        browserHistory.push('/dashboard')
      } else {
        dispatch({ type: AUTH.LOGIN_FAILURE, data: userresponse })
      }
    })).catch((error) => {
      console.log('login error..', error)
      dispatch({ type: AUTH.LOGIN_FAILURE, data: error })
    })
  })
}

export const listRequest = ({dispatch}) => {
    console.log('after refresh')
axios.get('http://localhost:1234/verifyAll')
    .then((response) => {
      console.log(response.data)
      if (response.status == 200) {

      dispatch ({type:AUCTION.LIST_SUCCESS,data: response.data})

      } else {
        dispatch({ type: AUTH.LOGIN_FAILURE, data: response })
      }
    }).catch((error) => {
      console.log('login error..', error)
      dispatch({ type: AUTH.LOGIN_FAILURE, data: error })
    })
}
