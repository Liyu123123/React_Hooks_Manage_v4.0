import React, { useState, useCallback, useEffect } from 'react'
import './antd.scss'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import AppMain from './AppMain'
import { RouteConfig } from '@/route'
import { withRouter, useLocation } from 'react-router-dom'
import MenuComponent from './SideMenu'
import TagsView from '@/components/TagsView'
import MyBreadcrumb from './MyBreadcrumb'
import TopRightDrop from './TopRightDrop'
import { connect } from 'react-redux'
import { addVisitiedViews } from '@/store/action'
const { Header, Sider, Content } = Layout
function findCurrentTagName(pathname) {
  let currentName = ''
  const itera = (list) => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i]
      if (element.path !== pathname) {
        if (element.hasOwnProperty('children')) {
          itera(element.children)
        }
      } else {
        if (element.hasOwnProperty('component')) {
          // 避免添加二级菜单到TagsView上
          currentName = element.name
        }
      }
    }
  }
  itera(RouteConfig)
  return currentName
}
function LayoutManage(props) {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])
  const { pathname, state } = useLocation()
  useEffect(() => {
    const { addVisitiedViews } = props
    const tagName = findCurrentTagName(pathname)
    addVisitiedViews({
      routeName: tagName,
      path: pathname,
      state: state
    })
  }, [props, pathname, state])
  return (
    <div style={{ height: '100%' }}>
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <MenuComponent RouteConfig={RouteConfig} />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggle
              }
            )}
            <MyBreadcrumb />
            <div style={{ float: 'right', marginRight: '20px' }}>
              <TopRightDrop></TopRightDrop>
            </div>
          </Header>
          <TagsView />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <AppMain />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
const mapDispatchToProps = {
  addVisitiedViews
}
export default withRouter(connect(null, mapDispatchToProps)(LayoutManage))
