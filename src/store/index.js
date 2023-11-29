import {createStore} from 'vuex'
import {getMusicLyric} from "@/request/api/albumDetail.js";

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
            ar: [{name: '肥陈'}],
            //歌曲信息
            id: 33255251,
            name: "only my railGun",
        }],
        // 默认下标为0
        playListIndex: 0,
        // 暂停按钮显示
        isBtnShow: true,
        // 单曲详情页展示与否
        detailShow: false,
        // 歌词
        lyricList: {},
        // 当前播放歌词时间节点
        currentTime: '',
    },
    mutations: {
        // 更新暂停按钮显示状态
        updateIsBtnShow(state, aBoolean) {
            state.isBtnShow = aBoolean
        },
        // 更新播放栏歌单列表
        updatePlayList(state, arr) {
            state.playList = arr
        },
        // 更新列表中歌曲的下标
        updatePlayListIndex(state, idx) {
            state.playListIndex = idx
        },
        // 更行单曲详情页显示状态
        updateDetailShow(state) {
            state.detailShow = !state.detailShow
        },
        // 更新代码
        updateLyricList(state, lyrics) {
            state.lyricList = lyrics
        },
        // 更新当前播放歌词时间节点
        updateCurrentTIme(state, time) {
            state.currentTime = time
        }
    },
    actions: {
        async getLyric(ctx, songId) {
            const res = await getMusicLyric(songId);
            ctx.commit("updateLyricList", res.data.lrc)
        }
    },
    modules: {}
})
