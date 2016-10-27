import React, { Component } from 'react'
import styles from '../../styles.js'

export default class Body extends Component {


  
  render() {
    return (

      <section className="wrapper">
        <div style={ styles.wrapper }>

          { this.props.data }

        </div>
      </section>

    )
  }
}

Body.propTypes = {
  data: React.PropTypes.object
}
