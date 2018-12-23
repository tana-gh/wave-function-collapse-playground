import * as React        from 'react'
import * as ThreeObjects from '../models/threeObjects'

interface IProps {
    id    : string
    width : number
    height: number
}

export default class WebGL extends React.Component<IProps> {
    private readonly id : string
    private isWebGL     : boolean
    private threeObjects: ThreeObjects.IThreeObjects | null
    private stateObjects: ThreeObjects.IStateObjects | null

    constructor(props: IProps) {
        super(props)
        this.id  = props.id
    }

    componentDidMount() {
        [this.isWebGL, this.threeObjects, this.stateObjects] =
                ThreeObjects.setupThreeObjects(document.getElementById(this.id)!, this.props.width, this.props.height)
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (this.isWebGL)
        {
            ThreeObjects.resize(this.threeObjects!, nextProps.width, nextProps.height)
        }
    }

    render() {
        return <div id={ this.id }></div>
    }
}
