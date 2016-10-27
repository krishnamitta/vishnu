import { AUTH } from '../../../config/constants'
import { AUCTION } from '../../../config/constants'

const extractAuthData = (data) => {
  return {
    isAuthenticated: true,
    username: data.entity_name,
    entityId: data.entity_id,
    entityType: data.entity_type,
    accessToken: data.access_token,

  }
}

const extractAuctionData=(data)=>{

  return {
  auctions: data,
  }
}

const Auth = (state = {}, action) => {
  const currentState = (localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile'))) || state
  let newState
  switch (action.type) {
    case AUTH.LOGIN_SUCCESS:
      newState = Object.assign({}, currentState, extractAuthData(action.data))
      break
    case AUCTION.LIST_SUCCESS:
        newState = Object.assign({}, currentState, extractAuctionData(action.data))
        break
    case AUTH.LOGIN_FAILURE:
      newState = Object.assign({}, currentState, { isAuthenticated: false })
      break
    case AUTH.CLEAR_SESSION:
      newState = Object.assign({}, currentState, { isAuthenticated: false, username: null })
      break
    case AUTH.LOGOUT_SUCCESS:
      newState = Object.assign({}, currentState, { isAuthenticated: false, username: null })
      break
    default:
      newState = currentState
  }
  localStorage.setItem('profile', JSON.stringify(newState))
  return newState
}
export default Auth
