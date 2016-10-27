import React, { PropTypes } from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import styles from '../../styles.js'
import Avatar from 'material-ui/Avatar'

const fetchShortName = (username) => {
  return (username.charAt(0) + username.match(/\S+/g)[1].charAt(0))
}

const ProfileMenu = (props) => {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton style={ { top: '-4px' } }>
          <Avatar backgroundColor="#FFF" size={ 40 } color="rgb(7, 52, 116)">
            { fetchShortName(props.user.username) }
          </Avatar>
        </IconButton> }
      anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
      targetOrigin={ { horizontal: 'right', vertical: 'top' } }
      style={ styles.employeeProfile }>
      <MenuItem disabled>{ props.user.username }</MenuItem>
      <MenuItem onClick={ () => props.logout() } primaryText="Logout" />
    </IconMenu>
  )
}

ProfileMenu.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func
}

export default ProfileMenu
