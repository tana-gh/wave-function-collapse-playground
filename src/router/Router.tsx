import * as React from 'react'
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom'

import Header from '@/pages/Header'
import Main   from '@/pages/Main'

const Router = props =>
    <HashRouter>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={ Main }/>
            </Switch>
        </div>
    </HashRouter>

export default Router
