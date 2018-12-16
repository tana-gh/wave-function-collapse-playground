import * as A      from './actions'
import * as C      from '../const'
import ColorHelper from 'react-color/lib/helpers/color'

export interface InputCanvasState {
    id      : string
    width   : number
    height  : number
    penColor: any
}

const assignIntToColor = (color) => ({
    ...color,
    int: (color.rgb.r << 16) + (color.rgb.g << 8) + color.rgb.b
})

const initialState = {
    id      : C.inputCanvasId,
    width   : 400,
    height  : 400,
    penColor: assignIntToColor(ColorHelper.toState('#000000'))
}

export const inputCanvasReducer = (
    state: InputCanvasState = initialState,
    action: A.CanvasSize | A.PenColor
) => {
    if (!('id' in action) || action.id !== C.inputCanvasId) return state

    switch (action.type) {
        case 'CANVAS_SIZE':
            return { ...state, width: action.width, height: action.height }
        case 'PEN_COLOR':
            return { ...state, penColor: assignIntToColor(action.color) }
        default:
            return state
    }
}
