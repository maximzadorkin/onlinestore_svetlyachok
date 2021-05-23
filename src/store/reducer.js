import { ActionTypes } from './types'
import _ from 'lodash'

const initState = {
    rows: [],
    positions: [],
    productCategories: [],
    productVendors: []
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case ActionTypes.SET_PRODUCT_CATEGORIES:
            return {...state, productCategories: action.payload}
        case ActionTypes.SET_PRODUCT_VENDORS:
            return {...state, productVendors: action.payload}
        case ActionTypes.SET_POSITIONS:
            return {...state, positions: action.payload}
        case ActionTypes.SET_ROWS:
            return {...state, rows: action.payload}
        case ActionTypes.DELETE_ROW:
            return {
                ...state,
                rows: state.rows.filter(row => !_.isEqual(row, action.payload))
            }
        default:
            return state
    }
}

export default reducer
