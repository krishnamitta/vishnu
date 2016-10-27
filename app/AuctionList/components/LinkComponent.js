/*eslint-disable*/
import React,{Component} from 'react'
import {connect} from 'react-redux'
import Error from 'material-ui/svg-icons/alert/error'
import Done from 'material-ui/svg-icons/action/done'
import {red500, green500} from 'material-ui/styles/colors';

class LinkComponent extends Component {


  render(){



    return (
      <div>
       {this.props.data=="Fine" ? <Done color={green500} style= {{size:"70px"}} /> : <Error color={red500} /> }
      </div>
    )

}
}





export default LinkComponent
