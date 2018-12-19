import * as THREE from 'three'
import _ = require('lodash')

import { vertexShader, fragmentShader } from '../shaders/shaders'
import detector from './detector'

import { store } from '../store/Provider'

export const createWebGL = (parent: HTMLElement, width, height) => {
    if (detector.webgl) {
        const scene  = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-width * 0.5, width * 0.5, height * 0.5, -height * 0.5, -1.0, 1.0)
        camera.position.set(0.0, 0.0, 0.0)
        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 0.0)
        parent.appendChild(renderer.domElement)
        setStyle(renderer.domElement, width, height)
        setRendererSize(renderer)
        const geometry = new THREE.PlaneGeometry(width, height)
        const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader })
        const mesh     = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        renderer.render(scene, camera)
        return <[boolean, THREE.Renderer]>[true, renderer]
    }
    else {
        const errorMessage = document.createElement('div')
        parent.appendChild(errorMessage)
        setStyle(errorMessage, width, height)
        errorMessage.textContent = 'WebGL not supported'
        return <[boolean, THREE.Renderer]>[false, null]
    }
}

export const resize = (renderer: THREE.Renderer, width, height) => {
    setStyle(renderer.domElement, width, height)
    setRendererSize(renderer)
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
