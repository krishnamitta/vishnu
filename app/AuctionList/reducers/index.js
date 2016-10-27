import {LOT} from '../../../config/constants'


const extractStatus=(data)=>{

  return {
  isVerified: true ,
  status: data.status,
  yardId:data.id,
  }
}

const Status = (state={}, action) =>{

  const currentState = (localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile'))) || state
  let newState
  switch(action.type){
    case LOT.CHECK_SUCCESS:
     newState = Object.assign({}, currentState, extractStatus(action.data))
     break
    case LOT.CHECK_FAILURE:
     newState = Object.assign({}, currentState, {isVerified: false})
     break
    default:
      newState = currentState
      break
  }
  localStorage.setItem('profile', JSON.stringify(newState))
  return newState
}

export default Status
