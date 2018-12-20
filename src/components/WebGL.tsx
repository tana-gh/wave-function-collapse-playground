import * as React        from 'react'
import * as ThreeObjects from '../models/threeObjects'

interface Props {
    id    : string
    width : number
    height: number
}

export default class WebGL extends React.Component<Props> {
    private readonly id : string
    private isWebGL     : boolean
    private threeObjects: ThreeObjects.IThreeObjects
    private stateObjects: ThreeObjects.IStateObjects

    constructor(props: Props) {
        super(props)
        this.id  = props.id
    }

    componentDidMount() {
        [ this.isWebGL, this.threeObjects, this.stateObjects ] =
                ThreeObjects.setupThreeObjects(document.getElementById(this.id), this.props.width, this.props.height)
    }

    componentWillReceiveProps(nextProps) {
        if (this.isWebGL)
        {
            ThreeObjects.resize(this.threeObjects.renderer, nextProps.width, nextProps.height)
        }
    }

    render() {
        return <div id={ this.id }></div>
    }
}
