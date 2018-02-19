import React from 'react'
import RoutePropTypes from '../../../utils/route-prop-types'

const HomeView = ({ history, location, match }) => {
  return <div>Home!</div>
}

HomeView.propTypes = {
  history: RoutePropTypes.history,
  location: RoutePropTypes.location,
  match: RoutePropTypes.match
}

export default HomeView
