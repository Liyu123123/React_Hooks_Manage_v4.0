import { lazy } from 'react'
/**
 * 菜单路由
 * name: 路由对应的名称
 * role: 路由对应的权限名称
 * component: 路由对应的组件
 * path: 路由对应的path(子路由的path需加上对应所有父级的path)
 * icon: 图标
 * redirect: 决定此路由是否是大菜单，以跳转到对应的子路由
 * children: 大菜单，子路由
 * hidden: 是否隐藏(true隐藏，默认打开)
 */
export const RouteConfig = [
  {
    name: '首页',
    path: '/Dashboard',
    component: lazy(() => import('../views/test/Dashboard')),
    role: '首页权限',
    icon: 'home'
  },
  {
    name: '表格',
    path: '/table',
    component: lazy(() => import('../views/test/tables')),
    role: '表格',
    icon: 'table'
  },
  {
    name: '学校管理',
    path: '/messageManage',
    role: '学校管理',
    icon: 'reconciliation',
    redirect: '/messageManage/test11',
    children: [
      {
        name: '学生管理',
        path: '/messageManage/test11',
        icon: '',
        role: '学校管理-学生管理',
        redirect: '/messageManage/test11/test111',
        children: [
          {
            name: '班级管理',
            path: '/messageManage/test11/test111',
            component: lazy(() => import('../views/messageManage/infopartOne')),
            role: '学校管理-学生管理-班级管理',
            icon: ''
          }
        ]
      },
      {
        name: '教师管理',
        path: '/messageManage/test22',
        redirect: '/messageManage/test22/test222',
        icon: '',
        role: '学校管理-教师管理',
        children: [
          {
            name: '授课管理',
            role: '学校管理-教师管理-授课管理',
            path: '/messageManage/test22/test222',
            component: lazy(() => import('../views/messageManage/infopartTwo')),
            icon: ''
          }
        ]
      }
    ]
  }
]
