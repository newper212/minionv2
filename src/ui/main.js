const { createElement } = require('react');
const { render } = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

const reducers = require('./reducers');
const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

const App = require('./containers/App');

render(
  createElement(Provider, {
    store: store,
  }, createElement(App)),
  document.getElementById('root')
);
