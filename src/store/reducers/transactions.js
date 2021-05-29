import { ActionTypes } from './../types'

const initialState = {
    transactions: []
}

const transactions = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.GET_TRANSACTIONS:
            return { ...state, transactions: action.payload }
        default:
            return state
    }
}

export default transactions