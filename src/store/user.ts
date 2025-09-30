import { create } from 'zustand';
import {UserEntity} from "../entity/UserEntity.ts";
import { persist } from 'zustand/middleware';
import {immer} from "zustand/middleware/immer";

interface UserState {
    user: UserEntity;
    setUser: (newUser: UserEntity) => void;
    setToken: (token: string) => void;
    resetUser: () => void;
}
const useUserStore = create<UserState>()(
    persist(
        immer(setState => ({
            user: {},
            // 整体替换用户对象
            setUser: (newUser) => setState({ user: newUser }),
            setToken: (token) => setState({ token: token }),
            resetUser: () => setState({user: {}})
        })),
        { name: 'user-storage' }
    )
)

export default useUserStore;
