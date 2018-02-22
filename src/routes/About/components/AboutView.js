import React from 'react'
import Helmet from 'react-helmet'
import withCriticalStyles from '../../../utils/with-critical-styles'
import RoutePropTypes from '../../../utils/route-prop-types'

import styles from './AboutView.css'

const AboutView = ({ history, location, match }) => {
  return (
    <div className="AboutView">
      <Helmet>
        <title>About</title>
      </Helmet>
      About!
    </div>
  )
}

AboutView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default withCriticalStyles(styles)(AboutView)
