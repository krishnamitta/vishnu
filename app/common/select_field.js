import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Style from '../styles'

export default class SDropdown extends Component {
  renderMenuItem(item, index) {
    const result = this.props.customDisplay ? `${item[this.props.valueField]} - ${item[this.props.label]}` : item[this.props.label]
    return (
      <MenuItem key={ index } value={ item[this.props.valueField] } primaryText={ result } />
    )
  }

  handleChange(event, i, value) {
    this.props.input.onChange(value)
    if (this.props.hasOwnProperty('onChange')) {
      this.props.onChange(event, i, value)
    }
  }

  render() {
    const { input, meta: { touched, error } } = this.props
    return (
      <div>
        <SelectField
          { ...input }
          onChange={ (event, i, value) => this.handleChange(event, i, value) }
          style={ Style.root }
          errorText={ touched && error }
          floatingLabelStyle={ Style.floatingLabel }
          underlineFocusStyle={ Style.underlineFocus }
          floatingLabelText={ this.props.floatingLabel }
          floatingLabelFixed
          hintText={ this.props.floatingLabel }>
          { (this.props.dataSource && this.props.valueField && this.props.label) ? this.props.dataSource.map((item, index) => this.renderMenuItem(item, index)) : null }
        </SelectField>
      </div>
    )
  }
}

SDropdown.propTypes = {
  data: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  name: PropTypes.string,
  valueField: PropTypes.string,
  label: PropTypes.string,
  dataSource: PropTypes.array,
  floatingLabel: PropTypes.string,
  onChange: PropTypes.func,
  hintText: PropTypes.string,
  customDisplay: PropTypes.bool
}

SDropdown.defaultProps = {
  label: 'description',
  valueField: 'code'
}
