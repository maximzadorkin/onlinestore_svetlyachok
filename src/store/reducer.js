import { combineReducers } from 'redux'
import app from './reducers/app'
import supplies from './reducers/supplies'
import staff from './reducers/staff'
import clients from './reducers/clients'
import products from './reducers/products'
import transactions from './reducers/transactions'
import reports from './reducers/reports'

const reducer = combineReducers({
    app,
    products,
    supplies,
    staff,
    clients,
    transactions,
    reports
})

export default reducer
