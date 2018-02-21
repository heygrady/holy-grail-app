# Components

```
- src/components/
  - ComponentNameHere/
    - SubComponentNameHere/
    - ComponentNameHere.js
    - ComponentNameHere.module.(s?css|less)
    - ComponentNameHere.spec.js
    - ComponentNameHereContainer.js
    - ComponentNameHereContainer.spec.js
    - index.js
```

## Functional components

In all cases, prefer a functional component. While a class component may be necessary (when you need access to the component lifecycle) it should be considered a last resort. Typically the work of fetching data, selecting data from the state and dispatching actions should happen in a [container](../containers/README.md). A component _should_ be narrowly concerned with rendering props and calling event functions.

```js
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import styles from './My.scss'

const cx = classnames.bind(styles)

const My = ({ active, name, onClick }) => {
  return (
    <div className={cx('container')}>
      <h1 className={cx('name')}>{name}</h1>
      <button
        className={cx('button', { active })}
        onClick={onClick}
      >
        {active ? 'disable' : 'activate'}
      </button>
    </div>
  )
}

My.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func
}

export default My
```
