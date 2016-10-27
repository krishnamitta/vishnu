import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'

class ButtonComponent extends Component {



  render(){

    return (
      <div>
      <FlatButton label="Edit" primary={true} />


      </div>
    )
  }
}

export default ButtonComponent
