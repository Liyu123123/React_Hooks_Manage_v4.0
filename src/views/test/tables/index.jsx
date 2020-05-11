/**
 * title: Form and Table data binding
 * desc: useFormTable returns a search object after receiving a form instance.
 *
 * title.zh-CN: Form 与 Table 联动
 * desc.zh-CN: useFormTable 接收 form 实例后，会返回 search 对象。
 */
import React from 'react'
import { Button, Col, Form, Input, Row, Table, Select } from 'antd'
import { useFormTable } from '@umijs/hooks'

const { Option } = Select
const getTableData = ({ current, pageSize }, formData) => {
  let query = `page=${current}&size=${pageSize}`
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`
    }
  })

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results
    }))
}
function Nav1() {
  const [form] = Form.useForm()

  const { tableProps, search } = useFormTable(getTableData, {
    defaultPageSize: 5,
    form
  })

  const { type, changeType, submit, reset } = search

  const columns = [
    {
      title: 'name',
      dataIndex: 'name.last'
    },
    {
      title: 'email',
      dataIndex: 'email'
    },
    {
      title: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'gender',
      dataIndex: 'gender'
    },
    {
      width: 350,
      dataIndex: 'action',
      title: '操作',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div>
            <Button type="primary">编辑</Button>
            <Button type="danger">删除</Button>
          </div>
        )
      }
    }
  ]
  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="name" name="name">
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email" name="email">
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone" name="phone">
              <Input placeholder="phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              Reset
            </Button>
            <Button type="link" onClick={changeType}>
              Simple Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  )

  const searchFrom = (
    <div
      style={{
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <Button type="primary" style={{ marginRight: '20px' }}>
          新增
        </Button>
        <Button type="danger">批量删除</Button>
      </div>
      <div>
        <Form layout="inline" form={form}>
          <Form.Item name="gender">
            <Select
              placeholder="请选择"
              style={{ width: 120, marginRight: 16 }}
              onChange={submit}
            >
              <Option value="">all</Option>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="name">
            <Input.Search
              placeholder="enter name"
              style={{ width: 240 }}
              onSearch={submit}
            />
          </Form.Item>
          <Button type="link" onClick={changeType}>
            Advanced Search
          </Button>
        </Form>
      </div>
    </div>
  )
  return (
    <div>
      {type === 'simple' ? searchFrom : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  )
}
export default Nav1
