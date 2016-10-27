import React from 'react'
import store from './store'
import routes from '../config/routes'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

// for material ui
injectTapEventPlugin()

render(
  // Makes the Redux store available to the connect() calls in the component hierarchy
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('main')
)
