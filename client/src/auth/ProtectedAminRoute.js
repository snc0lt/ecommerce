import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedAdminRoute = ({ component: Component, ...rest}) => {

  const user = useSelector( state => state.userDetails)
  return (
    <Route { ...rest}
      render= { props => 
        !!user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/'/>
        )
      }
    />
  )
}


export default ProtectedAdminRoute;