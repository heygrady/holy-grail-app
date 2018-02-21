# Actions

In redux (and flux) actions are how changes are made to the app. With regard to reducers, actions represent an atomic change to the app state. Of course, with side-effects like react-router history, api fetches and redux-saga the meaning of an action can be somewhat ambiguous. Even so, the core concept of an action is to document the _work to be done_.

While you probably aren't familiar with older flux-like frameworks such as Marty.js, it's important to highlight how redux's terminology differs from those frameworks. In redux, an action is an object with a type, like `{ type: 'SOME_ACTION_NAME' }`. In flux-standard actions, an action should also have a payload, like `{ type: 'SOME_ACTION_NAME', payload }`. The key difference between redux and other similar frameworks is a clear distinction between action creation and action dispatching.

- action &mdash; an object that represents work that needs done; see [flux standard action](https://github.com/acdlite/flux-standard-action)
- action creator &mdash; a function that returns an action; see [`createAction`](https://redux-actions.js.org/docs/api/createAction.html)
- action dispatcher &mdash; a function that calls and action creator and dispatches the action; see [`bindActionCreators`](https://redux.js.org/api-reference/bindactioncreators)

**Note:** You should not use `bindActionCreators`. While redux is a very light-weight framework, the idea of action dispatchers is a rare instance of feature bloat. You should prefer to manually dispatch your actions from either `mapDispatchToProps` or a middleware like a thunk or saga.

```js
import { createAction } from 'redux-actions'

import { ACTION_NAME_HERE } from '../constants'

export const actionNameHere = createAction(ACTION_NAME_HERE)
```
