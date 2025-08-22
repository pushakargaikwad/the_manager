export function getUserDefaults(key: string) {
    return window.frappe?.boot?.user?.defaults?.[key]
}