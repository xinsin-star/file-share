import {isPermissionGranted, requestPermission, sendNotification} from "@tauri-apps/plugin-notification";

export const calculateFileSize = (size: number) => {
    let retSize: string = ''
    let fileKb = size / 1000
    if (fileKb <= 999) {
        retSize = fileKb.toFixed(2) + "KB"
    } else {
        fileKb = fileKb / 1000
        if (fileKb <= 999) {
            retSize = fileKb.toFixed(2) + "MB"
        } else {
            fileKb = fileKb / 1000
            retSize = fileKb.toFixed(2) + "GB"
        }
    }
    return retSize
}

export const sendNotifications = async (title: string, body: string) => {
    debugger
    // 你有发送通知的权限吗？
    let permissionGranted = await isPermissionGranted();

    // 如果没有，我们需要请求它
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
    }

    // 一旦获得许可，我们就可以发送通知
    if (permissionGranted) {
        sendNotification({ title: title, body: body });
    }
}
