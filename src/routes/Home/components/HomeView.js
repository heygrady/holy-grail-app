import React from 'react'
import Helmet from 'react-helmet'
import RoutePropTypes from '../../../utils/route-prop-types'

import styles from './HomeView.css'

const __SERVER__ = typeof window === 'undefined'

const HomeView = ({ history, location, match }) => {
  console.log(location)
  return (
    <div className="HomeView">
      {__SERVER__ && (
        <Helmet>
          <style>{styles.toString()}</style>
        </Helmet>
      )}
      Home!
    </div>
  )
}

HomeView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default HomeView
