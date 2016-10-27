import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Style from '../styles'

export default class Button extends React.Component {

  handleClick(event) {
    if (this.props.onTouchTap !== undefined) {
      this.props.onTouchTap(event)
    }
  }

  render() {
    return (
      <RaisedButton
        label={ this.props.label }
        backgroundColor={ Style.buttonBackgroundColor }
        labelColor={ Style.buttonLabelColor }
        labelStyle={ Style.buttonLabelStyle }
        onTouchTap={ (event) => this.handleClick(event) }
        icon={ this.props.icon }
        labelPosition={ this.props.labelPosition }
        primary={ this.props.primary }
        />
    )
  }
}

Button.propTypes = {
  label: React.PropTypes.string,
  labelPosition: React.PropTypes.string,
  icon: React.PropTypes.object,
  onTouchTap: React.PropTypes.func,
  style: React.PropTypes.string,
  primary: React.PropTypes.bool
}

Button.defaultProps = {
  primary: false
}
