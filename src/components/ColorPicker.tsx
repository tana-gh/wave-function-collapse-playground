import * as  React      from 'react'
import { SketchPicker } from 'react-color'

const ColorPicker = props =>
    <SketchPicker
        color={ props.color }
        onChangeComplete={ color => props.handleChangePenColor(color) }/>

export default ColorPicker
