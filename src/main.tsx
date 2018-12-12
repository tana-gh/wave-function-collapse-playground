import './sass/style.sass'

import * as React    from 'react'
import * as ReactDOM from 'react-dom'
import PixiApp       from './components/PixiApp'

ReactDOM.render(<PixiApp id="main-canvas" width={ 100 } height={ 100 }/>, document.getElementById('root'))
