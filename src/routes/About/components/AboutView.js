import React from 'react'
import RoutePropTypes from '../../../utils/route-prop-types'

import styles from './AboutView.css'

const AboutView = ({ history, location, match }) => {
  return <div className="AboutView">About!</div>
}
AboutView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default AboutView
