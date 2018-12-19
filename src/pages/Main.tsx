import * as  React from 'react'
import { connect } from 'react-redux'
import TextField   from '@material-ui/core/TextField'
import ColorPicker from '../components/ColorPicker'
import WebGL       from '../components/WebGL'

import * as A from '../reducers/actions'
import * as C from '../const'

class Main extends React.Component<any, any> {
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
                <WebGL
                    id={ C.mainCanvasId } width={ this.props.width } height={ this.props.height }/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.mainCanvasReducer
})

const mapDispatchToProps = dispatch => ({
    handleChangePenColor(color) {
        dispatch(A.penColor(C.mainCanvasId, color))
    },
    handleChangeCanvasSize(width, height) {
        dispatch(A.canvasSize(C.mainCanvasId, width, height))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
