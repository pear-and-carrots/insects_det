const app = getApp()
var amapFile = require('../../utils/amap-wx.js');

var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hidden_actionSheet: true,
    input: wx.getStorageSync('mysign'),
    isInput: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var myDate = new Date();//获取系统当前时间
    this.setData({
      nl: (myDate.getDate()).toString().length,
      day: myDate.getDate(),
      month:myDate.getMonth()+1,
      loading: true,
      isLight: wx.getStorageSync('isLight')
    })
    that.isAuthorize().then(res => { //用户已经授权获取头像昵称
      //获取头像昵称
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: app.globalData.userInfo,
          })
        }
      })
    }).catch(res => { //用户没有授权获取头像昵称
      that.setData({
        hidden_actionSheet: false,
      })
    })

    var myAmapFun = new amapFile.AMapWX({ key: 'db3577db1fad71b0290aead89355cfc4' });
    myAmapFun.getWeather({
      success: (res) => {
        //成功回调
        console.log(res);
        this.setData({
          weatherData: res
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })

    this.weizhi()
  },

  weizhi() {
    wx.getLocation({			//获取经纬度
      success: ({ latitude, longitude }) => {
        console.log("经纬度",latitude, longitude);
        var that = this;
        wx.request({
          url: 'https://devapi.qweather.com/v7/indices/1d?type=1,3&key=a08c579ec122406f83781a7132da6624&location=' + longitude + "," + latitude,
          data: {

          },
          success: function (res) {
            console.log("成功");
            that.setData({
              weather: res.data,
              loading: false
            })
            console.log(res.data)

          }
        })
      }
    })
  },

  isAuthorize() {
    return new Promise((resolve, reject) => {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("全局--用户已经授权")
            resolve()
          } else {
            console.log("全局--用户还没有授权获取昵称和头像")
            reject()
          }
        }
      })
    })
  },

  //点击头像----事件
  bindViewTap: function () {
    console.log("点击了头像")
  },
  // 底下的取消
  actionSheetChange: function (e) {
    console.log("点击了取消")

    this.setData({
      hidden_actionSheet: true
    })
    wx.showModal({
      content: '部分功能需要登录才能使用',
    })
  },

  // 用户选择  拒绝还是接受都会进入这里
  getUserInfo: function (e) {
    // console.log("权限选择了：", e.detail)
    if (e.detail.rawData) { //权限选择了：允许
      console.log("权限选择了：允许")
      // app.globalData.userInfo = res.userInfo
      that.setData({
        userInfo: app.globalData.userInfo,
      })
      //获取头像昵称
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: app.globalData.userInfo,
          })
        }
      })
    } else { //权限选择了：拒绝
      console.log("权限选择了：拒绝")
      wx.showModal({
        content: '部分功能需要登录才能使用',
      })
    }
    // 隐藏actionSheet
    this.setData({
      hidden_actionSheet: true
    })

  },

  input: function(e){
    this.setData({
      input:e.detail.value
    })
    wx.setStorageSync('mysign', e.detail.value)
  },

  inputt : function(e){
    let value = this.data.input
    this.setData({
      input: value,
      isInput: true
    })
  },

  isLight: function(e){
    this.setData({
      isLight: e.detail
    })
    wx.setStorageSync('isLight', e.detail)
  },

  onShareAppMessage: function (options) {
   
  },
})