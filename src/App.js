import * as React from 'react';
import AppHeader from './components/AppHeader';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';
import { ImplicitCallback } from '@okta/okta-react';
import PreviewDisplay from './views/PreviewDisplay';
import { doFetch } from './shared/Util';
import LeaguePage from './views/LeaguePage';
import useQuery from './components/Hooks/useQuery';
import { H2 } from './shared/ViewUtil';

const App = () => {

  const {data, loading, error, reQuery} = useQuery('/leagues');

  function renderPreviewDisplay() {

    if (error) {
      return <H2>Error</H2>;
    }
    if (loading) {
      return <H2>Loading</H2>;
    }
    return data && <PreviewDisplay data={data} getData={() => reQuery()}/>
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