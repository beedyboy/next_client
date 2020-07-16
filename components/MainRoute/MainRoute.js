import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory(); 

const MainRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

MainRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default MainRoute;
