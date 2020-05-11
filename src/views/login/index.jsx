import React from 'react'
import LoginCSS from './index.module.scss'
import loginLogo from '../../assets/images/logo.png'
import { Form, Input, Button, Checkbox } from 'antd'
import { useHistory } from 'react-router-dom'
function Login() {
  const Historyapi = useHistory()
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 }
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    sessionStorage.setItem('accountId', '1')
    Historyapi.replace('/Dashboard')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={LoginCSS.loginWrapper}>
      <div className={LoginCSS.header}>
        <div className={LoginCSS.headerContent}>
          <img className={LoginCSS.imgStyle} src={loginLogo} alt="" />
          <span className={LoginCSS.text}>后台管理系统</span>
        </div>
      </div>
      <div className={LoginCSS.body}>
        <div className={LoginCSS.backLogo}></div>
        <div className={LoginCSS.loginForm}>
          <h2 className={LoginCSS.FormTxt}>用户登录</h2>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
