import * as  React from 'react'
import PixiApp     from '../components/PixiApp'
import ColorPicker from '../components/ColorPicker'

const Main = () =>
    <div>
        <ColorPicker/>
        <PixiApp id="input-canvas"  width={ 100 } height={ 100 }/>
        <PixiApp id="output-canvas" width={ 100 } height={ 100 }/>
    </div>

export default Main
