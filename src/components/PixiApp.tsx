import * as React from 'react'
import * as PIXI  from 'pixi.js'

interface Props {
    id    : string
    width : number
    height: number
}

export default class PixiApp extends React.Component<Props> {
    private app: PIXI.Application
    private id : string

    constructor(props: Props) {
        super(props)
        this.app = new PIXI.Application(props.width, props.height)
        this.id  = props.id
    }

    componentDidMount() {
        document.getElementById(this.id).appendChild(this.app.view)
    }

    render() {
        return <div id={ this.id }></div>
    }
}
