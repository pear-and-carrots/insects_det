import {
  selectAll,
  deleteMessage,
  updateMessage,
  selectOne,
  updatePic,
  deletePic
} from '../../api/user.js'
const baseUrl = getApp().globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    list: [],
    name: 1,
    imgbox: []
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      pestId: options.pestId,
      page: options.page
    })
    this.selectALL()
    this.selectOne()
  },

  return: function (e) {
    wx.navigateBack({
      changed: true
    });
  },

  // 获取全部昆虫数据
  selectALL: function (e) {
    selectAll({
      page: this.data.page,
      pageSize: 10
    }).then(res => {
      console.log(res)
      this.setData({
        list: res.list
      })
    }).catch(error => {
      console.log("error", error)
    })
  },
  
  // 获取昆虫图片
  selectOne: function (e) {
    let that = this
    let pestId = this.data.pestId
    console.log("pestId",pestId)
    selectOne({
      pestId
    }).then(res => {
      console.log("selectOne", res)
      let imgUrls = []
      if (res.samples != []) {
        for (let i = 0; i < res.samples.length; i++) {
          imgUrls.push(res.samples[i].picUrl)
        }
      }
      that.setData({
        imgUrls: imgUrls,
        samples: res.samples,
        pestId: res.labels.pestId,
        pestName: res.labels.pestName
      })
    }).catch(error => {
      console.log("error", error)
    })
  },

  //删除样本图片
  dImg: function (e) {
    let that = this
    console.log("id", e.currentTarget.dataset.id)
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除该样本图片？',
      success(res) {
        wx.showLoading({
          title: '操作中...',
        })
        if (res.confirm) {
          deletePic({
            id: e.currentTarget.dataset.id,
          }).then(res => {
            wx.hideLoading()
            wx.showToast({
              title: '删除成功！',
              icon: 'success',
            })
            that.selectOne()
            console.log("删除样本图片结果resssss", res)
          }).catch(error => {
            console.log("error", error)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 修改样本图片
  rImg: function (e) {
    let that = this
    console.log("id", e.currentTarget.dataset.id)
    wx.showModal({
      title: '温馨提示',
      content: '您确定要更换该样本图片？',
      success(res) {
        if (res.confirm) {
          that.addPic()
          that.setData({
            rId: e.currentTarget.dataset.id,
            updImg: true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //增加样本图片
  aImg: function (e) {
    let that = this
    console.log("id", e.currentTarget.dataset.id)
    wx.showModal({
      title: '温馨提示',
      content: '您确定要新增该样本图片？',
      success(res) {
        if (res.confirm) {
          that.addPic()
          that.setData({
            aId: e.currentTarget.dataset.id,
            addImg: true
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 选择图片 &&&
  addPic: function (e) {
    let that = this
    wx.chooseImage({
      count: 1, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '操作中...',
        })
        that.setData({
          Img: tempFilePaths[0],
        });
        if (that.data.addImg == true) { //新增样本图片
          that.addDatePic()
        } else if (that.data.updImg == true) { //修改样本图片
          that.updatePic()
        }
      }
    })
  },

  //提交修改样本图片信息
  updatePic: function (e) {
    let that = this
    let id = this.data.rId
    let img = this.data.Img
    wx.uploadFile({
      url: `${baseUrl}/sample/updatePic.do`,
      name: 'uploadFile',
      filePath: img,
      formData: {
        id: id,
      },
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        console.log("图片修改结果", res)
        that.selectOne()
        wx.hideLoading()
        wx.showToast({
          title: '更换成功！',
        })
        that.setData({
          updImg: false,
          addImg: false
        })
      },
      fail: function (res) {
        console.log("失败原因", res)
      }
    })
  },

  //提交新增样本图片信息
  addDatePic: function (e) {
    let that = this
    let img = this.data.Img
    wx.uploadFile({
      url: `${baseUrl}/sample/upload_deep.do`,
      name: 'uploadFile',
      filePath: img,
      formData: {
        pestId: that.data.pestId,
        pestName: that.data.pestName
      },
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        console.log("图片修改结果", res)
        that.selectOne()
        wx.hideLoading()
        wx.showToast({
          title: '操作成功！',
        })
        that.setData({
          updImg: false,
          addImg: false
        })
      },
      fail: function (res) {
        console.log("失败原因", res)
      }
    })
  },

  // 删除害虫数据
  deleteMessage: function (e) {
    let pestId = this.data.pestId
    wx.showModal({
      title: '温馨提示',
      content: '确定要删除该条昆虫信息吗？',
      success(res) {
        if (res.confirm) {
          deleteMessage({
            pestId
          }).then(res => {
            wx.showToast({
              title: '删除成功！',
            })
            setTimeout(() => {
              wx.reLaunch({
                url: '../administration/administration',
              })
            }, 1500);
          }).catch(error => {
            console.log("error", error)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 修改信息
  repair: function (e) {
    let that = this
    let id = this.data.id
    let list = this.data.list
    let list1 = []
    for (let i = 0; i < list.length; i++) {
      if (id == list[i].id) {
        list1.push(list[i])
      }
    }
    this.setData({
      list1: list1,
      name: 2
    })
  },

  // 修改信息
  submit: function (e) {
    console.log("修改信息表单内容：", e.detail.value)
    let that = this
    let distribution = e.detail.value.distribution
    let genusName = e.detail.value.genusName
    let latinName = e.detail.value.latinName
    let orderName = e.detail.value.orderName
    let pestName = e.detail.value.pestName
    let residence = e.detail.value.residence
    let sectionName = e.detail.value.sectionName
    let id = this.data.id
    updateMessage({
      orderName,
      distribution,
      genusName,
      latinName,
      pestName,
      residence,
      sectionName,
      id
    }).then(res => {
      wx.showToast({
        title: '修改成功！',
      })
      setTimeout(function () {
        that.selectALL()
        that.setData({
          name: 1
        })
      }, 1500)
    }).catch(error => {
      console.log("error", error)
    })
  },

  upRepair: function (e) {
    this.setData({
      name: 1
    })
  },

  repairImg: function (e) {
    this.setData({
      repairImgBox: true
    })
  },

  // 图片
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },

  // 点击查看图片
  previewImg: function (e) {
    console.log("图片的index", e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgbox = this.data.imgbox;
    wx.previewImage({
      current: imgbox[index], //当前图片地址
      urls: imgbox, //所有要预览的图片的地址集合 数组形式
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  // 图片提交修改
  btnImg: function (e) {
    let that = this
    let imgbox = this.data.imgbox
    console.log("idddddd", that.data.id)
    wx.showModal({
      title: '温馨提示',
      content: '确定是否上传新的昆虫样图',
      success(res) {
        if (res.confirm) {
          for (let i = 0; i < imgbox.length; i++) {
            wx.uploadFile({
              url: `${baseUrl}/sample/updatePic.do`,
              name: 'uploadFile',
              filePath: imgbox[i],
              formData: {
                id: that.data.id,
              },
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                console.log(res)
              },
              fail: function (res) {
                console.log("失败原因", res)
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  close: function (e) {
    console.log("jkh")
    this.setData({
      repairImgBox: false
    })
  }
})