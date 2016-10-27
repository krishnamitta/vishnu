import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

const requireAuthentication = (InputComponent) => {
  class AuthenticatedComponent extends Component {

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps() {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        // const redirectAfterLogin = this.props.location.pathname
        // `/?redirectTo=${redirectAfterLogin}`
        browserHistory.push('/')
      }
    }

    render() {
      return (
        this.props.isAuthenticated ? <InputComponent { ...this.props } /> : null
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
    dispatch: PropTypes.func,
    location: PropTypes.object
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.Auth.isAuthenticated
    }
  }
  return connect(mapStateToProps)(AuthenticatedComponent)
}
export default requireAuthentication
