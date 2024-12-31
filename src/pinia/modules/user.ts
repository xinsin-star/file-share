import {defineStore} from "pinia"
import {reactive, ref} from "vue";
import {userLogin, userRegister} from "../../api/user.ts";

export const userStore = defineStore('user', () => {
    const userInfo = ref()
    const token = ref()

    const login = (username: string, password: string) => {
        return new Promise((resolve, reject) => {
            userLogin(username, password).then(res => {
                userInfo.value = res.data
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    }
    const register = (username: string, password: string, auth: string, inviteCode: string) => {
        return new Promise((resolve, reject) => {
            userRegister(username, password, auth, inviteCode).then(res => {
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    }
    const isLogin = () => {
        return token.value != null
    }

    return {
        login,
        register,
        token,
        isLogin,
        userInfo
    }
})
export default userStore