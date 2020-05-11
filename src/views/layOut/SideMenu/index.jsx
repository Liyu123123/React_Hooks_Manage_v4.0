import React, { useState, useEffect, useCallback } from 'react'
import { connect, useSelector, shallowEqual, useDispatch } from 'react-redux'
import { setOpenkeys } from '@/store/action'
import Modulecss from './index.module.scss'
import { Menu } from 'antd'
import { Link, withRouter, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { UserOutlined } from '@ant-design/icons'
const { SubMenu } = Menu
function MenuComponent(props) {
  console.log('render')
  const authArr = useSelector((state) => state.auth, shallowEqual)
  const openKeys = useSelector((state) => state.Menu, shallowEqual)
  const dispatch = useDispatch()

  const { RouteConfig } = props
  const { pathname } = useLocation()
  const [ownDefaultSelectedKeys, setOwnDefaultSelectedKeys] = useState([])
  useEffect(() => {
    setOwnDefaultSelectedKeys(pathname)
  }, [pathname])
  const handleSelect = useCallback(
    ({ item, key, keyPath, selectedKeys, domEvent }) => {
      const openKeys = item.props.openKeys
      dispatch(setOpenkeys(openKeys))
    },
    [dispatch]
  )
  const handleOpenChange = useCallback(
    (openKeys) => {
      dispatch(setOpenkeys(openKeys))
    },
    [dispatch]
  )

  const renderMenuList = useCallback(
    (RouteConfig) => {
      return RouteConfig.reduce((pre, item) => {
        if (authArr.includes(item.role) && !item.hidden) {
          if (!_.isEmpty(item.children)) {
            pre.push(
              <SubMenu
                key={item.path}
                title={
                  <span>
                    {item.icon ? <UserOutlined type={item.icon} /> : null}
                    <span>{item.name}</span>
                  </span>
                }
              >
                {renderMenuList(item.children)}
              </SubMenu>
            )
          } else {
            pre.push(
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  {item.icon ? <UserOutlined type={item.icon} /> : null}
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            )
          }
        }

        return pre
      }, [])
    },
    [authArr]
  )
  return (
    <div className={Modulecss.menuWrapper}>
      <div className={Modulecss.IconWrapper}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt=""
        />
        <h1>React通用管理系统</h1>
      </div>

      <Menu
        onSelect={handleSelect}
        onOpenChange={handleOpenChange}
        theme="dark"
        mode="inline"
        selectedKeys={ownDefaultSelectedKeys}
        defaultOpenKeys={openKeys}
      >
        {renderMenuList(RouteConfig)}
      </Menu>
    </div>
  )
}

export default withRouter(MenuComponent)
