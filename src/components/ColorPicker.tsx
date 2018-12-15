import * as  React      from 'react'
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
    '#EEEEEE',
    '#000000'
]

const ColorPicker = props =>
    <CirclePicker
        colors={ colors }
        color={ props.color }
        onChangeComplete={ color => props.handleChangePenColor(color) }/>

export default ColorPicker
