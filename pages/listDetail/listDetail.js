import {
  selectOne,
} from '../../api/user.js'
Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      pestId: options.pestId
    })
    this.selectOne()
  },

  selectOne: function (e) {
    let that = this
    let pestId = this.data.pestId
    selectOne({
      pestId
    }).then(res => {
      console.log("selectOne", res)
      let imgUrls = []
      let list = []
      list.push(res.labels)
      if (res.samples != []) {
        for (let i = 0; i < res.samples.length; i++) {
          imgUrls.push(res.samples[i].picUrl)
        }
      }
      that.setData({
        imgUrls: imgUrls,
        list: list
      })
      that.makeHistory()
    }).catch(error => {
      console.log("error", error)
    })
  },

  // 加入足迹
  makeHistory: function (e) {
    let history = wx.getStorageSync('history')
    let lg = history.length
    if (lg >= 100) {
      history.splice(0, 1)
      history.splice(lg, 1, this.data.list[0])
    } else if (lg < 100) {
      history.splice(lg, 1, this.data.list[0])
    }
    this.remove(history)
  },

  // 数据去重
  remove: function (history) {
    var array = history || [];
    console.log("array", array);
    var newData = []
    var isHad

    array.map(item => {
      isHad = false
      newData.map(item1 => {
        if (item1.id === item.id) {
          console.log('aaa')
          isHad = true
          return false
        }
      })
      if (!isHad) {
        newData.push(item)
        // console.log(newData)
      }
    })
    console.log(newData)
    wx.setStorageSync('history', newData)
  },

  onShareAppMessage: function () {

  },

  // 点击查看图片
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgUrls;
    wx.previewImage({
      current: imgArr[index], //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
})