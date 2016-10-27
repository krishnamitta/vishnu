import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Style from '../styles'

export default class DecimalField extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '' }
  }

  validate(e) {
    const value = e.target.value
    if (!value || /^\d{0,2}(\.\d{1,2})?$/.test(value)) {
      this.setState({ errorText: '', value })
    } else {
      this.setState({ errorText: 'Invalid value', value })
    }
  }

  render() {
    const { input, meta: { touched, error }, ...custom } = this.props
    return (
      <TextField
        style={ Style.root }
        disabled={ custom.disabled }
        floatingLabelText={ custom.floatingLabel }
        floatingLabelStyle={ Style.floatingLabel }
        name={ custom.name }
        underlineShow={ custom.underlineShow }
        underlineFocusStyle={ Style.underlineFocus }
        required={ custom.required }
        onChange={ (event) => { this.validate(event) } }
        errorText={ touched && error }
        floatingLabelFixed={ custom.disabled }
        { ...input }
        />
      )
  }
}

DecimalField.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  style: PropTypes.object,
  underlineShow: PropTypes.bool,
  floatingLabel: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object
}

DecimalField.defaultProps = {
  underlineShow: true
}
