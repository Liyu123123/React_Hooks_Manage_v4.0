import React, { Fragment } from 'react'
import MyLayOut from './layOut/LayOut'
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useLocation
} from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'
import { flattern } from '@/assets/utils/helper'
import NoMatch from '@/components/NoMatch'
import Login from './login'
import { RouteConfig } from '@/route'
const FlatternRouteConfig = flattern(RouteConfig, 'children')
const whiteRoutePaths = ['/', '/login', '/SinglePage']
function HomePage() {
  const authArr = useSelector((state) => state.auth, shallowEqual)
  const { pathname } = useLocation()
  const menuRoute = FlatternRouteConfig.find((v) => v.path === pathname)
  let targetRouter = null
  if (menuRoute) {
    targetRouter = authArr.some((v) => v === menuRoute.role)
  }
  console.log(targetRouter)
  console.log(pathname)
  if (targetRouter || whiteRoutePaths.includes(pathname)) {
    return (
      <Fragment>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              return sessionStorage.getItem('accountId') ? (
                <MyLayOut />
              ) : (
                <Redirect to="/login" />
              )
            }}
          />
        </Switch>
      </Fragment>
    )
  } else {
    return <Route component={NoMatch}></Route>
  }
}

export default withRouter(HomePage)
