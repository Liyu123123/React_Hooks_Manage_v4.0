import React, { Fragment, useEffect } from 'react'
import HomePage from './views/HomePage'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthArr } from '@/store/action'
import { hot } from 'react-hot-loader/root'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setAuthArr([
        '表格',
        '学校管理',
        '学校管理-学生管理',
        '学校管理-学生管理-班级管理',
        '学校管理-教师管理',
        '学校管理-教师管理-授课管理'
      ])
    )
  }, [dispatch])
  return (
    <Fragment>
      <Router basename="/react-admin-template">
        <HomePage></HomePage>
      </Router>
    </Fragment>
  )
}

const WrapperApp = process.env.NODE_ENV === 'development' ? hot(App) : App
export default WrapperApp
