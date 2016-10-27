import React,{Component} from 'react'
import Tile from '../../common/tile'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'

import styles from '../../styles'

class DashboardComponent extends Component{
  render(){

  return (
    <div className="col-1-1">
      <div className="col-1-6">
        <Link to="/auctionList">
          <Tile label="Auction List" icon={ <ContentAddCircle color="#FFFFFF" style={ styles.tile.icon } /> } />
        </Link>
        </div>

        <div className="col-1-6">
        <Link to="/auctionServers">
          <Tile label="Auction Servers" icon={ <ContentAddCircle color="#FFFFFF" style={ styles.tile.icon } /> } />
        </Link>
        </div>

      <div>
        <Link to="/auctionDashboard">
          <Tile label="Auction Control Board" icon={ <ContentAddCircle color="#FFFFFF" style={ styles.tile.icon } /> } />
        </Link>
      </div>

    </div>

  )
}
}


const mapStateToProps =(state)=>{

  return {
    user:state.Auth
  }
}

export default connect(mapStateToProps)(DashboardComponent)
