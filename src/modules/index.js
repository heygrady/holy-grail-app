import app, { rootSaga as appSaga } from './app'
// import other, { rootSaga as otherSaga } from './other'

export const reducers = [app]
export const sagas = [appSaga]
