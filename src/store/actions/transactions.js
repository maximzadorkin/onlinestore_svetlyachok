import { ActionTypes } from './../types'

const getTransactions = transactions => ({
    type: ActionTypes.GET_TRANSACTIONS,
    payload: transactions
})

export default {
    getTransactions
}