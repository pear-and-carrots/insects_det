// components/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stop:{
      type: Boolean
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stop: function (e) {
      this.setData({
        loading: false
      })
    }
  }
})