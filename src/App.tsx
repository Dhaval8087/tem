import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AllEvents, MyEvents } from './features/events';
import Layout from './shared/Layout';
import { About } from './views/about';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        {/* <Helmet
      titleTemplate='React TypeScript Boilerplate - %s'
      defaultTitle='React TypeScript Boilerplate'
    /> */}
        <main>
          <Layout children={(
            <Switch>
              <Route path='/allevents' component={AllEvents} />
              <Route path='/myevents' component={MyEvents} />
              <Route path='/about' component={About} />
            </Switch>
          )} />
        </main>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
