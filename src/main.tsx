import * as React    from 'react'
import * as ReactDOM from 'react-dom'
import * as PIXI     from 'pixi.js'
import './sass/style.sass'

const app  = new PIXI.Application(window.innerWidth - 30, window.innerHeight - 30)

class App extends React.Component {
    componentDidMount() {
        document.getElementById('canvas').appendChild(app.view)
    }
    render() {
        return <div id="canvas"></div>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
