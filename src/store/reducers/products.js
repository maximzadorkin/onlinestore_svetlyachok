import {ActionTypes} from '../types'

const initialState = {
    vendors: [],
    categories: [],
    products: [],
}

const products = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.GET_PRODUCT_CATEGORIES:
            return {...state, categories: action.payload}
        case ActionTypes.GET_PRODUCT_VENDORS:
            return {...state, vendors: action.payload}
        case ActionTypes.GET_PRODUCTS:
            return {...state, products: action.payload}
        default:
            return state
    }
}

export default products