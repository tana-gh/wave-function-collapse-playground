import * as THREE from 'three'
import { IThreeObjects } from './threeObjects'
import * as Rx           from 'rxjs'
import * as RxOp         from 'rxjs/operators'

const possCount = 1000

export interface IInteractions {
    poss   : THREE.Vector2[]
    button1: boolean
    button2: boolean
}

export const initInteraction = (threeObjects: IThreeObjects, width: number, height: number) => {
    const interactions = {
        poss   : [],
        button1: false,
        button2: false
    }

    const canvas = threeObjects.renderer.domElement

    const mouseEvents: Rx.Observable<MouseEvent> = Rx.merge(
        <Rx.Observable<MouseEvent>>Rx.fromEvent(canvas, 'mouseup'  ),
        <Rx.Observable<MouseEvent>>Rx.fromEvent(canvas, 'mousedown'),
        <Rx.Observable<MouseEvent>>Rx.fromEvent(canvas, 'mousemove')
    )
    return Rx.pipe(
        RxOp.map(updateInteractions(interactions, width, height)),
        RxOp.merge(Rx.of(interactions))
    )(mouseEvents)
}

const updateInteractions =
        (interactions: IInteractions, width: number, height: number) => (e: MouseEvent) => {
    
    while (interactions.poss.length > possCount) {
        interactions.poss.pop()
    }
    
    const conv = (offset: number, width: number) => offset / width * 2.0 - 1.0
    const pos = new THREE.Vector2(conv(e.offsetX, width), conv(e.offsetY, height))
    
    interactions.poss.unshift(pos)
    interactions.button1 = (e.buttons & 0x1) !== 0
    interactions.button2 = (e.buttons & 0x2) !== 0

    return interactions
}
