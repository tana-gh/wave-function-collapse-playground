import * as React      from 'react'
import MainCanvasModel from '../models/MainCanvasModel'

interface IProps {
    id    : string
    width : number
    height: number
}

export default class WebGL extends React.Component<IProps> {
    private readonly id : string
    private isWebGL     : boolean
    private model       : MainCanvasModel

    constructor(props: IProps) {
        super(props)
        this.id  = props.id
    }

    componentDidMount() {
        this.model = new MainCanvasModel(document.getElementById(this.id)!, this.props.width, this.props.height)
    }

    componentWillUnmount() {
        this.model.dispose()
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (this.model.isValid)
        {
            this.model.resizeRenderer(nextProps.width, nextProps.height)
        }
    }

    render() {
        return <div id={ this.id }></div>
    }
}
