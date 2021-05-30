import { ActionTypes } from '../types'

const initialState = {
    countSalesForDataRange: [],
    stockBalance: []
}

const reports = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_COUNT_SALES_FOR_DATA_RANGE:
            return { ...state, countSalesForDataRange: action.payload }
        case ActionTypes.GET_STOCK_BALANCE:
            return { ...state, stockBalance: action.payload }
        case ActionTypes.GET_BUYERS_LIST_FOR_DATE_RANGE:
            return { ...state, buyersListForDateRange: action.payload }
        default:
            return state
    }
}

export default reports