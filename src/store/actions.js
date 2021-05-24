import { ActionTypes } from './types'

const setRows = payload => ({
    type: ActionTypes.SET_ROWS,
    payload
})

const updateRow = row => ({
    type: ActionTypes.UPDATE_ROW,
    payload: row
})


const deleteRow = row => ({
    type: ActionTypes.DELETE_ROW,
    payload: row
})

const setPositions = positions => ({
    type: ActionTypes.SET_POSITIONS,
    payload: positions
})

const setProductCategories = categories => ({
    type: ActionTypes.SET_PRODUCT_CATEGORIES,
    payload: categories
})

const setProductVendors = vendors => ({
    type: ActionTypes.SET_PRODUCT_VENDORS,
    payload: vendors
})

const setProcurementProducts = payload => ({
    type: ActionTypes.SET_PROCUREMENT_PRODUCTS,
    payload
})

const setProviders = payload => ({
    type: ActionTypes.SET_PROVIDERS ,
    payload
})

const setStaff = payload => ({
    type: ActionTypes.SET_STAFF,
    payload
})

const setProducts = payload => ({
    type: ActionTypes.SET_PRODUCTS,
    payload
})

const setTransactions = payload => ({
    type: ActionTypes.SET_TRANSACTIONS,
    payload
})

const setSalers = payload => ({
    type: ActionTypes.SET_SALERS,
    payload
})

const setClients = payload => ({
    type: ActionTypes.SET_CLIENTS,
    payload
})

export const Actions = {
    setRows,
    updateRow,
    deleteRow,
    setPositions,
    setProductCategories,
    setProductVendors,
    setProcurementProducts,
    setProviders,
    setStaff,
    setProducts,
    setTransactions,
    setSalers,
    setClients
}