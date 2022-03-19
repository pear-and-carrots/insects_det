const db = wx.cloud.database();
let SCREEN_WIDTH = 750
let RATE = wx.getSystemInfoSync().screenHeight / wx.getSystemInfoSync().screenWidth

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['管理员', '用户'],
    id: 1,
    ScreenTotalW: SCREEN_WIDTH,
    ScreenTotalH: SCREEN_WIDTH * RATE,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },

  getInto: function (e) {
    let that = this
    if (this.data.id == 1) {
      if (wx.getStorageSync('userInfo').length == 0) {
        this.getUserProfile()
        console.log("用户未授权")
      } else if (wx.getStorageSync('userInfo').length != 0) {
        console.log('用户已授权')
      }
      wx.reLaunch({
        url: '../recognition/recognition',
      })
    } else if (this.data.id == 2) {
      that.setData({
        loading: true
      })
      if (this.data.userName == 0) {
        console
      }
      db.collection('administration')
        .where({
          userName: this.data.userName
        })
        .get()
        .then(res => {
          wx.hideLoading();
          that.setData({
            loading: false
          })
          console.log("查询信息", res.data[0])
          console.log(res.data[0] == null)
          if (this.data.key == res.data[0].key) {
            wx.reLaunch({
              url: '../administration/administration',
            })
            wx.setStorageSync('userName', this.data.userName)
            wx.setStorageSync('key', this.data.key)
            wx.setStorageSync('Id', "administration")
          } else if (res.data[0] == null) {
            wx.showToast({
              icon: "none",
              title: '此账号不存在！',
            })
          } else {
            wx.showToast({
              icon: "none",
              title: '密码错误！',
            })
          }
        })
        .catch(err => {

        })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  userName: function (e) {
    // console.log(e.detail.value)
    this.setData({
      userName: e.detail.value
    })
  },

  key: function (e) {
    // console.log(e.detail.value)
    this.setData({
      key: e.detail.value
    })
  },

  idBox1: function () {
    this.setData({
      id: 1
    })
  },

  idBox2: function () {
    this.setData({
      id: 2
    })
  },

  onShareAppMessage: function (options) {
   
  },
})