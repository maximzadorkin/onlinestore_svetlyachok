import {ActionTypes} from '../types'

const getProductCategories = categories => ({
    type: ActionTypes.GET_PRODUCT_CATEGORIES,
    payload: categories
})

const getProductVendors = vendors => ({
    type: ActionTypes.GET_PRODUCT_VENDORS,
    payload: vendors
})

const getProducts = products => ({
    type: ActionTypes.GET_PRODUCTS,
    payload: products
})

export default {
    getProductCategories,
    getProductVendors,
    getProducts
}