import React from 'react'
import { Dropdown, Menu, Modal, message, Avatar } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
function TopRightDrop(props) {
  const handleLogOut = () => {
    Modal.confirm({
      title: '登出',
      content: '确认登出?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        doLogOut()
      },
      onCancel: () => {
        message.info('取消登出')
      }
    })
  }

  const doLogOut = () => {
    setTimeout(() => {
      sessionStorage.clear()
      message.success('成功登出')
      props.history.push('/login')
    })
  }
  const renderRoleDrop = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Dashboard">首页</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleLogOut}>
          <span>退出</span>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu}>
        <span style={{ cursor: 'pointer', paddingLeft: '10px' }}>
          <span>超级管理员</span>
        </span>
      </Dropdown>
    )
  }
  return (
    <div>
      <div
        style={{
          float: 'right',
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<UserOutlined />}
        />
        {renderRoleDrop()}
      </div>
    </div>
  )
}

export default withRouter(TopRightDrop)
