import {ActionTypes} from '../types'

const initialState = {
    suppliers: []
}

const supplies = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.GET_SUPPLIERS:
            return {...state, suppliers: action.payload}
        default:
            return state
    }
}

export default supplies