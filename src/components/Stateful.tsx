import { defineComponent, ref } from 'vue'
import { User } from '../model/User.face'
import { CountStore } from '../store/CountStore'

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
        <div>
          name：{popps.user.name} -- age：{age}
          <button
            onClick={() => {
              age.value++
            }}
          >
            add age
          </button>
        </div>
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
      </div>
    )
  }
})
