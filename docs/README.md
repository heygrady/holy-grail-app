# Holy Grail App

- react-router-dom
- react-loadable
- react-helmet
- @comfy/react-router-redux
- [@comfy/react-router-container](./packages/react-router-container)
- @comfy/react-state-container
- @comfy/with-load-data
- @comfy/with-styles
- @comfy/with-module

## App structure

Our top-level app will employ a fractal structure, meaning that most folders will contain sub-folders. Core concepts are grouped into a distinct categories: components, modules and routes. At a high level, components deal with react, modules deal with redux and routes deal with react-router. Of course our app requires all three to be deeply interrelated. Separating these concerns can help keep our code organized and make it less painful to refactor our app.

Here's a proposed top-level app structure. Some details have been omitted for brevity. Each of these top-level directories will have a specific structure that will be outlined further below.

```
- build/
- configs/
- scripts/
- server/
- src/
  - components/
  - modules/
  - routes/
  - store/
  - styles/
  - utils/
  - App.(module|global)?.(s?css|less)
  - App.js
  - App.spec.js
  - index.client.js
  - index.ios.js
  - index.android.js
  - index.server.js
```

## Routes

See: [`routes/`](./routes/README.md)

At the core of our app is routing. For the web client and for the server, we decide what to render based on the current location. Under the hood we're relying on react-router to provide this mapping. You can see below that we're proposing to store the actual route components in with the route definition. Rather than maintaining a massive route index, we're building the index progressively, using a nesting route structure. This allows us to manage the route tree dynamically while still enabling things like server-side data preloading.

In essence, each route in a miniature application. It can contain its own components and modules. Those components and modules can be shared across routes quite easily. When a component or module is required by many different routes it can be bounced up to the app-level folders quite easily. This makes it painless to reconfigure the app while also enabling us to encapsulate logic where it's actually used.

Coupled with `react-loadable` code-splitting and higher-oder-components like `withLoadData`, `withModules`, `withStyles`, the app bundle can be cleanly broken down. With these techniques, the configuration for each route can be co-located with the route itself.

```
- src/routes/
  - RouteNameHere/
    - components/
      - RouteNameHereView/
        - RouteNameHereView.(module|global)?.(s?css|less)
        - RouteNameHereView.spec.js
        - RouteNameHereView.js
        - index.js
    - modules/
    - routes/
    - index.js
  - index.js
```

## Modules

See: [`modules/`](./modules/README.md)

Based on the concepts of [redux ducks modules](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be), all redux code should be grouped into modules. The idea that there's only one `state` can lead people down the path of creating only one folder for each concept. Redux modules recognizes that the code inside an action, reducer or selector often relates to a specific branch of the state tree. A good practice is, then, to group those concepts by tree branch. That makes it much easier to manage your code.

One of the best features of redux is the single store; every part of the app can listen to every other part. Grouping modules by tree branch doesn't undo any of that goodness, it simply recognizes that most of time you're working with only one specific part at a time. You can still listen for actions from one module in some other completely unrelated modules. However, with a module based structure it is clear where you're importing your actions from.

```
- src/modules/
  - moduleNameHere/
    - actions/index.js
    - constants/index.js
    - reducers/
      - childNameHereReducer.js
      - childNameHereReducer.spec.js
      - index.js
    - sagas/
      - actionNameSaga.js
      - actionNameSaga.spec.js
      - index.js
    - selectors/index.js
    - index.js
  - index.js
```

## Components

See: [`components/`](./components/README.md)

Components are easily abused. There is a push to ensure that components are pure &mdash; a component should render props. State should come from _somewhere else_. To that end, when a component needs to obtain props from the store it should be wrapped in a container. Commonly, developers lump their components and containers into a single file. This can lead to many bad practices and components that difficult to test and refactor.

- Component &mdash; ideally a pure function that renders props
- Container &mdash; selects data from the state; dispatches actions
- Styles &mdash; ideally a css module that provides locally scoped class names

```
- src/components/
  - ComponentNameHere/
    - SubComponentNameHere/
    - ComponentNameHere.(module|global)?.(s?css|less)
    - ComponentNameHere.js
    - ComponentNameHere.spec.js
    - ComponentNameHereContainer.js
    - ComponentNameHereContainer.spec.js
    - index.js
```

## Store

See: [`store/`](./store/README.md)

```
- src/store/
  - createStore.js
  - reducers.js
  - sagas.js
  - history.js
```


## Styles

See: [`styles/`](./styles/README.md)

```
- src/styles/
  - style-name-here.(module|global)?.(s?css|less)
```

## Server

See: [`server/`](./server/README.md)

```
- server/
  - app/
  - index.js
  - route.js
```
