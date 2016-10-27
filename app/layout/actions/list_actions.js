import axios from 'axios'
import { AUTH } from '../../../config/constants'
import {AUCTION} from '../../../config/constants'

export const listRequest = () => {
  return ((dispatch) => {
axios.get('http://localhost:1234/auctions')
    .then((response) => {
      if (response.status == 200) {
        console.log(response.data)
      dispatch ({type:AUCTION.LIST_SUCCESS,data: dataresponse.data})

      } else {
        dispatch({ type: AUTH.LOGIN_FAILURE, data: userresponse })
      }
    })).catch((error) => {
      console.log('login error..', error)
      dispatch({ type: AUTH.LOGIN_FAILURE, data: error })
    })
  })
}
