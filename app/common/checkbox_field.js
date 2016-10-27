import React, { Component, PropTypes } from 'react'
import Checkbox from 'material-ui/Checkbox';

class CheckboxField extends Component {
  handleOnItemCheck(event) {
    this.props.input.onChange(event)
    if (this.props.hasOwnProperty('handleOnCheck')) {
      this.props.handleOnCheck(event)
    }
  }
  render() {
    const { input, label, ...custom } = this.props
    return (
      <Checkbox
      { ...input }
      label={ label }
      labelPosition={ this.props.labelPosition }
      style={ this.props.style }
      disabled={ this.props.disabled }
      checked={ input.value ? true : false }
      labelStyle={ this.props.labelStyle }
      onCheck={ (event) => this.handleOnItemCheck(event) }
      { ...custom }
    />
    )
  }
}
CheckboxField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  labelStyle: PropTypes.object,
  handleOnCheck: PropTypes.func
}
export default CheckboxField
