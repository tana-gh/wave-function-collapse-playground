import * as THREE from 'three'
import * as Rx    from 'rxjs'
import * as RxOp  from 'rxjs/operators'
import _ = require('lodash')

import * as Interaction from './interaction'
import * as shaders        from '../shaders/shaders'
import detector            from './detector'
import { store }           from '../store/Provider'
import { BufferAttribute } from 'three';

export interface IThreeObjects {
    readonly scene   : THREE.Scene
    readonly camera  : THREE.OrthographicCamera
    readonly renderer: THREE.Renderer
}

export interface IStateObjects {
    interaction: Interaction.IInteraction | undefined
    width      : number
    height     : number
    mesh       : THREE.Mesh
    origin     : THREE.Vector2
    uniforms   : any
}

export const setupThreeObjects = (parent: HTMLElement, width: number, height: number) => {
    if (detector.webgl) {
        const [threeObjects, stateObjects] = createThreeObjects(width, height)
        const { renderer } = threeObjects
        parent.appendChild(renderer.domElement)
        setStyle(renderer.domElement, width, height)
        setRendererSize(threeObjects)
        return <[boolean, IThreeObjects, IStateObjects]>[true, threeObjects, stateObjects]
    }
    else {
        const errorMessage = document.createElement('div')
        parent.appendChild(errorMessage)
        setStyle(errorMessage, width, height)
        errorMessage.textContent = 'WebGL not supported'
        return <[boolean, null, null]>[false, null, null]
    }
}

export const resize = (threeObjects: IThreeObjects, width: number, height: number) => {
    setStyle(threeObjects.renderer.domElement, width, height)
    setRendererSize(threeObjects)
}

const createThreeObjects = (width, height) => {
    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(
        -width  * 0.5,
         width  * 0.5,
         height * 0.5,
        -height * 0.5,
         1.0,
        -1.0
    )
    camera.position.set(0.0, 0.0, 0.0)

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 0.0)
    renderer.setSize(width, height)

    const geometry = new THREE.PlaneBufferGeometry(256, 256)
    const coords   = new Float32Array(
                        _(geometry.attributes.position.array)
                            .chunk(3)
                            .map(vec => [Math.sign(vec[0]), Math.sign(vec[1])])
                            .flatMap()
                            .value())
    geometry.addAttribute('coord', new BufferAttribute(coords, 2))

    const uniforms = {
        penColor: {
            type : 'v4',
            value: getPenColor()
        }
    }
    const material = new THREE.ShaderMaterial({
        vertexShader  : shaders.penVShader,
        fragmentShader: shaders.penFShader,
        uniforms
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const threeObjects: IThreeObjects = {
        scene,
        camera,
        renderer
    }

    const stateObjects: IStateObjects = {
        interaction: undefined,
        width,
        height,
        mesh,
        origin: new THREE.Vector2(),
        uniforms
    }

    render(threeObjects, stateObjects)

    const interactions = Interaction.createInteractions(threeObjects.renderer.domElement, window)
    interactions.subscribe(i => {
        stateObjects.interaction = i
    })
    interactions.pipe(RxOp.filter(i => i.button1))
        .subscribe(i => {
            if (i.position) {
                const position = i.position.clone()
                position.x -= renderer.domElement.width  * 0.5
                position.y -= renderer.domElement.height * 0.5
                stateObjects.origin = position
            }
            render(threeObjects, stateObjects)
        })

    store.subscribe(() => {
        stateObjects.uniforms.penColor.value = getPenColor()
        render(threeObjects, stateObjects)
    })

    return <[IThreeObjects, IStateObjects]>[threeObjects, stateObjects]
}

const render = (threeObjects: IThreeObjects, stateObjects: IStateObjects) => {
    stateObjects.mesh.position.set(stateObjects.origin.x, stateObjects.origin.y, 0.0)
    threeObjects.renderer.render(threeObjects.scene, threeObjects.camera)
}

const getPenColor = () => {
    const rgba = store.getState().mainCanvasReducer.penColor.rgb
    return new THREE.Vector4(rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a)
}

const setStyle = (element: HTMLElement, width: number, height: number) => {
    element.style.width  = `${width}px`
    element.style.height = `${height}px`
    element.style.border = 'thick double turquoise'
}

const setRendererSize = (threeObjects: IThreeObjects) => {
    const canvas = threeObjects.renderer.domElement
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    if (w != canvas.width || h != canvas.height) {
        threeObjects.renderer.setSize(w, h)
        setCameraSize(threeObjects, w, h)
    }
}

const setCameraSize = (threeObjects: IThreeObjects, width: number, height: number) => {
    const camera = threeObjects.camera
    camera.left   = -width  * 0.5
    camera.right  =  width  * 0.5
    camera.top    =  height * 0.5
    camera.bottom = -height * 0.5
    camera.near   =  1.0
    camera.far    = -1.0
    camera.updateProjectionMatrix()
}
