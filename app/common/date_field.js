import React, { Component, PropTypes } from 'react'
import DatePicker from 'material-ui/DatePicker'
import Style from '../styles'

export default class DateField extends Component {

  formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  render() {
    const { input, floatingLabel, meta: { touched, error }, ...custom } = this.props
    return (
      <DatePicker
        minDate={ custom.minDate }
        maxDate={ custom.maxDate }
        floatingLabelText={ floatingLabel }
        formatDate={ this.formatDate }
        container="inline"
        hintText={ floatingLabel }
        errorText={ touched && error }
        floatingLabelStyle={ Style.floatingLabel }
        floatingLabelFixed
        onBlur={ (event, date) => input.onBlur(event, date) }
        onChange={ (event, date) => input.onChange(date) }
        autoOk
      />
    )
  }
}

DateField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  floatingLabel: PropTypes.string,
  hintText: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string
}
