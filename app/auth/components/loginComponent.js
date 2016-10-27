import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import styles from '../../styles'
import TextField from 'material-ui/TextField'
import LoginFields from './formFields'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginRequest } from '../actions/login_actions'
import { listRequest } from '../actions/login_actions'

const loginStyle = {
  container: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 500
  },
  subheader: { backgroundColor: '#F1F1F1', padding: '0px 10px', color: 'rgb(7, 52, 116)', fontSize: 15 }
}

class LoginComponent extends Component {

  handleSubmit(event, credentials = {}) {
    event.preventDefault()
    this.props.loginRequest(credentials)
    this.props.listRequest()

  }

  render() {
    let email
    let password
    return (
      <div className="col-1-1">
        <div style={ loginStyle.container }>
          <Paper className="col-1-2">
            <Subheader style={ loginStyle.subheader }>Login</Subheader>
            <section style={ { padding: 10 } }>
              <form onSubmit={ (event) => this.handleSubmit(event, { email: email.getValue(), password: password.getValue() }) }>
                <div>
                  <TextField ref={ (node) => email = node } { ...LoginFields.email }
                    style={ styles.root } underlineFocusStyle={ styles.underlineFocus } floatingLabelStyle={ styles.floatingLabel } />
                </div>
                <div>
                  <TextField ref={ (node) => password = node } { ...LoginFields.password }
                    style={ styles.root } underlineFocusStyle={ styles.underlineFocus } floatingLabelStyle={ styles.floatingLabel } />
                </div>
                <div style={ { textAlign: 'right', marginTop: 10 } }>
                  <RaisedButton type="submit" primary={ true } label="Login" />
                </div>
              </form>
            </section>
          </Paper>
        </div>
      </div>
    )
  }
}

LoginComponent.propTypes = {
  attrs: PropTypes.object,
  loginRequest: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginRequest,
    listRequest
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
