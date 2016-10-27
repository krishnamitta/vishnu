import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Style from '../styles'

class StringField extends Component {
  handleFieldChange(event) {
    this.props.input.onBlur(event)
    if (this.props.hasOwnProperty('handleChange')) {
      this.props.handleChange(event)
    }
  }

  render() {
    const { input, floatingLabel, meta: { touched, error }, ...custom } = this.props
    return (
      <TextField hintText={ floatingLabel }
        { ...input }
        onBlur={ (event) => this.handleFieldChange(event) }
        floatingLabelText={ floatingLabel }
        className={ custom.className }
        disabled={ custom.disabled }
        errorText={ touched && error }
        underlineShow={ custom.underlineShow }
        style={ Style.root }
        floatingLabelStyle={ Style.floatingLabel }
        underlineFocusStyle={ Style.underlineFocus }
        multiLine={ custom.multiLine }
        floatingLabelFixed
        { ...custom } />
    )
  }
}

StringField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
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
  field_type: PropTypes.string,
  onChange: PropTypes.func,
  handleChange: PropTypes.func,
  references: PropTypes.func
}

StringField.defaultProps = {
  fullWidth: true,
  disabled: false,
  multiLine: false,
  underlineShow: true
}

export default StringField
