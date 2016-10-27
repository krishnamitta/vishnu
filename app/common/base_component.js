import React from 'react'

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value || '' }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || ''
    })
  }

  handleChange(event) {
		this.setState({ value: event.target.value })
	}

}

BaseComponent.propTypes = {
  value: React.PropTypes.string
}
