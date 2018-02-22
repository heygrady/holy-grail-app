import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import hoistStatics from 'hoist-non-react-statics'

const __SERVER__ = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const withCriticalStyles = (...styles) => InnerComponent => {
  const prefix = InnerComponent.displayName || InnerComponent.name

  class WithCriticalStyles extends Component {
    render() {
      if (!__SERVER__) {
        return <InnerComponent {...this.props} />
      }
      return (
        <Fragment>
          <Helmet>
            {styles.map((css, i) => (
              <style key={`${prefix}-${i}`} type="text/css" media="all">
                {css}
              </style>
            ))}
          </Helmet>
          <InnerComponent {...this.props} />
        </Fragment>
      )
    }
  }
  // WithCriticalStyles.propTypes = {
  //   location: PropTypes.object,
  //   match: PropTypes.object,
  //   wrappedComponentRef: PropTypes.func
  // }
  // WithCriticalStyles.contextTypes = {
  //   store: PropTypes.object
  // }
  WithCriticalStyles.displayName = `withCriticalStyles(${InnerComponent.displayName ||
    InnerComponent.name})`
  WithCriticalStyles.WrappedComponent = InnerComponent

  hoistStatics(WithCriticalStyles, InnerComponent)
  return WithCriticalStyles
}

export default withCriticalStyles
