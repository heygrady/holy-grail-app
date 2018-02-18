import React from 'react'
// import PropTypes from 'prop-types'
import RoutePropTypes from '../../../utils/react-router-prop-types'

const HomeView = ({ history, location, match }) => {
  return <div>Home!</div>
}
HomeView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default HomeView
