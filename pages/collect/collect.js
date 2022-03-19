import {
  GetCollection
} from '../../api/user.js'
const baseUrl = getApp().globalData.baseUrl
Page({
  data: {
    list:[],
  },

  onLoad: function (options) {
    this.getList(1)
  },

  getList: function (page) {
    GetCollection({
      openId: wx.getStorageSync('openid'),
      page: page,
      pageSize: 10
    }).then(res => {
      console.log(res)
      this.setData({
        list: res
      })
    }).catch(error => {
      console.log("error", error)
    })
  },

  bindList: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../news/news?articleId=' + e.currentTarget.dataset.articleid,
    })
  },

  onReachBottom: function () {
    console.log("到底了")
    let page = this.data.page + 1
    this.getList(page)
  },

})