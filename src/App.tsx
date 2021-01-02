import Stateful from './components/Stateful'
import Stateless from './components/Stateless'
import V1 from './components/V1.vue'
import logo from './assets/logo.png'
import style from './App.module.css'
import { RouterLink, RouterView } from 'vue-router'

export default () => {
  return (
    <div class={style.container}>
      <div>
        <div>
          <img class={style.img} src={logo} />
        </div>
        <p>hello world for tsx</p>
        <div>
          <p>有状态组件</p>
          <Stateless name="张三" age={18} />
        </div>
        <div>
          <p>无状态组件</p>
          <Stateful user={{ name: '李四', age: 20 }} />
        </div>
        <div>
          <p>VUE file 组件</p>
          <V1 />
        </div>
        <div>
          <p>
            <RouterLink to="/page">page</RouterLink>
          </p>
        </div>
      </div>
      <div>
        <RouterView />
      </div>
    </div>
  )
}
