import { createStore } from 'vuex'
export interface State {
  count: number
}
export const CountStore = createStore<State>({
  state: {
    count: 0
  }
})
