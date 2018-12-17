import * as PIXI from 'pixi.js'
import { store } from '../store/Provider'

import _ = require('lodash')

export const createApp = (width, height) => {
    const app = new PIXI.Application({ width, height })
    initApp(app)
    return app
}

const initApp = (app: PIXI.Application) => {
    app.renderer.autoResize = true

    const interaction: PIXI.interaction.InteractionManager = app.renderer.plugins.interaction
    interaction.cursorStyles = { default: 'crosshair', pointer: 'default' }

    const g = new PIXI.Graphics()
    app.stage.addChild(g)

    let isMouseDown    = false
    let [prevX, prevY] = [0, 0]

    interaction.on('mousedown', (e: PIXI.interaction.InteractionEvent) => {
        const o     = <MouseEvent>e.data.originalEvent
        const color = store.getState().inputCanvasReducer.penColor
        fillCircle(g, o.offsetX, o.offsetY, color)
        isMouseDown = true
        prevX = o.offsetX
        prevY = o.offsetY
    })

    interaction.on('mousemove', (e: PIXI.interaction.InteractionEvent) => {
        if (!isMouseDown) {
            return
        }
        const o     = <MouseEvent>e.data.originalEvent
        const color = store.getState().inputCanvasReducer.penColor
        drawLine(g, prevX, prevY, o.offsetX, o.offsetY, color)
        prevX = o.offsetX
        prevY = o.offsetY
    })

    interaction.on('mouseup', (e: PIXI.interaction.InteractionEvent) => {
        const o     = <MouseEvent>e.data.originalEvent
        const color = store.getState().inputCanvasReducer.penColor
        fillCircle(g, o.offsetX, o.offsetY, color)
        isMouseDown = false
    })
}

const drawLine = (g, x0, y0, x1, y1, color) => {
    const [dx, dy] = [x1 - x0, y1 - y0]
    const norm     = Math.sqrt(dx * dx + dy * dy)
    const [ex, ey] = norm === 0 ? [0, 0] : [dx / norm, dy / norm]

    _(_.range(0, Math.floor(norm)))
        .map(n => [x0 + ex * n, y0 + ey * n])
        .forEach(([x, y]) => fillCircle(g, x, y, color))
}

const fillCircle = (g, x, y, color) => {
    g.beginFill(color.int, 1)
    g.drawCircle(x, y, 10)
    g.endFill()
}
