import React from 'react'
import {
  Route as ReactDOMroute,
  RouteProps as ReactDOMrouteProps,
  Redirect
} from 'react-router-dom'

import { useAuth } from '../hooks/authContext'

interface RouteProps extends ReactDOMrouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const { user } = useAuth()

  return (
    <ReactDOMroute
      {...props}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

export default Route
