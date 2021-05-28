import {ActionTypes} from '../types'

const getStaffPositions = (positions) => ({
    type: ActionTypes.GET_STAFF_POSITIONS,
    payload: positions
})

const getStaff = staff => ({
    type: ActionTypes.GET_STAFF,
    payload: staff
})

export default {
    getStaffPositions,
    getStaff
}