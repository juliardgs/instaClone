import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={Feed} /> {/* / vai chamar o component feed */}
            <Route path="/new" component={New} /> {/* // rota /new vai chamar o component new */}
        </Switch>
        
    );
}
export default Routes;
