import { combineReducers } from 'redux'
import app from './reducers/app'
import supplies from './reducers/supplies'
import staff from './reducers/staff'
import clients from './reducers/clients'
import products from './reducers/products'
import transactions from './reducers/transactions'

const reducer = combineReducers({
    app,
    products,
    supplies,
    staff,
    clients,
    transactions
})

export default reducer
