<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >
      {{item}}
    </li>
    <!-- <li class="item"  @click="handleLetterClick">A</li>
    <li class="item">A</li>
    <li class="item">A</li>
    <li class="item">A</li> -->
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    // 构建letters 的数组
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return {
      touchStatus: false, // 标识位
      startY: 0,
      timer: null
    }
  },
  // 组件重新渲染性能优化
  updated () {
    // A元素顶部 -- 除header 距离底部的高度
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      // console.log(e.target.innerText)
      // 触发事件 传值给city父组件
      this.$emit('change', e.target.innerText)
    },
    // 手指触摸
    handleTouchStart () {
      // 可以上下拖动
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        //  函数节流 控制函数执行频率 提高网络性能
        // 函数延迟16ms   执行此函数 当在16 ms 内又执行此操作 消除上次执行
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // e.touches[0] 手指信息  e.touches[0].clientY 手指距离顶部距离   touchY 手指距离绿色距离
          const touchY = e.touches[0].clientY - 79 // 79 header  height
          const index = Math.floor((touchY - this.startY) / 20) // 20  A height 手指滑动位置到到达字母下标
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    // 结束
    handleTouchEnd () {
      // 不可以上下拖动
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
</style>
