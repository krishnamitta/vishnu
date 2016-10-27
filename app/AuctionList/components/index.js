import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Griddle from 'griddle-react'
import { bindActionCreators } from 'redux'
import { lotCheck } from '../actions/list_actions'
import data from './Metadata'




class AuctionList extends Component {

    rowClick(row){
      let lotsAssigned = row.props.data["lotsAssigned"]
      let yardNumber = row.props.data["yardNumber"]


    let info =  {lotsAssigned: row.props.data["lotsAssigned"] , yardNumber: row.props.data["yardNumber"]}
console.log(info);
      this.props.lotCheck(info)
    }


  render() {
    return (
      <div>
      <h1 style={{textAlign:'center'}}>Auction List </h1>
      <Griddle results={this.props.data.auctions} showFilter={true} showSettings={true} columnMetadata={data}
      onRowClick={(row) => this.rowClick(row)} />


      </div>
    );
  }
}
AuctionList.propTypes = {
  lotCheck: PropTypes.func,
}
const mapStateToProps = (state) => {
  return {
    data: state.Auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    lotCheck,
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AuctionList)
