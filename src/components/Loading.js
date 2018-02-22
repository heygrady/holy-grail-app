import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({ error, pastDelay, timedOut }) => {
  if (error) {
    return <div>Error!</div>
  } else if (timedOut) {
    return <div>Taking a long time...</div>
  } else if (pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

Loading.propTypes = {
  error: PropTypes.bool,
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool
}

export default Loading
