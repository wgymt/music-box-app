import http from "@/request/base.js";

export function getMusicDetailList(data) {
    return http({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}
