import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from "../component/Header"

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <div className="h-screen w-screen flex flex-col justify-center">
        <Header/>
        <Component {...props} />
        </div>
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);