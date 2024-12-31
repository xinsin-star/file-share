import request from "@/utils/request.ts";
import CryptoJS from "crypto-js";

export const userLogin = (username: string, password: string) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username: username,
            password: CryptoJS.MD5(password).toString()
        }
    })
}
export const userRegister = (username: string, password: string, auth: string, inviteCode: string) => {
    return request({
        url: '/user/register',
        method: 'put',
        data: {
            username: username,
            password: CryptoJS.MD5(password).toString(),
            auth: auth,
            inviteCode: inviteCode
        }
    })
}