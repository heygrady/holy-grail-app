# Holy grail app

There are tons of react starter kits available. Over the past year or so the market has been consolidating around create react app. It's an excellent foundation, providing a best-of-breed development experience and some production ready defaults. If you're wanting to get started with a new toy react project, there isn't a better starter kit. However, it's not perfect. If you are building a more serious app, you will need to tweak the defaults.

Forget the discussion about "to eject or not to eject." That's been settled. [You should fork and roll your own](https://medium.com/@denis.zhbankov/maintaining-a-fork-of-create-react-app-as-an-alternative-to-ejecting-c555e8eb2b63).

So now the question is this: what's the right foundation for a "real" production app?

Here are some features that should be added to a "holy grail" react-scripts fork.

- Code splitting with react-loadable
- Routing with react-router-dom
- Meta data management with react-helmet
- Server side rendering
- Critical path style injection (maybe with isomorphic-style-loader, maybe not!)

```bash
create-react-app holy-grail-app && \
cd holy-grail-app && \
yarn install && \
yarn eject && \
yarn add react-loadable react-helmet react-router-dom
```
