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

export const Actions = {
    setRows,
    updateRow,
    deleteRow,
    setPositions,
    setProductCategories,
    setProductVendors
}