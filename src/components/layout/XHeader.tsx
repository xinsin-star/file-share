import useUserStore from "../../store/user.ts";
import {Button, Popover} from "antd";
import React from "react";
import UserIndex from "../../views/user/index.tsx";

const XHeader: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const childRef = React.useRef(null);

    const content = (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}>
                <Button variant="text" color="default">设置</Button>
                {useUserStore.getState().user.auth === 'admin' ? <Button variant="text" color="default">获取邀请码</Button> : ''}
                <Button variant="text" color="pink" onClick={() => {
                    useUserStore.getState().resetUser()
                }}>退出登录</Button>
            </div>
        </>
    )

    return (
        <>
            <div style={{
                float: 'right',
                color: '#343535',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}>
                {
                    user.name ?
                        <Popover content={content} trigger="click">
                            <span>{user.name}</span>
                        </Popover>
                        :
                        <span onClick={() => {
                            if (childRef.current) {
                                childRef.current['openDrawer']()
                            }
                        }}>请登录!</span>
                }
                <UserIndex onRef={childRef} />
            </div>
        </>
    )
}
export default XHeader
