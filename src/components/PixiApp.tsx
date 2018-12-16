import * as React from 'react'
import * as PIXI  from 'pixi.js'

import * as App from '../models/app'

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
        this.app = App.createApp(props.width, props.height)
    }

    componentDidMount() {
        document.getElementById(this.id).appendChild(this.app.view)
    }

    componentWillReceiveProps(nextProps) {
        this.app.renderer.resize(nextProps.width, nextProps.height)
    }

    render() {
        return <div id={ this.id }></div>
    }
}
