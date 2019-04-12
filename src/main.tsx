import '@/utils/font'
import '@/stylus/style.styl'

import * as React    from 'react'
import * as ReactDOM from 'react-dom'
import Provider      from './store/Provider'
import Router        from './router/Router'

ReactDOM.render(
    <Provider>
        <Router/>
    </Provider>
    , document.getElementById('root'))
