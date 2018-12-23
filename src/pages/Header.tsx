import * as React     from 'react'
import { withRouter } from 'react-router-dom'

import AppBar  from '@material-ui/core/AppBar'
import Button  from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

const Header = () =>
    <AppBar position="sticky">
        <Toolbar>
            <TitleButton/>
        </Toolbar>
    </AppBar>

const TitleButton = withRouter(props =>
    <Button style={ titleButtonStyle } onClick={ () => props.history.push('/') }>
        GPU Oekaki
    </Button>
)

const titleButtonStyle: React.CSSProperties = {
    color        : '#FFFFFF',
    fontSize     : '1.5rem',
    textTransform: 'none'
}

export default Header
