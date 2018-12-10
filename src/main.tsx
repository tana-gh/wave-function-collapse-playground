import * as React    from 'react'
import * as ReactDOM from 'react-dom'
import './sass/style.sass'

class App extends React.Component {
    render() {
        return <h1>Hello, world!</h1>
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
