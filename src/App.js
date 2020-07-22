import * as React from 'react';
import AppHeader from './components/AppHeader';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';
import { ImplicitCallback } from '@okta/okta-react';
import PreviewDisplay from './views/LeagueDisplay';
import { doFetch } from './shared/Util';
import LeaguePage from './views/LeaguePage';


const App = () => {
  const [data, setData] = React.useState();
    
    async function getData() {
        setData(await doFetch('GET', '/leagues'));
    };

    React.useEffect(() => {
        getData();
    }, []);

    console.log(data);

  function renderPreviewDisplay() {
    return data && <PreviewDisplay data={data} getData={getData}/>
  }

  function renderLeaguePage() {
    return <LeaguePage data={data}/>
  }

  return (<React.Fragment>
    <GlobalStyle/>
    <div style={{display: 'inline'}}>
      <AppHeader />
      <Route exact path="/" render={renderPreviewDisplay} />
      <Route exact path="/league/:id" component={renderLeaguePage} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </div>
  </React.Fragment>)
};

export default (App);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;