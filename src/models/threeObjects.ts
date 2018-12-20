import * as THREE from 'three'
import _ = require('lodash')

import * as Interaction from './interaction'
import * as shaders from '../shaders/shaders'
import detector         from './detector'
import { store }        from '../store/Provider'

export interface IThreeObjects {
    readonly scene    : THREE.Scene
    readonly camera   : THREE.Camera
    readonly renderer : THREE.Renderer
}

export interface IStateObjects {
    interactions: Interaction.IInteractions
    uniforms    : any
}

export const setupThreeObjects = (parent: HTMLElement, width, height) => {
    if (detector.webgl) {
        const [threeObjects, stateObjects] = createThreeObjects(width, height)
        const { renderer } = threeObjects
        parent.appendChild(renderer.domElement)
        setStyle(renderer.domElement, width, height)
        setRendererSize(renderer)
        return <[boolean, IThreeObjects, IStateObjects]>[true, threeObjects, stateObjects]
    }
    else {
        const errorMessage = document.createElement('div')
        parent.appendChild(errorMessage)
        setStyle(errorMessage, width, height)
        errorMessage.textContent = 'WebGL not supported'
        return <[boolean, IThreeObjects, IStateObjects]>[false, null, null]
    }
}

export const resize = (renderer: THREE.Renderer, width, height) => {
    setStyle(renderer.domElement, width, height)
    setRendererSize(renderer)
}

const createThreeObjects = (width, height) => {
    const stateObjects = {
        interactions: <Interaction.IInteractions>undefined,
        uniforms: {
            penColor: {
                type : 'v4',
                value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0)
            }
        }
    }

    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera
    (
        -width  * 0.5,
         width  * 0.5,
         height * 0.5,
        -height * 0.5,
        -1.0,
         1.0
    )
    camera.position.set(0.0, 0.0, 0.0)

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 0.0)
    renderer.setSize(width, height)

    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.ShaderMaterial({
        vertexShader  : shaders.vertexShader,
        fragmentShader: shaders.fragmentShader,
        uniforms      : stateObjects.uniforms
    })
    const mesh     = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const threeObjects = {
        scene,
        camera,
        renderer
    }

    const intr = Interaction.initInteraction(threeObjects, width, height)
    intr.subscribe(i => {
        stateObjects.interactions = i
        renderer.render(scene, camera)
    })

    store.subscribe(() => {
        const rgba = store.getState().mainCanvasReducer.penColor.rgb
        stateObjects.uniforms.penColor.value = new THREE.Vector4(rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a)
        renderer.render(scene, camera)
    })

    return <[IThreeObjects, IStateObjects]>[threeObjects, stateObjects]
}

const setStyle = (element: HTMLElement, width, height) => {
    element.style.width  = `${width}px`
    element.style.height = `${height}px`
    element.style.border = 'thick double turquoise'
}

const setRendererSize = (renderer: THREE.Renderer) => {
    const canvas = renderer.domElement
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    if (w != canvas.width || h != canvas.height) {
        renderer.setSize(w, h)
    }
}
