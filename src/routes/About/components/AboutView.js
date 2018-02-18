import React from 'react'
// import PropTypes from 'prop-types'
import RoutePropTypes from '../../../utils/react-router-prop-types'

const AboutView = ({ history, location, match }) => {
  return <div>About!</div>
}
AboutView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default AboutView
