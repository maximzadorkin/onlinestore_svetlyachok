import {ActionTypes} from '../types'

const getClients = (products) => ({
    type: ActionTypes.GET_CLIENTS,
    payload: products
})

export default {
    getClients
}