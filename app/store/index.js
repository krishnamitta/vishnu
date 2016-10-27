import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../hooks/reducers'

const store = createStore(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : undefined,
  applyMiddleware(thunk)
)
export default store
