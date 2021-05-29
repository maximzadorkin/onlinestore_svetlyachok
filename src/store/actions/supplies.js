import { ActionTypes } from '../types'

const getSuppliers = suppliers => ({
    type: ActionTypes.GET_SUPPLIERS,
    payload: suppliers
})

const getSupplies = supplies => ({
    type: ActionTypes.GET_SUPPLIES,
    payload: supplies
})

const getScopes = scopes => ({
    type: ActionTypes.GET_SUPPLIES_SCOPES,
    payload: scopes
})

export default {
    getSuppliers,
    getSupplies,
    getScopes
}