import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Style from '../styles'

export default class EmailField extends Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.data || '' }
  }

  handleChange(event) {
		this.setState({ value: event.target.value })
	}

  render() {
    return (
      <TextField
        name={ this.props.name }
        onChange={ (event) => this.handleChange(event) }
        className={ this.props.className }
        value={ this.state.value }
        disabled={ this.props.disabled }
        hintText={ this.props.hintText }
        floatingLabelText={ this.props.floatingLabel }
        underlineShow={ this.props.underlineShow }
        errorText={ this.props.errorText }
        style={ Style.root }
        ref={ this.props.references }
        floatingLabelStyle={ Style.floatingLabel }
        underlineFocusStyle={ Style.underlineFocus }
      />
    )
  }
}

EmailField.propTypes = {
  className: PropTypes.string,
  hintText: PropTypes.string,
  floatingLabel: PropTypes.string,
  errorText: PropTypes.string,
  data: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  multiLine: PropTypes.bool,
  underlineShow: PropTypes.bool,
  references: PropTypes.func
}

EmailField.defaultProps = {
  fullWidth: true,
  disabled: false,
  underlineShow: true
}
