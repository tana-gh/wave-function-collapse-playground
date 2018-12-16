import * as React from 'react'
import * as PIXI  from 'pixi.js'

interface Props {
    id    : string
    width : number
    height: number
}

export default class PixiApp extends React.Component<Props> {
    private readonly id : string
    private app: PIXI.Application

    constructor(props: Props) {
        super(props)
        this.id  = props.id
        this.app = new PIXI.Application(props.width, props.height)
    }

    componentDidMount() {
        document.getElementById(this.id).appendChild(this.app.view)
    }

    componentWillReceiveProps(nextProps) {
        const element = document.getElementById(this.id)
        element.removeChild(this.app.view)
        this.app.destroy(false, true)
        
        this.app = new PIXI.Application(nextProps.width, nextProps.height)
        element.appendChild(this.app.view)
    }

    render() {
        return <div id={ this.id }></div>
    }
}
