import {Button} from "antd";
import React from "react";

const Register = ({setLoginStatus, setOpen, onRef}) => {
  return (
      <>
          <Button onClick={() => setLoginStatus(true)} color="cyan" variant="text">点我返回登录</Button>
      </>
  )
}

export default Register
