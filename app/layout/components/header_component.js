import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import styles from '../../styles'
import ProfileMenu from './profile_menu'

export default class HeaderComponent extends Component {
  renderProfileMenu() {
    return (
      <ProfileMenu { ...this.props } />
    )
  }

  render() {
    const user = this.props.user
    return (
      <header>
        <AppBar style={ styles.appbar } showMenuIconButton={ false } titleStyle={ { flex: 'none' } }>
          <div className="col-10-12">
            <Link title="Copart" to={ user && user.isAuthenticated ? '/dashboard' : '/' }>
              <img src="/images/logo.png" alt="Copart" style={ styles.logo } />
            </Link>
          </div>
          <div className="col-2-12" style={ { textAlign: 'right' } }>
            { user && user.isAuthenticated ? this.renderProfileMenu() : '' }
          </div>
        </AppBar>
      </header>
    )
  }
}

HeaderComponent.propTypes = {
  user: PropTypes.object,
}
