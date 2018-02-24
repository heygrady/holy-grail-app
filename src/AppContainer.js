import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { selectFirstLoad } from './modules/app/selectors'
import { beginFirstLoad, endFirstLoad } from './modules/app/actions'

import App from './App'

const mapStateToProps = state => ({
  firstLoad: selectFirstLoad(state)
})

const mapDispatchToProps = dispatch => ({
  onBeginFirstLoad: () => dispatch(beginFirstLoad()),
  onEndFirstLoad: () => dispatch(endFirstLoad())
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App)

export default AppContainer
