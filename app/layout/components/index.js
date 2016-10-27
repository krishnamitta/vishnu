import React from 'react'
import HeaderContainer from '../containers/header_container'
import Body from './body'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
const muiTheme = getMuiTheme(lightBaseTheme)

export default class Layout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <HeaderContainer />
          <Body data={ this.props.children } />
        </div>
      </MuiThemeProvider>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.element
}
