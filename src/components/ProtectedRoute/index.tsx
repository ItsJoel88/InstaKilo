import React, { ElementType } from "react"
import { Redirect, Route } from "react-router-dom"

interface ProtectedRouteProps {
  Component: ElementType
  path: string
  exact?: true
}

function ProtectedRoute(props:ProtectedRouteProps) {
  const TOKEN = import.meta.env.SNOWPACK_PUBLIC_COOKIE_NAME
  const { Component, path, exact } = props
  
  return (
    <>
      {
        localStorage[TOKEN] ? 
          <Route path={path} exact={exact} render={(props) => 
            <Component {...props} />
          } />
        :
          <Redirect to="/login" />
      }
    </>
  )
}

export default ProtectedRoute