import { handleActions } from 'redux-actions'

import { BEGIN_FIRST_LOAD, END_FIRST_LOAD } from '../constants'

export default handleActions(
  {
    [BEGIN_FIRST_LOAD]: (state, action) => true,
    [END_FIRST_LOAD]: (state, action) => false
  },
  true
)
