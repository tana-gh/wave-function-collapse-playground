import * as React from 'react'
import * as THREE from 'three'
import * as webgl from '../models/webgl'

interface Props {
    id    : string
    width : number
    height: number
}

export default class WebGL extends React.Component<Props> {
    private readonly id: string
    private isWebGL : boolean
    private renderer: THREE.Renderer

    constructor(props: Props) {
        super(props)
        this.id  = props.id
    }

    componentDidMount() {
        [ this.isWebGL, this.renderer ] = webgl.createWebGL(document.getElementById(this.id), this.props.width, this.props.height)
    }

    componentWillReceiveProps(nextProps) {
        if (this.isWebGL)
        {
            webgl.resize(this.renderer, nextProps.width, nextProps.height)
        }
    }

    render() {
        return <div id={ this.id }></div>
    }
}
