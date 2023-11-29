import {mapState, useStore} from "vuex"
import {computed} from "vue"

export const useMapState = (state) => {
    // 1.获取实力$store
    const store = useStore()
    // 2.遍历状态数据
    const storeStateFns = mapState(state)
    // 3.存放处理后的数据对象
    const storeState = {}
    // 4.对每个函数进行计算属性处理
    Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({$store: store})
        // 遍历生成这种数据结构 => {name: ref(), age: ref()}
        storeState[fnKey] = computed(fn)
    })
    return storeState
}
