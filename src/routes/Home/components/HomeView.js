import React from 'react'
import Helmet from 'react-helmet'
import withCriticalStyles from '../../../utils/with-critical-styles'
import RoutePropTypes from '../../../utils/route-prop-types'

import styles from './HomeView.css'

const HomeView = ({ history, location, match }) => {
  return (
    <div className="HomeView">
      <Helmet>
        <title>Home</title>
      </Helmet>
      Home!
    </div>
  )
}

HomeView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default withCriticalStyles(styles)(HomeView)
