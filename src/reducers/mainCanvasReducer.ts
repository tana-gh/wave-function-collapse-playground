import * as A      from './actions'
import * as C      from '@/utils/const'
import ColorHelper from 'react-color/lib/helpers/color'

export interface MainCanvasState {
    readonly id      : string
    readonly width   : number
    readonly height  : number
    readonly penColor: any
}

const assignIntToColor = (color) => ({
    ...color,
    int: (color.rgb.r << 16) + (color.rgb.g << 8) + color.rgb.b
})

const initialState = {
    id      : C.mainCanvasId,
    width   : 1000,
    height  : 1000,
    penColor: assignIntToColor(ColorHelper.toState('#FFFFFF'))
}

export const mainCanvasReducer = (
    state : MainCanvasState = initialState,
    action: A.CanvasSize | A.PenColor
) => {
    if (!('id' in action) || action.id !== C.mainCanvasId) return state

    switch (action.type) {
        case 'CANVAS_SIZE':
            return { ...state, width: action.width, height: action.height }
        case 'PEN_COLOR':
            return { ...state, penColor: assignIntToColor(action.color) }
        default:
            return state
    }
}
