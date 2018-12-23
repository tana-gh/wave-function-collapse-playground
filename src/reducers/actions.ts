
export interface CanvasSize {
    readonly type  : 'CANVAS_SIZE'
    readonly id    : string
    readonly width : number
    readonly height: number
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
    readonly type : 'PEN_COLOR'
    readonly id   : string
    readonly color: any
}

export const penColor = (
    id   : string,
    color: any
) => <PenColor>{
    type: 'PEN_COLOR',
    id,
    color
}
