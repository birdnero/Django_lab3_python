import type { MessageInstance } from "antd/es/message/interface";
import { create } from "zustand";

type MessageStateT = {
    messageApi: null | MessageInstance;
    setMessageApi: (msgApi: MessageInstance) => void
}

type TokenStateT = {
    token: string;
    setToken: (newToken: string) => void
}

type InFirstT = {
    inFirst: boolean;
    setInFirst: (newValue: boolean) => void
}

export const useMessage = create<MessageStateT>(set => ({
    messageApi: null,
    setMessageApi: (msgApi: MessageInstance) => set({ messageApi: msgApi })
}))

export const useToken = create<TokenStateT>(set => ({
    token: (() => {
        const accessToken = localStorage.getItem("access-token")
        return accessToken ? accessToken : ""
    })(),
    setToken: newToken => {
        localStorage.setItem("access-token", newToken)
        set({ token: newToken })
    }
}))


export const useInFirst = create<InFirstT>(set => ({
    inFirst: true,
    setInFirst: (newValue: boolean) => set({ inFirst: newValue })
}))
