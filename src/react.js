import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './containers/App'
import { applyMiddleware, createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

function render() {
    const store = createStore(reducer, applyMiddleware(thunk))
    const app = (
        <Provider store={store}>
            <App />
        </Provider>
    )
    const rootNode = document.body.querySelector('#root')

    ReactDOM.render(app, rootNode)
}

render()
