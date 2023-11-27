import {createStore} from 'vuex'

export default createStore({
    state: {
        // 播放列表
        playList: [{
            //专辑信息
            al: {
                id: 71074,
                name: "only my railGun",
                pic: 109951166296227310,
                picUrl: "https://p2.music.126.net/pviFxK7sGSdu3xmWRt9Lgw==/109951166296227310.jpg",
                pic_str: "109951166296227310",
            },
            //歌曲信息
            id: 33255251,
            name: "only my railgun",
        }],
        // 默认下标为0
        playListIndex: 0,
        // 暂停按钮显示
        isBtnShow: true,
    },
    mutations: {
        // 更新暂停按钮显示状态
        updateIsBtnShow(state, value) {
            state.isBtnShow = value
        }
    },
    actions: {},
    modules: {}
})
