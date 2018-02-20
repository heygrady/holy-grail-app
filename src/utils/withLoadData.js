import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import RoutePropTypes from './route-prop-types'
import DefaultLoading from '../components/Loading'

const __SERVER__ = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const defaultTimeout = 1000
const defaultDelay = 200

const withLoadData = (
  loadData,
  Loading = DefaultLoading,
  { timeout = defaultTimeout, delay = defaultDelay } = {}
) => {
  let isFirstRender = false
  // TODO: invariant if !loadData
  return InnerComponent => {
    class WithLoadData extends Component {
      constructor(props, context) {
        super(props, context)
        this.state = {
          error: false,
          loaded: false,
          pastDelay: false,
          preloaded: false,
          timedOut: false
        }
        this.clearTimeouts = this.clearTimeouts.bind(this)
      }

      static loadData = loadData

      componentWillMount() {
        if (__SERVER__) {
          return
        }
        if (isFirstRender) {
          isFirstRender = false
          return
        }

        const { preloaded } = this.state
        if (!preloaded) {
          this.setState({ preloaded: true })
          if (typeof InnerComponent.preload === 'function') {
            InnerComponent.preload()
          }
        }

        this.setState({ loaded: false })

        this.timeoutId = setTimeout(() => {
          this.timeoutId = undefined
          this.setState({ timedOut: true })
        }, timeout)

        this.deferId = setTimeout(() => {
          this.deferId = undefined
          this.setState({ pastDelay: true })
        }, delay)

        const { store } = this.context
        const { match, location } = this.props
        const promise = loadData(store, match, location)

        if (promise && typeof promise.then === 'function') {
          promise
            .then(result => {
              this.clearTimeouts()
              this.setState({ loaded: true })
              return result
            })
            .catch(error => {
              console.error(error)
              this.clearTimeouts()
              this.setState({ error: true })
            })
        } else {
          this.clearTimeouts()
          this.setState({ loaded: true })
        }
      }

      clearTimeouts() {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId)
        }
        if (this.deferId) {
          clearTimeout(this.deferId)
        }
        this.timeoutId = undefined
        this.deferId = undefined
      }

      componentWillUnmount() {
        this.clearTimeouts()
      }

      render() {
        const { error, loaded, pastDelay, timedOut } = this.state
        if (!loaded) {
          return (
            <Loading
              {...this.props}
              error={error}
              pastDelay={pastDelay}
              timedOut={timedOut}
            />
          )
        }
        return <InnerComponent {...this.props} />
      }
    }
    WithLoadData.propTypes = {
      location: RoutePropTypes.location,
      match: RoutePropTypes.match
    }
    WithLoadData.contextTypes = {
      store: PropTypes.object
    }
    hoistStatics(WithLoadData, InnerComponent)
    return withRouter(WithLoadData)
  }
}

export default withLoadData
