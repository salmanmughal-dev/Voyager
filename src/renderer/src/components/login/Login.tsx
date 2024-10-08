import { EyeOutlined, CloseOutlined, EyeFilled, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import 'antd/dist/reset.css'
import { useNavigate } from 'react-router-dom'
import User from '@renderer/types/system.types'

const Login = (): JSX.Element => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values: User): void => {
    const user = window.electron.store.get('user')

    if (values.username === user.username && values.password === user.password) {
      message.success({
        content: 'Login successful',
        icon: <EyeFilled style={{ color: 'orange' }} />
      })
      navigate('/dashboard')
    } else {
      message.error({
        content: 'Username or password is incorrect',
        icon: <CloseOutlined style={{ color: 'orange' }} />
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-t from-orange-600 via-orange-200 to-gray-300">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-lg shadow-lg w-[400px] h-[350px]">
          <div className="mb-4">
            <h1
              className="relative w-[max-content] font-bold
before:absolute before:inset-0 before:animate-typewriter
before:bg-[#eddecd]
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret
after:bg-black text-3xl text-center text-black "
            >
              Welcome to Voyager
            </h1>
          </div>
          <Form
            form={form}
            name="horizontal_login"
            className="flex flex-col gap-5 items-center justify-center"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              key={'username'}
              name="username"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              key={'password'}
              className="w-full"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            >
              <Input prefix={<EyeOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-[320px] bg-orange-400 hover:!bg-orange-500"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  Log in
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default Login
