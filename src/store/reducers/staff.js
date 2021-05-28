import {ActionTypes} from '../types'

const initialState = {
    positions: [],
    staff: []
}

const staff = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_STAFF_POSITIONS:
            return {...state, positions: action.payload}
        case ActionTypes.GET_STAFF:
            return {...state, staff: action.payload}
        default:
            return state
    }
}

export default staff