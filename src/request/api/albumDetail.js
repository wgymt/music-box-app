import http from "@/request/base.js";

export function getMusicDetailList(data) {
    return http({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    }).catch((err) => console.log("getMusicDetailList: ", err)
    )
}

export function getAlbumList(data) {
    return http({
        method: 'GET',
        url: `/playlist/track/all?id=${data}&limit=20&offset=0`
    }).catch((err) => console.log("getAlbumList", err))
}

export function getMusicLyric(data) {
    return http({
        method: 'GET',
        url: `/lyric?id=${data}`
    }).catch((err) => console.log("getMusicLyric", err))
}
