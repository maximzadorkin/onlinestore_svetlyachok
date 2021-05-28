import {ActionTypes} from '../types'

const getSuppliers = (suppliers) => ({
    type: ActionTypes.GET_SUPPLIERS,
    payload: suppliers
})

export default {
    getSuppliers
}