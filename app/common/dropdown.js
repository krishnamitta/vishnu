import React, { Component, PropTypes } from 'react'
import Style from '../styles'
import AutoComplete from './core/AutoComplete'

export default class Dropdown extends Component {
  render() {
    return (
      <AutoComplete
        name={ this.props.name }
        value={ this.props.data }
        ref="autoComplete"
        dataSource={ this.props.dataSource }
        floatingLabelText={ this.props.floatingLabel }
        style={ Style.root }
        inputStyle={ Style.inputStyle }
        floatingLabelStyle={ Style.floatingLabel }
        underlineFocusStyle={ Style.underlineFocus }
        fieldType={ this.props.fieldType }
        disabled={ this.props.disabled }
        underlineShow={ this.props.underlineShow }
        title=""
        fullWidth
        openOnFocus
      />
    )
  }
}

Dropdown.propTypes = {
  name: PropTypes.string,
  data: PropTypes.string,
  dataSource: PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  floatingLabel: PropTypes.string,
  fieldType: PropTypes.string,
  disabled: PropTypes.bool,
  underlineShow: PropTypes.bool
}

Dropdown.defaultProps = {
  disabled: false,
  underlineShow: true
}
