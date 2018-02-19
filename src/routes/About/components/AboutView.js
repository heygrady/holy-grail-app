import React from 'react'
import RoutePropTypes from '../../../utils/route-prop-types'

const AboutView = ({ history, location, match }) => {
  return <div>About!</div>
}
AboutView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default AboutView
