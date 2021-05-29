import { ActionTypes } from '../types'

const initialState = {
    suppliers: [],
    supplies: [],
    scopes: []
}

const supplies = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.GET_SUPPLIES:
            return { ...state, supplies: action.payload }
        case ActionTypes.GET_SUPPLIES_SCOPES:
            return { ...state, scopes: action.payload }
        case ActionTypes.GET_SUPPLIERS:
            return { ...state, suppliers: action.payload }
        default:
            return state
    }
}

export default supplies