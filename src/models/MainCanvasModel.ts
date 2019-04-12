import * as THREE from 'three'
import * as RxOp  from 'rxjs/operators'
import * as R     from 'ramda'

import Subscriptions    from './Subscriptions'
import * as Interaction from './interaction'
import * as shaders     from '@/shaders/shaders'
import detector         from './detector'
import { store }        from '@/store/Provider'

export default class MainCanvasModel {
    scene   : THREE.Scene              | undefined
    camera  : THREE.OrthographicCamera | undefined
    renderer: THREE.WebGLRenderer      | undefined

    isValid      : boolean
    subscriptions: Subscriptions            | undefined
    interaction  : Interaction.IInteraction | undefined
    width        : number        | undefined
    height       : number        | undefined
    mesh         : THREE.Mesh    | undefined
    origin       : THREE.Vector2 | undefined
    uniforms     : any

    constructor(parent: HTMLElement, width: number, height: number) {
        if (detector.webgl) {
            this.init(width, height)
            
            parent.appendChild(this.renderer!.domElement)
            this.setStyle(this.renderer!.domElement, width, height)
            this.setRendererSize()

            this.isValid = true
        }
        else {
            const errorMessage = document.createElement('div')
            parent.appendChild(errorMessage)
            this.setStyle(errorMessage, width, height)
            errorMessage.textContent = 'WebGL not supported'
            
            this.isValid = false
        }
    }

    resizeRenderer(width: number, height: number) {
        this.setStyle(this.renderer!.domElement, width, height)
        this.setRendererSize()
    }

    dispose() {
        this.subscriptions!.unsubscribeAll()
    }

    private init(width: number, height: number) {
        this.width  = width
        this.height = height
        this.origin = new THREE.Vector2()
        this.subscriptions = new Subscriptions()
        this.interaction   = undefined

        this.scene = new THREE.Scene()

        this.camera = new THREE.OrthographicCamera(
            -width  * 0.5,
             width  * 0.5,
             height * 0.5,
            -height * 0.5,
             1.0,
            -1.0
        )
        this.camera.position.set(0.0, 0.0, 0.0)

        this.renderer = new THREE.WebGLRenderer({ antialias: false })
        this.renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 0.0)
        this.renderer.setSize(width, height)

        const geometry = new THREE.PlaneBufferGeometry(256, 256)
        const coords   = new Float32Array(
                            R.pipe(
                                R.splitEvery(3),
                                R.map((vec: number[]) => [Math.sign(vec[0]), Math.sign(vec[1])]),
                                R.unnest)(Array.from(geometry.attributes.position.array)))
        geometry.addAttribute('coord', new THREE.BufferAttribute(coords, 2))

        this.uniforms = {
            penColor: {
                type : 'v4',
                value: this.getPenColor()
            }
        }
        const material = new THREE.ShaderMaterial({
            vertexShader  : shaders.penVShader,
            fragmentShader: shaders.penFShader,
            uniforms      : this.uniforms
        })

        this.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.mesh)

        this.render()

        const interactions = Interaction.createInteractions(this.renderer.domElement, window)
        this.subscriptions.add(
            interactions.subscribe(i => {
                this.interaction = i
            }),
            interactions.pipe(RxOp.filter(i => i.button1))
                .subscribe(i => {
                    if (i.position) {
                        const position = i.position.clone()
                        position.x -= this.renderer!.domElement.width  * 0.5
                        position.y -= this.renderer!.domElement.height * 0.5
                        this.origin = position
                    }
                    this.render()
                }),
            store.subscribe(() => {
                this.uniforms.penColor.value = this.getPenColor()
                this.render()
            })
        )
    }

    private render() {
        this.mesh!.position.set(this.origin!.x, this.origin!.y, 0.0)
        this.renderer!.render(this.scene!, this.camera!)
    }

    private getPenColor() {
        const rgba = store.getState().mainCanvasReducer.penColor.rgb
        return new THREE.Vector4(rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a)
    }

    private setStyle(element: HTMLElement, width: number, height: number) {
        element.style.width  = `${width}px`
        element.style.height = `${height}px`
        element.style.border = 'thick double turquoise'
    }

    private setRendererSize() {
        const canvas = this.renderer!.domElement
        const w = canvas.clientWidth
        const h = canvas.clientHeight

        if (w != canvas.width || h != canvas.height) {
            this.renderer!.setSize(w, h)
            this.setCameraSize(w, h)
        }
    }

    private setCameraSize(width: number, height: number) {
        this.camera!.left   = -width  * 0.5
        this.camera!.right  =  width  * 0.5
        this.camera!.top    =  height * 0.5
        this.camera!.bottom = -height * 0.5
        this.camera!.near   =  1.0
        this.camera!.far    = -1.0
        this.camera!.updateProjectionMatrix()
    }
}
