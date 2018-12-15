
export interface CanvasSize {
    type  : 'CANVAS_SIZE'
    id    : string
    width : number
    height: number
}

export const canvasSize = (
    id    : string,
    width : number,
    height: number
) => <CanvasSize>{
    type: 'CANVAS_SIZE',
    id,
    width,
    height
}

export interface PenColor {
    type : 'PEN_COLOR'
    id   : string
    color: any
}

export const penColor = (
    id   : string,
    color: any
) => <PenColor>{
    type: 'PEN_COLOR',
    id,
    color
}
