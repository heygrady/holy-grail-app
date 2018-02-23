import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import DefaultLoading from '../../components/Loading'

const __SERVER__ = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const defaultDelay = 200
const defaultTimeout = 1000

const withLoadData = (
  loadData,
  Loading = DefaultLoading,
  { delay = defaultDelay, timeout = defaultTimeout } = {}
) => {
  // TODO: invariant if loadData === undefined
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
        const { history, match } = this.props
        const promise = loadData(store, history, match)

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
          this.timeoutId = undefined
        }
        if (this.deferId) {
          clearTimeout(this.deferId)
          this.deferId = undefined
        }
      }

      componentWillUnmount() {
        this.clearTimeouts()
      }

      render() {
        const { error, loaded, pastDelay, timedOut } = this.state
        if (!__SERVER__ && !loaded) {
          return (
            <Loading
              {...this.props}
              error={error}
              pastDelay={pastDelay}
              timedOut={timedOut}
            />
          )
        }
        const { wrappedComponentRef, ...remainingProps } = this.props
        return <InnerComponent {...remainingProps} ref={wrappedComponentRef} />
      }
    }
    WithLoadData.propTypes = {
      history: PropTypes.object,
      match: PropTypes.object,
      wrappedComponentRef: PropTypes.func
    }
    WithLoadData.contextTypes = {
      store: PropTypes.object
    }
    WithLoadData.displayName = `withLoadData(${InnerComponent.displayName ||
      InnerComponent.name})`
    WithLoadData.WrappedComponent = InnerComponent

    hoistStatics(WithLoadData, InnerComponent)
    return withRouter(WithLoadData)
  }
}

export default withLoadData
