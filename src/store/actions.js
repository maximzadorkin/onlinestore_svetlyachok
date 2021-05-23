import { ActionTypes } from './types'

const setRows = payload => ({
    type: ActionTypes.SET_ROWS,
    payload
})

const deleteRow = row => ({
    type: ActionTypes.DELETE_ROW,
    payload: row
})

export const Actions = {
    setRows,
    deleteRow
}