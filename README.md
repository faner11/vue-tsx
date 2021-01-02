# VUE 3.0 tsx 使用

VUE 3.0带了一些振奋人心的更新，最让人激动的莫过于**composition api**，使用composition api我们可以用一种全新的逻辑去组织代码，让代码变得更易读，更好维护。
在使用VUE 3 的过程中，我们发现使用composition api，jsx/tsx无疑是更好的选择，这一篇就详细讲述jsx/tsx在vue中地各种使用，处于工程化考虑这个教程使用tsx。
- node >= 12

## vite 创建项目
vue 3.0 一定是[vite](https://vitejs.dev/)构建啦，那种丝滑的体验真的是让人与欲罢不能，再也不去想某webp**了。
```shell
# npm
npm init @vitejs/app my-vue-app --template vue

cd my-vue-app

npm i
# or yarn
yarn create @vitejs/app my-vue-app --template vue

cd my-vue-app

yarn
```

ps：本篇书写于2021年1月2日 15:30分，在几个小时前vite 2.0 bata版本发布，所以这次我们使用的当然是新鲜热乎的vite 2.0版本。尤雨溪大大节假日都这么拼，学习速度注定跟不上尤大更新速度了。

## 工程化
### ESLint
安装eslint`yarn add eslint -D`

生成eslint配置`node_modules/.bin/eslint --init`,以下是我的建议配置，可根据个人爱好修改
- How would you like to use ESLint? 
    + To check syntax only
    + To check syntax and find problems
    + To check syntax, find problems, and enforce code style **选择此项**
- What type of modules does your project use?
    + JavaScript modules (import/export) **选择此项**
    + CommonJS (require/exports)
    + None of these  
- Which framework does your project use？
    + React
    + Vue.js **选择此项**
    + None of these        
- Does your project use TypeScript? 
    + No
    + Yes **选择此项**
- Where does your code run? 
    + Browser **选择此项**
    + Node
- How would you like to define a style for your project?
    + Use a popular style guide **选择此项**
    + Answer questions about your style
    + Inspect your JavaScript file(s)
- Which style guide do you want to follow? 
    + Airbnb: https://github.com/airbnb/javascript
    + Standard: https://github.com/standard standard **选择此项**
    + Google: https://github.com/google/eslint-config-google
- What format do you want your config file to be in?
    + JavaScript **选择此项**
    + YAML
    + JSON
- Would you like to install them now with npm?      
    + No
    + Yes **选择此项**


#### eslint于vue3.0兼容问题休息

The template root requires exactly one element.eslintvue/no-multiple-template-root，修复方法

    ```js
    // ./eslintrc.js rules 添加
    rules: {
    'vue/no-multiple-template-root': 'off'
    }
    ```
ps: 如果项目完全使用jsx/tsx可将.vue文件全部删除后，将无此报错

## prettier
```
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
```
### ESLint 配置
// .eslintrc.js 的 extends 最后添加  'plugin:prettier/recommended'
```js
extends: ['plugin:vue/essential', 'standard', 'plugin:prettier/recommended'],
``` 

### 添加 .prettierrc文件
```
{
    "tabWidth": 2,
    "useTabs": false,
    "singleQuote": true,
    "semi": false,
    "trailingComma": "none"
}
```
ps 如果代码检测工作奇怪，重启VSCode能解决很多问题

## 其他准备工作
首先删除老的`App.vue`组件,创建新的`App.tsx`组件
```tsx
// src/App.tsx
export default () => {
  return <div>hello world for tsx</div>
}
```
修改main.ts 的App组件的路径
```ts
import { createApp } from 'vue'
import App from './App'

createApp(App).mount('#app')
```
删除 src/components/HelloWorld.vue

添加User接口，后面会用到
```ts
// src/model/User.face.ts
export interface User {
  name: string
  age: number
}
```
至此我们的准备工作完成了。

## 组件
### 无状态组件
```tsx
// src/components/Stateless.tsx
import { User } from '../model/User.face'
export default ({ name, age }: User) => {
  return (
    <div>
      <p>无状态组件</p>
      name：{name}
      age：{age}
    </div>
  )
}
```
### 有状态组件
```tsx
// src/components/Stateful.tsx
import { defineComponent, ref } from 'vue'
import { User } from '../model/User.face'
export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },
  setup(popps) {
    const age = ref(popps.user.age)
    return (
      <div>
        <p>
          name：{popps.user.name} -- age：{age}
        </p>
        <button
          onClick={() => {
            age.value++
          }}
        >
          add age
        </button>
      </div>
    )
  }
})

```
### vueFile 与 jsx/tsx互相使用

#### vue file使用jsx/tsx
vue file使用jsx/tsx非常简单，只需引入后注册就可以使用了
```vue
// src/components/V1.vue
<template>
  <p>vue file</p>
  <Stateless name="王五" :age="age" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Stateless from './Stateless'
export default defineComponent({
  components: { Stateless },
  setup() {
    const age = ref(12)
    return { age }
  }
})
</script>
```
#### jsx/tsx使用vue file
vue 文件在tsx中会报找不到模块的错误，我们可以创建ts-shim.d.ts声明文件告诉ts
```ts
src/ts-shim.d.ts
declare module '*.vue'
```
引入时需要写**文件后缀**,无需在components注册，直接使用
```ts
import V1 from './components/V1.vue'
```
### css方案
因为使用了jsx/tsx所以css就需要写在单独的css文件里了，常用的方案有[CssModules](https://github.com/css-modules/css-modules),CssInJs,sass。
我个人推荐**CssModules**。

CssInJs，写起来很爽但是维护起来除了代码变长还牺牲了css类名语义化，维护成本比较高。

**vite**因为是基于浏览器的模块加载，所以并不推荐使用sass，但是如果你倔强非要使用也可以，引入sass即可，注意不是node-sass。
```
npm i sass -D
```


以上教程网上一搜一大堆，就不赘述了。
```ts
//ts-shim.d.ts
declare module '*.css'
declare module '*.scss'
```
## ts中引入非js/jsx/ts/tsx的文件
在ts-shim.d.ts文件添加相应文件后缀
```ts
declare module '*.vue'
declare module '*.css'
declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
```

## 路由

安装
```sh
npm i vue-router@next
```
router配置文件
```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../page/Home'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/VueFile',
      name: 'VueFile',
      component: import('../page/VueFile.vue')
    }
  ]
})
```
使用
```tsx
//src/App.tsx
import { RouterLink, RouterView } from 'vue-router'
export default () => {
  return (<div>
    <p>
      <RouterLink to="/page">page</RouterLink>
    </p>
    <RouterView />
  </div>)
}
```
除了`RouterLink`和`RouterView`的引入，和一切没有太大区别

## VUEX使用
jsx/tsx中vuex的使用是更加简单，有些东西我认为是可以省略的，比如全局注册这一行为

安装
```
npm install vuex@next
```
### 创建store
```ts
// src/store/CountStore.ts
import { createStore } from 'vuex'
export interface State {
  count: number
}
export const CountStore = createStore<State>({
  state: {
    count: 0
  }
})
```
### 使用
```tsx
// src/Stateful.tsx
import { CountStore } from '../store/CountStore'
export default defineComponent({
  setup(){
    return (
        <div>
          count:{CountStore.state.count}
          <button
            onClick={() => {
              CountStore.state.count++
            }}
          >
            add count
          </button>
        </div>
    )
  }
})
```
### 为什么没有全局注册vuex
在jsx/tsx中直接引入已经很方便了，也很极少有`this.$store`的场景，所以选择不在全局注册。
### 为何没有用Getters,Mutations,Actions
我个人不爱使用的原因是这些方法很难获得好的代码提示，而大多数场景都是简单的取值赋值没必要使用，一些复杂的操作时才使用。


## 结语
我感觉2020年前端最大的进步应该是工程化思想和ts，最让我振奋的是vite，丝滑的体验感觉幸福指数都提升了。

虽然2020年绝大多数时间都是在写服务端，但是我的前端之魂一直在熊熊燃烧，从ng到react再到vue，每一个都是那么好玩，希望能跟上技术迭代速度，也希望2021年能多产出一些前端技术分享。