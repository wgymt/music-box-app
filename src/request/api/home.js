import http from "@/request/base.js";

export function getBanners() {
    return http({
        method: "GET",
        url: "/banner?type=2"
    }).catch((err) => console.log("getBanners: ", err))
}

export function getMusicList() {
    return http({
        method: "GET",
        url: "/personalized?limit=10"
    }).catch((err) => console.log("getMusicList: ", err))
}
