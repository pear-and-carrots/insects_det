var amapFile = require('./utils/amap-wx.js');
App({
  onLaunch() {
    //获取用户信息

    var myAmapFun = new amapFile.AMapWX({
      key: 'db3577db1fad71b0290aead89355cfc4'
    });
    myAmapFun.getWeather({
      success: (res) => { // 成功回调
        let city = (res.city.data).replace('县', '')
        let city1 = city.replace('区', '')
        wx.setStorageSync('cityName', city1)
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    // wx.getLocation({			//获取经纬度
    //   success: ({ latitude, longitude }) => {
    //     console.log("经纬度",latitude, longitude);
    //     var that = this;
    //     wx.request({
    //       url: 'https://devapi.qweather.com/v7/indices/1d?type=1,3&key=a08c579ec122406f83781a7132da6624&location=' + longitude + "," + latitude,
    //       data: {

    //       },
    //       success: function (res) {
    //         console.log("成功获取用户地理位置",res);
    //       }
    //     })
    //   }
    // })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (wx.getStorageSync('history') == 0) {
      wx.setStorageSync('history', [])
    } else {

    }

    if (wx.getStorageSync('isLight').length == 0) {
      wx.setStorageSync('isLight', false)
    } else {

    }
    // 全局获取屏幕的宽高
    let windowHeight = wx.getSystemInfoSync().windowHeight
    let windowWidth = wx.getSystemInfoSync().windowWidth
    wx.setStorageSync('windowHeight', windowHeight)
    wx.setStorageSync('windowWidth', windowWidth)

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'lepidopter-0g4j22528dbb9f25',
        traceUser: true,
      })
    }

    // if(wx.getStorageSync('Id') == "administration"){
    //   wx.reLaunch({
    //     url: '/pages/administration/administration',
    //   })
    // }

    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://haichuang8888.com/distinguish/WeChat/code.do',
            data: {
              code: res.code
            },
            success: (res) => {
              console.log(res.data.msg)
              wx.setStorageSync('openId', res.data.msg)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: 'https://www.haichuang8888.com/distinguish',
    // baseUrl: 'http://124.71.87.176:8257/',
    // baseUrl: 'http://kjisce.natappfree.cc/',
    ws: 'wss://www.haichuang8888.com/distinguish/status'
  },

})