import {Button, Drawer, Space} from "antd";
import React, {useImperativeHandle, useState} from "react";
import Register from "./register.tsx";
import Login from "./login.tsx";

interface LoginProps {
    onRef?: React.RefObject<null>
}

const UserIndex: React.FC<LoginProps> = ({onRef}) => {
    const [open, setOpen] = useState(false)
    // 注册还是登录页面
    const [isLogin, setIsLogin] = useState(true)
    const loginRef = React.useRef(null);
    const registerRef = React.useRef(null);

    const onClose = () => {
        setOpen(false)
    }
    const onConfirm = async () => {
        if (isLogin) {
            loginRef.current['onConfirm']()
        }
    }

    /**
     * 对外开放的方法
     * 通过ref调用
     */
    const openDrawer = () => {
        setOpen(true)
    };
    useImperativeHandle(onRef, () => ({
        openDrawer
    }));

    return (
        <>
            <Drawer
                title={isLogin ? "登 录" : "注 册"}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose} variant="text" color="default">取 消</Button>
                        <Button onClick={onConfirm} variant="text" color="pink">{isLogin ? "登 录" : "注 册"}</Button>
                    </Space>
                }
            >
                <Space>
                    {
                        isLogin ?
                            <Login setLoginStatus={setIsLogin} setOpen={setOpen} onRef={loginRef} />
                            :
                            <Register setLoginStatus={setIsLogin} setOpen={setOpen} onRef={registerRef}/>
                    }
                </Space>
            </Drawer>
        </>
    )
};
export default UserIndex;
