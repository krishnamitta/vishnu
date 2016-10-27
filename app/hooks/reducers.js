import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import Auth from '../auth/reducers'
import Status from '../AuctionList/reducers'


const rootReducer = combineReducers({
  Auth,
  Status,

  form: formReducer.plugin({

  }),
  routing: routerReducer
})
export default rootReducer
