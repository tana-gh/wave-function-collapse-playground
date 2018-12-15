import * as  React from 'react'
import { connect } from 'react-redux'
import TextField   from '@material-ui/core/TextField'
import ColorPicker from '../components/ColorPicker'
import PixiApp     from '../components/PixiApp'

import * as A from '../reducers/actions'
import * as C from '../const'

const Main = props =>
    <div>
        <ColorPicker
            color={ props.penColor.hex }
            handleChangePenColor={ color => props.handleChangePenColor(color) }/>
        <TextField label="Width"  type="number" value={ props.width  } onChange={ event => props.handleChangeWidth (event) }/>
        <TextField label="Height" type="number" value={ props.height } onChange={ event => props.handleChangeHeight(event) }/>
        <PixiApp id={ C.inputCanvasId } width={ props.width } height={ props.height }/>
    </div>

const mapStateToProps = state => ({
    ...state.inputCanvasReducer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChangePenColor(color) {
        dispatch(A.penColor(C.inputCanvasId, color))
    },
    handleChangeWidth(event) {
        dispatch(A.canvasSize(C.inputCanvasId, parseInt(event.target.value), ownProps.height))
    },
    handleChangeHeight(event) {
        dispatch(A.canvasSize(C.inputCanvasId, ownProps.width, parseInt(event.target.value)))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
