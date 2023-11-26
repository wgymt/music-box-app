import Sticky, {Button, Swipe, SwipeItem} from "vant";

// 把需要导入的组件,放到数组中
let plugins = [
    Swipe, SwipeItem, Button, Sticky
]

export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}
