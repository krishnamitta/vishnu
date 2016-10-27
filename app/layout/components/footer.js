import React from 'react'
import Paper from 'material-ui/Paper'
import styles from '../../styles.js'

const Footer = () => (
  <Paper className="footer" zDepth={ 0 } style={ styles.footer }>
    <footer className="col-1-1" style={ { padding: '0 24px' } }>
      { new Date().getFullYear() } Copart Inc.
    </footer>
  </Paper>
)

export default Footer
