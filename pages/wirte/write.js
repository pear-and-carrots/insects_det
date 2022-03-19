var util = require('../../utils/util.js')
import {
  Ainsert,
  selectByOpenId,
  selectByStatus
} from '../../api/user.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    page: 0,
    Zpage: 1,
    Tpage: 1,
    author: '',
    signShow: false,
    sign: [],
    mySign: '',
    placeholder: '',
    header: [{
      id: 0,
      name: "创作投稿"
    }, {
      id: 1,
      name: "我的作品"
    }, {
      id: 2,
      name: "投稿消息"
    }, ],
    list: [],
    Zlist: [],
    signList: [{
        id: 0,
        name: '林业',
        active: false
      },
      {
        id: 1,
        name: '害虫',
        active: false
      },
      {
        id: 2,
        name: '温差',
        active: false
      },
      {
        id: 3,
        name: '药剂',
        active: false
      },
      {
        id: 4,
        name: '降雨量',
        active: false
      },
      {
        id: 5,
        name: '湿度',
        active: false
      },
    ],
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userInfo').length == 0) {
      this.getUserProfile()
    } else if (wx.getStorageSync('userInfo').length != 0) {
      let author = wx.getStorageSync('userInfo').nickName
      let userImg = wx.getStorageSync('userInfo').avatarUrl
      this.setData({
        author: author,
        userImg: userImg
      })
    }

  },

  bindTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },

  nowTime(e) {
    this.setData({
      nowTime: util.formatTime(new Date())
    })
  },

  bindheader: function (e) {
    if (wx.getStorageSync('openId').length == 0) {
      this.login()
    } else {
      this.setData({
        page: e.currentTarget.dataset.id
      })
      if (e.currentTarget.dataset.id == 1) { //我的作品
        this.selectByStatus()
        console.log("我的作品")
      } else if (e.currentTarget.dataset.id == 2) { // 投稿消息
        this.selectByOpenId()
        console.log("投稿消息")
      }
    }
  },

  // 用户作品信息
  selectByStatus: function () {
    selectByStatus({
      openId: wx.getStorageSync('openId'),
      page: this.data.Zpage,
      pageSize: 10,
      status: 0
    }).then(res => {
      console.log(res)
      if (res.list.length === 0) {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      } else {
        let list = this.data.Zlist
        list.push(res.list)
        this.setData({
          Zlist: res.list
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
  },

  // 投稿消息
  selectByOpenId: function () {
    selectByOpenId({
      openId: wx.getStorageSync('openId'),
      page: this.data.Tpage,
      pageSize: 10,
    }).then(res => {
      console.log(res)
      res.list.forEach(item => {
        let time1 = item.startTime.replace('T', ' ')
        let time2 = time1.replace('.000+00:00', ' ')
        item.startTime = time2
      })
      if (res.list.length === 0) {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      } else {
        let list = this.data.list
        list.push(res.list)
        this.setData({
          list: res.list
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
  },

  readOnlyChange() {
    this.setData({
      readOnly: !that.data.readOnly
    })
  },

  onEditorReady() {
    const that = this
    let content = this.data.content
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      // 初始化富文本编辑器的内容
      that.editorCtx.setContents({
        html: content
      })
    }).exec()
  },

  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({
      editorHeight,
      keyboardHeight
    })
  },

  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },

  onStatuschange: function (e) {

  },

  blur() {
    this.editorCtx.blur()
  },

  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)
  },

  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },

  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },

  clickLogText(e) {
    that.editorCtx.getContents({
      success: function (res) {
        console.log(res.html)
        wx.setStorageSync("content", res.html); // 缓存本地
        console.log(res.html)
      }
    })
  },

  clear() {
    this.editorCtx.clear({
      success: function (res) {
        // console.log("clear success")
      }
    })
  },

  removeFormat() {
    this.editorCtx.removeFormat()
  },

  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  // 恢复
  redo() {
    this.editorCtx.redo()
  },

  // 撤销
  undo() {
    this.editorCtx.undo()
  },

  insertImage() {
    const that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.getpublish(res.tempFilePaths, 0)
      }
    })
  },

  // 获取富文本内容
  bindinput: function (e) {
    let that = this
    this.setData({
      content: e.detail.html,
    })
  },

  // end
  goplay: function (e) {
    let that = this
    console.log(this.data.sign)
    if (this.data.sign.length == 0) {
      wx.showToast({
        title: '标签未填写！',
        icon: "none"
      })
    } else if (this.data.title.length == 0) {
      wx.showToast({
        title: '标题未填写！',
        icon: "none"
      })
    } else if (this.data.content.length == 0) {
      wx.showToast({
        title: '投稿内容为空！',
        icon: "none"
      })
    } else if (wx.getStorageSync('userInfo').length != 0) {
      console.log("用户已认证")
      wx.showModal({
        title: '温馨提示',
        content: '确认提交？',
        confirmText: "确认",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            console.log(that.data.content)
            that.nowTime()
            setTimeout((res) => {
              that.Ainsert()
            }, 300)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (wx.getStorageSync('userInfo').length == 0) {
      console.log("用户没认证")
      let data = true
      that.getUserProfile(data)
    }
  },

  // 提交表单信息
  Ainsert: function () {
    if (wx.getStorageSync('openId').length == 0) {
      this.login()
    } else {
      console.log(this.data.content)
      Ainsert({
        content: this.data.content,
        openId: wx.getStorageSync('openId'),
        portrait: this.data.userImg,
        title: this.data.title,
        userName: this.data.author,
        tag: this.data.sign
      }).then(res => {
        console.log(res)
        if (res == 1) {
          wx.showToast({
            title: '投稿成功！',
          })
          this.setData({
            content: '',
            title: '',
            signList: [],
            sign: []
          })
          setTimeout(res => {
            wx.reLaunch({
              url: '../wirte/write',
            })
          },1500)
        } else {
          wx.showToast({
            title: '投稿失败！',
            icon: "error"
          })
        }
      }).catch(error => {
        console.log("error", error)
      })
    }
  },

  // 重新获取openId
  login: function () {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://124.71.87.176:8257/WeChat/code.do',
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

  getUserProfile(data) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.setStorageSync('userInfo', res.userInfo)
        if (data == true) {
          this.goplay()
        }
      }
    })
  },

  viewCases() {
    this.setData({
      signShow: !this.data.signShow,
    })
  },

  actionActive(e) {
    let signList = this.data.signList
    let arr = [...signList];
    console.log("????", e.target.dataset.id)
    arr.forEach((item, index) => {
      if (e.target.dataset.id == item.id) {
        console.log("!!!!!", item.id)
        item.active = !item.active;
      }
    })
    this.setData({
      signList,
    })
    this.makesignlist()
  },

  makesignlist(e) {
    let signList = this.data.signList
    let sign = []
    signList.forEach((item, index) => {
      if (item.active == true) {
        sign.push(item.name)
      }
    })
    console.log(sign)
    this.setData({
      sign: sign
    })
  },

  bindSign: function (e) {
    this.setData({
      mySign: e.detail.value
    })
  },

  sureSign: function (e) {
    if (this.data.mySign.length == 0) {
      wx.showToast({
        icon: "error",
        title: '内容不能为空！',
      })
    } else {
      let signList = this.data.signList
      let id = signList.length
      let obj = {
        id: id,
        name: this.data.mySign,
        active: true
      }
      signList.push(obj)
      this.setData({
        signList: signList,
        placeholder: '',
        mySign: ''
      })
    }
  },

  // 触底刷新
  onReachBottom: function () {
    if (this.data.page === 1) {
      this.setData({
        Zpage: this.data.Zpage + 1,
      })
      this.selectByStatus()
    } else if (this.data.page === 2) {
      this.setData({
        Tpage: this.data.Tpage + 1,
      })
      this.selectByOpenId()
    }
  }
})