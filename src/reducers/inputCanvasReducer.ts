import * as A      from './actions'
import * as C      from '../const'
import ColorHelper from 'react-color/lib/helpers/color'

export interface inputCanvasState {
    id      : string
    width   : number
    height  : number
    penColor: any
}

const initialState = {
    id      : C.inputCanvasId,
    width   : 400,
    height  : 400,
    penColor: ColorHelper.toState('#000000')
}

export const inputCanvasReducer = (
    state: inputCanvasState = initialState,
    action: A.CanvasSize | A.PenColor
) => {
    if (!('id' in action) || action.id != C.inputCanvasId) return state

    switch (action.type) {
        case 'CANVAS_SIZE':
            return { ...state, width: action.width, height: action.height }
        case 'PEN_COLOR':
            return { ...state, penColor: action.color }
        default:
            return state
    }
}
