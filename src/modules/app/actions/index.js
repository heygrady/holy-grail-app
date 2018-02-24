import { createAction } from 'redux-actions'

import { BEGIN_FIRST_LOAD, END_FIRST_LOAD } from '../constants'

export const beginFirstLoad = createAction(BEGIN_FIRST_LOAD)
export const endFirstLoad = createAction(END_FIRST_LOAD)
