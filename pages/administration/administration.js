import {
  getSuggest,
  deleteSuggest,
  updateMessage,
  selectAll,
  insertMessage,
  upload_deep,
  get_order,
  deleteMessage,
  updatePic
} from '../../api/user.js'
const baseUrl = getApp().globalData.baseUrl

Page({

  data: {
    data: [],
    dex: 0,
    page: 1,
    page1: 1,
    array: ["昆虫库", "添加库", "意见箱"],
    index: 0,
    list: [],
    message: [{
        suggestion: '假数据1'
      },
      {
        suggestion: '假数据2'
      }
    ],
    num: 10,
    mul: 1,
    imgbox: [],
    show: 0,
  },

  onLoad: function (options) {
    this.getmessage()
    this.selectALL()
  },

  onShow: function () {},


  // 获取全部昆虫数据
  selectALL: function (e) {
    let that = this
    let page = this.data.page
    let pageSize = 10
    selectAll({
      page,
      pageSize
    }).then(res => {
      console.log(res)
      if (res.list.length == 0) {
        wx.showToast({
          icon: "none",
          title: '暂无更多数据',
        })
      } else {
        that.setData({
          list: res.list,
          callpages:res.pages
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
  },

  // 昆虫库分页加载
  // 上一页
  last: function () {
    let that = this
    console.log('上一页')
    let page = this.data.page
    if (page == 1) {
      wx.showToast({
        icon: "none",
        title: '是首页啦~',
      })
    } else {
      page--
      that.setData({
        page: page
      })
      selectAll({
        page: page,
        pageSize: 10,
      }).then(res => {
        that.setData({
          list: res.list
        })
      }).catch(error => {
        console.log("error", error)
      })
    }
  },
  // 下一页
  next: function () {
    console.log('下一页')
    let that = this
    let page = this.data.page
    page++
    selectAll({
      page: page,
      pageSize: 10
    }).then(res => {
      if (that.data.list.length == 0) {
        wx.showToast({
          icon: "none",
          title: '是尾页啦~',
        })
        page--
        that.setData({
          page: page
        })
      } else {
        that.setData({
          list: res.list
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
    that.setData({
      page: page
    })
  },

  //昆虫库的页面跳转
  tiao: function () {
    let that = this
    this.selectALL()
  },

  //意见箱的页面跳转
  tiao1: function () {
    let that = this
    this.getmessage()
  },

  selected: function (e) {
    // console.log(e.currentTarget.dataset.dex)
    this.setData({
      dex: e.currentTarget.dataset.dex
    })
  },

  getIntoDeatil: function (e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    let pestId = e.currentTarget.dataset.pestid
    let page = e.currentTarget.dataset.page
    wx.reLaunch({
      url: '../../pages/detail/detail?id=' + id + '&pestId=' + pestId + '&page=' + page,
    })
  },

  inputPage: function (e) {
    console.log("inputPage", e.detail.value)
    this.setData({
      page: e.detail.value
    })
  },

  inputPage1: function (e) {
    console.log("inputPage1", e.detail.value)
    this.setData({
      page1: e.detail.value
    })
  },

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

  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }

    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox,
        });
      }
    })
  },

  // 上传
  getsubload: function (e) {

  },

  submitForm: function (e) {
    let that = this
    let imgBox = this.data.imgbox
    let distribution = e.detail.value.distribution
    let genusId = e.detail.value.genusId
    let genusName = e.detail.value.genusName
    let latinName = e.detail.value.latinName
    let orderId = e.detail.value.orderId
    let orderName = e.detail.value.orderName
    let pestId = e.detail.value.pestId
    let pestName = e.detail.value.pestName
    let residence = e.detail.value.residence
    let sectionId = e.detail.value.sectionId
    let sectionName = e.detail.value.sectionName
    console.log("pestName", pestName)
    if (distribution == 0 ||
      genusId == 0 ||
      genusName == 0 ||
      latinName == 0 ||
      orderId == 0 ||
      orderName == 0 ||
      pestId == 0 ||
      pestName == 0 ||
      residence == 0 ||
      sectionId == 0 ||
      sectionName == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '您填写的数据不完整！',
        confirmText: '继续填写',
        showCancel: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定上传新的昆虫数据',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '操作中...',
            })
            wx.uploadFile({
              url: `${baseUrl}/sample/insertMessage.do`,
              name: 'file',
              filePath: imgBox[0],
              formData: {
                distribution,
                genusId,
                genusName,
                latinName,
                orderId,
                orderName,
                pestId,
                pestName,
                residence,
                sectionId,
                sectionName
              },
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                console.log("图片的res:", res)
                that.setData({
                  pestId: JSON.parse(res.data).msg,
                  pestName: pestName
                })
                if (imgBox != 0) {
                  that.setImg()
                } else {
                  wx.hideLoading()
                }
              },
              fail: function (res) {
                wx.showModal({
                  cancel: false,
                  title: '',
                  content: '图片上传失败,请重试',
                  duration: '2000'
                })
                console.log("失败原因", res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  // 上传图片
  setImg: function (e) {
    console.log("setImg函数")
    let uploadFile = this.data.imgbox
    let pestId = this.data.pestId
    let pestName = this.data.pestName
    for (let i = 0; i < uploadFile.length; i++) {
      let obj = ""
      obj = uploadFile[i]
      console.log(uploadFile[i])
      wx.uploadFile({
        url: `${baseUrl}/sample/upload_deep.do`,
        name: 'uploadFile',
        filePath: obj,
        formData: {
          pestName: JSON.stringify(pestName),
          pestId: pestId,
        },
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          console.log("图片的res:", res)
          wx.showToast({
            title: '添加成功！',
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '../administration/administration',
            })
          }, 1500)
          wx.hideLoading()
        },
        fail: function (res) {
          wx.showModal({
            cancel: false,
            title: '',
            content: '图片上传失败,请重试',
            duration: '2000'
          })
          console.log("失败原因", res)
        }
      })
    }
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

  orders: function (e) {
    console.log(e)
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value
    })
  },

  // 意见箱
  getmessage: function (e) {
    let that = this
    let page = this.data.page1
    let pageSize = 10
    getSuggest({
      page,
      pageSize
    }).then(res => {
      console.log("意见箱", res)
      if (res.list.length == 0) {
        wx.showToast({
          icon: "none",
          title: '暂无更多数据',
        })
      } else {
        that.setData({
          message: res.list,
          mallpages:res.pages
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  stuList: function (e) {
    console.log("???????", e.currentTarget.dataset.id);
    console.log("???????", e.currentTarget.dataset.message);
    this.setData({
      showModal1: true,
      id: e.currentTarget.dataset.id,
      msg: e.currentTarget.dataset.message
    })
  },

  close_mask: function (e) {
    this.setData({
      showModal1: false
    })
  },

  removamessage: function () {
    let that = this
    let id = this.data.id
    wx.showModal({
      title: '提示',
      content: '确定已经阅读该内容并选择删除！',
      success: (res) => {
        if (res.confirm) {
          deleteSuggest({
            id
          }).then(res => {
            console.log("res", res)
            that.setData({
              showModal1: false
            })
            that.getmessage()
          }).catch(error => {
            console.log("error", error)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 意见箱分页加载
  // 上一页
  lastPage: function (e) {
    let that = this
    console.log('上一页')
    let page1 = this.data.page1
    if (page1 == 1) {
      wx.showToast({
        icon: "none",
        title: '是首页啦~',
      })
    } else {
      page1--
      that.setData({
        page1: page1
      })
      getSuggest({
        page: page1,
        pageSize: 10,
      }).then(res => {
        that.setData({
          message: res.list
        })
      }).catch(error => {
        console.log("error", error)
      })
    }
  },
  // 下一页
  nextPage: function (e) {
    console.log('下一页')
    let that = this
    let page1 = this.data.page1
    page1++
    getSuggest({
      page: page1,
      pageSize: 10,
    }).then(res => {
      if (that.data.message.length == 0) {
        wx.showToast({
          icon: "none",
          title: '是尾页啦~',
        })
        page1--
        that.setData({
          page1: page1
        })
      } else {
        that.setData({
          message: res.list
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
    that.setData({
      page1: page1
    })
  },

  inputId: function (e) {
    console.log(e.detail.value)
    this.setData({
      id: e.detail.value
    })
  },
})