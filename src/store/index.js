import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)
// let defaultCity = '北京'
// // 防止有的程序关闭localStorage
// try {
//   if (localStorage.city) {
//     defaultCity = localStorage.city
//   }
// } catch (e) {}
// 创建Store仓库
export default new Vuex.Store({
  // 存放全局公用数据
  // state: {
  //   city: defaultCity
  // },
  state,
  actions: {
    changeCity (ctx, city) {
      console.log(city)
      ctx.commit('changeCity', city)
    }
  },
  mutations,
  getters: { // 相当于计算属性
    doubleCity (state) {
      return state.city + ' ' + state.city
    }
  }
})
