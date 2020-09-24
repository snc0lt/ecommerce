import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedUserRoute = ({ component: Component, ...rest}) => {

  const user = useSelector( state => state.userDetails)
  return (
    <Route { ...rest}
      render= { props => 
        !!user.islogged ? (
          <Component {...props} />
        ) : (
          <Redirect to='/'/>
        )
      }
    />
  )
}


export default ProtectedUserRoute;