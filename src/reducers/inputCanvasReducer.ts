import { PenColor } from './actions'

export interface inputCanvasState {
    penColor: string
}

const initialState = {
    penColor: '#000000'
}

export const inputCanvasReducer = (state: inputCanvasState = initialState, action: PenColor) => {
    switch (action.type) {
        case 'PEN_COLOR':
            return Object.assign({}, state, { penColor: action.color })
        default:
            return state
    }
}
