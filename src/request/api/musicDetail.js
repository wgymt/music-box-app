import http from "@/request/base.js";

export function getMusicDetailList(data) {
    return http({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}

export function getMusicList(data) {
    return http({
        method: 'GET',
        url: `/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}
