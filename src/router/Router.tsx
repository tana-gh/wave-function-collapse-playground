import * as React from 'react'
import {
    HashRouter,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'

import AppBar  from '@material-ui/core/AppBar'
import Button  from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Main    from '../pages/Main'

const Router = () =>
    <HashRouter>
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <TitleButton/>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={ Main }/>
            </Switch>
        </div>
    </HashRouter>

const TitleButton = withRouter(props =>
    <Button style={ titleButtonStyle } onClick={ () => props.history.push('/') }>
        Wave Function Collapse Playground
    </Button>
)

const titleButtonStyle: React.CSSProperties = {
    color: '#FFFFFF'
}

export default Router
