import {Button, Form, Input, message} from "antd";
import React, {useImperativeHandle} from "react";
import useUserStore from "../../store/user.ts";
import {invoke} from "@tauri-apps/api/core";
import {UserEntity} from "../../entity/UserEntity.ts";

type FieldType = {
    username?: string;
    password?: string;
    auth?: string;
    inviteCode?: string;
}

const Login = ({setLoginStatus, setOpen, onRef}) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const {setUser} = useUserStore()

    const onConfirm = async () => {
        try {
            await form.validateFields(); // 手动触发验证
            const fieldsValue = form.getFieldsValue();
            invoke("login", {username: fieldsValue["username"], password: fieldsValue["password"]}).then((res) => {
                setUser(res as UserEntity)
                messageApi.success("登录成功")
                setOpen(false)
                form.resetFields()
            }).catch(err => {
                messageApi.warning(err.message)
            })
        } catch (error) {
            console.error(error)
        }
    }

    useImperativeHandle(onRef, () => ({
        onConfirm
    }));
    return (
      <>
          {contextHolder}
          <Form
              form={form}
              name="basic"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              initialValues={{auth: "user", inviteCode: ""}}
              autoComplete="off"
              clearOnDestroy
          >
              <Form.Item<FieldType>
                  label="用户名"
                  name="username"
                  rules={[{required: true, message: '请输入用户名!'}]}
              >
                  <Input/>
              </Form.Item>

              <Form.Item<FieldType>
                  label="密码"
                  name="password"
                  rules={[{required: true, message: '请输入密码!'}]}
              >
                  <Input.Password/>
              </Form.Item>
              <Form.Item>
                  <Button onClick={() => setLoginStatus(false)} color="cyan" variant="text">还没有账号? 点我去注册</Button>
              </Form.Item>
          </Form>
      </>
    )
}
export default Login;
