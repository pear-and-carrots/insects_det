import {
  addSuggest,
  deleteSuggest,
  getSuggest
} from '../../api/user.js'

Page({
  data: {

  },

  onLoad: function (options) {

  },

  textarea: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },

  button: function (e) {
    let that = this
    let suggest = this.data.textarea
    wx.showModal({
      title: '提示',
      content: '确认提交您宝贵的意见',
      cancelText: '再改改',
      success(res) {
        if (res.confirm) {
          addSuggest({
            suggest
          }).then(res => {
            console.log(res)
            // if (res.status == 0) {
              wx.showToast({
                title: '留言成功！',
              })
              setTimeout(() => {
                wx.reLaunch({
                  url: '../message/message',
                })
              }, 1500);
            // }
          }).catch(error => {
            console.log("error", error)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  return: function (e) {
    wx.reLaunch({
      url: '../about/about',
    })
  }
})