import * as  React      from 'react'
import { connect }      from 'react-redux'
import { CirclePicker } from 'react-color'

const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#000000',
    '#EEEEEE'
]

const ColorPicker = props =>
    <CirclePicker colors={ colors } onChangeComplete={ color => props.handleChangeComplete(color) }/>

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    handleChangeComplete(color) {
        dispatch({
            type: 'PEN_COLOR',
            color
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)
