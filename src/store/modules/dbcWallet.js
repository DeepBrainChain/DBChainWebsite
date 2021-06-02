import {

} from '@/utlis/dot'

export default {
  namespaced: true,
  state: () => {
    const pairJson = localStorage.getItem('pair')
    return {
      pair: null,
      seed: ''
    }
  },
  mutations: {
    SET_PAIR(state, data) {
      state.pair = data
      state.pair.toJson()
      localStorage.setItem('pair', data)
    },
    SET_SEED(state, data) {
      state.seed = data
      localStorage.setItem('seed', data)
    }
  },
  actions: {

  }
}
