import { ActionTypes } from "../types"

const getCountSalesForDateRange = payload => ({
    type: ActionTypes.GET_COUNT_SALES_FOR_DATA_RANGE,
    payload
})
const getStockBalance = payload => ({
    type: ActionTypes.GET_STOCK_BALANCE,
    payload
})

export default {
    getStockBalance,
    getCountSalesForDateRange
}