// components/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLight: wx.getStorageSync('isLight')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange: function () {
      this.setData({
        isLight: !this.data.isLight
      })
      this.triggerEvent("isLight", this.data.isLight)
    }
  }
})