import {ActionTypes} from '../types'

const initialState = {
    clients: []
}

const clients = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_CLIENTS:
            return {...state, clients: action.payload}
        default:
            return state
    }
}

export default clients