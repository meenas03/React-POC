import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home'

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router