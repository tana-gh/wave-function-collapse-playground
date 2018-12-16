import * as React      from 'react'
import { createStore } from 'redux'
import { Provider }    from 'react-redux'
import combined        from '../reducers/combined'

export const store = createStore(combined)

const ProviderWrapper = props =>
    <Provider store={ store }>
        { props.children }
    </Provider>

export default ProviderWrapper
