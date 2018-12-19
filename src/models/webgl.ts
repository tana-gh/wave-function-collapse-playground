import { store } from '../store/Provider'
import _ = require('lodash')

import vertexShaderSource   from '../shaders/vertexShader'
import fragmentShaderSource from '../shaders/fragmentShader'

export const createWebGL = (parent: HTMLElement, width, height) => {
    const canvas = document.createElement('canvas')
    parent.appendChild(canvas)
    setStyle(canvas, width, height)
    setSize (canvas)
    
    const gl = canvas.getContext('webgl')

    if (gl) {
        const success = initWebGL(gl)
        return <[boolean, HTMLElement]>[success, canvas]
    }
    else {
        const errorMessage = document.createElement('div')
        setStyle(errorMessage, width, height)
        errorMessage.textContent = 'WebGL not supported'
        return <[boolean, HTMLElement]>[false, errorMessage]
    }
}

export const resize = (canvas, width, height) => {
    setStyle(canvas, width, height)
    setSize (canvas)
}

const setStyle = (element: HTMLElement, width, height) => {
    element.style.width  = `${width}px`
    element.style.height = `${height}px`
    element.style.border = 'thick double turquoise'
}

const setSize = (canvas: HTMLCanvasElement) => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    if (w != canvas.width || h != canvas.height) {
        canvas.width  = w
        canvas.height = h
    }
}

const initWebGL = (gl: WebGLRenderingContext) => {
    const vertexShader   = createShader(gl, gl.VERTEX_SHADER  , vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) {
        return false
    }

    const program = createProgram(gl, vertexShader, fragmentShader)

    if (!program) {
        return false
    }

    initProgram(gl, program)

    return true
}

const createShader = (gl: WebGLRenderingContext, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }

    console.error(gl.getShaderInfoLog(shader))

    gl.deleteShader(shader)
}

const createProgram = (gl: WebGLRenderingContext, vertexShader, fragmentSahder) => {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentSahder)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        return program
    }

    console.error(gl.getProgramInfoLog(program))

    gl.deleteProgram(program)
}

const initProgram = (gl: WebGLRenderingContext, program: WebGLProgram) => {
    const positionAttribureLocation = gl.getAttribLocation(program, 'a_position')
    
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const positions = [
        -1.0, -1.0,
         1.0,  1.0,
        -1.0,  1.0,

         1.0, -1.0,
         1.0,  1.0,
        -1.0, -1.0
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    gl.enableVertexAttribArray(positionAttribureLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(positionAttribureLocation, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

/*
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
*/
