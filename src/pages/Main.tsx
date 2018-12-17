import * as  React from 'react'
import { connect } from 'react-redux'
import TextField   from '@material-ui/core/TextField'
import ColorPicker from '../components/ColorPicker'
import PixiApp     from '../components/PixiApp'

import * as A from '../reducers/actions'
import * as C from '../const'

class Main extends React.Component<any, any> {
    private inputCanvas: PixiApp

    constructor(props) {
        super(props)
        this.state = {
            width : props.width,
            height: props.height
        }
    }

    render() {
        return (
            <div>
                <ColorPicker
                    color={ this.props.penColor.rgb }
                    handleChangePenColor={ color => this.props.handleChangePenColor(color) }/>
                <TextField
                    label="Width"  type="number" value={ this.state.width }
                    onChange={ e => this.setState({ width: parseInt(e.target.value) }) }
                    onBlur={ () => { this.props.handleChangeCanvasSize(this.state.width, this.state.height) } }/>
                <TextField
                    label="Height" type="number" value={ this.state.height }
                    onChange={ e => this.setState({ height: parseInt(e.target.value) }) }
                    onBlur={ () => { this.props.handleChangeCanvasSize(this.state.width, this.state.height) } }/>
                <PixiApp
                    ref={ ref => this.inputCanvas = ref }
                    id={ C.inputCanvasId } width={ this.props.width } height={ this.props.height }/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.inputCanvasReducer
})

const mapDispatchToProps = dispatch => ({
    handleChangePenColor(color) {
        dispatch(A.penColor(C.inputCanvasId, color))
    },
    handleChangeCanvasSize(width, height) {
        dispatch(A.canvasSize(C.inputCanvasId, width, height))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
