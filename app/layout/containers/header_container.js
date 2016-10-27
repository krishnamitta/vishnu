import HeaderComponent from '../components/header_component'
import { logout } from '../../auth/actions/login_actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.Auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
