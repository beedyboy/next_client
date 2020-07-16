import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CookieService from '../../services/CookieService';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory(); 

const RouteSeller = props => {
  const { layout: Layout, component: Component, ...rest } = props;

//  CookieService

  return (
    <Route
      {...rest}
      render={matchProps => (
        CookieService.get('access_token')
        ?
        <Layout  {...matchProps}>
          <Component/>
        </Layout>
         :

         <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      
      )}
    />
  );
};

RouteSeller.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteSeller;
