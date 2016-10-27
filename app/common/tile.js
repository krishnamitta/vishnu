import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import styles from '../styles'


const Tile = (props) => {
  return (
    <Paper style={ styles.tile.wrapper } zDepth={ 2 }>
      <h1 style={ styles.tile.header }>{ props.label }</h1>
      <div style={ { position: 'relative' } }>{ props.icon }</div>
    </Paper>
  )
}

Tile.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object
}

export default Tile
