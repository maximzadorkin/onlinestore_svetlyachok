import { ActionTypes } from './types'
import _ from 'lodash'

const initState = {
    rows: [],
    selectedSection: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_ROW:
            console.log(action)
            return {
                ...state,
                rows: state.rows.filter(row => !_.isEqual(row, action.payload))
            }
        case ActionTypes.SET_ROWS:
            return {...state, rows: action.payload}
        default:
            return state
    }
}

export default reducer
