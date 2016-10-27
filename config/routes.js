import React from 'react'
import store from '../app/store'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Layout from '../app/layout/components'
import LoginComponent from '../app/auth/components/loginComponent'
import requireAuthentication from '../app/auth/decorators/authenticate_component'
import DashboardComponent from '../app/dashboard/components'
import AuctionList from '../app/AuctionList/components'
import AuctionServer from '../app/AuctionServers/components'
import AuctionDashboard from '../app/AuctionControl/components'
import {listRequest} from '../app/auth/actions/login_actions'


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const routes = (
  <Router history={ history }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ LoginComponent } />
      <Route path="dashboard" component={ requireAuthentication(DashboardComponent) } />
      <Route path="auctionList" component={ requireAuthentication(AuctionList) } onEnter = {() => listRequest(store)}/>
      <Route path="auctionServers" component={ requireAuthentication(AuctionServer) } />
      <Route path="auctionDashboard" component={ requireAuthentication(AuctionDashboard) } />

    </Route>
  </Router>
)

module.exports = routes
