import React, { Component, PropTypes } from 'react'
import StringField from './string_field'
import DecimalField from './decimal_field'
import EmailField from './email_field'
import Dropdown from './select_field'
import Autocomplete from './dropdown'
import DateField from './date_field'
import CheckboxField from './checkbox_field'

const FieldMapper = {
  string: StringField,
  dropdown: Dropdown,
  autocomplete: Autocomplete,
  number: DecimalField,
  email: EmailField,
  date: DateField,
  checkbox: CheckboxField
}

export default class InputField extends Component {
  render() {
    const { type } = this.props
    return React.createElement(FieldMapper[type], this.props)
 }
}

InputField.propTypes = {
  type: PropTypes.string
}
