# Component

```js
import React from 'react'
import PropTypes from 'prop-types'

const My = ({ active, name, onClick }) => {
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={onClick}>{active ? 'disable' : 'activate'}</button>
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
