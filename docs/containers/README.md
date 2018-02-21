# Containers

Container are the glue between a react component and the redux store (or other stores). A component _should_ be a pure function that renders props. Components get data from _somewhere else_. A container is a way to map external data sources to a component's props.

It's common practice to merge a component and a container into a single file, but it is recommended to keep them separate. Keeping the "data mapping" separate from the "data rendering" is as important as keeping your styles separate from the presentation.

A component is really three things:
- component &mdash; maps styles to elements; renders props; calls functions on events
- container &mdash; maps state to props; dispatches actions on events
- styles &mdash; decorates the rendered markup

## Redux container

```js
import { connect } from 'redux'

import My from './My'
import { selectPersonName } '../modules/moduleNameHere/selectors'
import { toggleActive } '../modules/moduleNameHere/actions'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const name = selectPersonName(id)(state)
  const active = selectPersonActive(id)(state)
  return {
    active,
    name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    onClick: (event) => {
      event.preventDefault()
      dispatch(toggleActive(id))
    }
  }
}

const MyContainer = connect(mapStateToProps, mapDispatchToProps)(My)

export default MyContainer
```
