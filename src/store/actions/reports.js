import { ActionTypes } from "../types"

const getCountSalesForDateRange = payload => ({
    type: ActionTypes.GET_COUNT_SALES_FOR_DATA_RANGE,
    payload
})
const getStockBalance = payload => ({
    type: ActionTypes.GET_STOCK_BALANCE,
    payload
})
const getBuyersListForDateRange = payload => ({
    type: ActionTypes.GET_BUYERS_LIST_FOR_DATE_RANGE,
    payload
})

export default {
    getBuyersListForDateRange,
    getStockBalance,
    getCountSalesForDateRange
}