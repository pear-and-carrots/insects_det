const baseUrl = getApp().globalData.baseUrl
const ws = getApp().globalData.ws
let cropper = null;
import {
  labelsDo
} from '../../api/user.js'

Page({
  data: {
    tempFilePaths: "",
    imgUrls: [
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2725724809,1769414418&fm=26&gp=0.jpg",
      "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3651143258,1004526309&fm=26&gp=0.jpg",
      "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/18d8bc3eb13533faa6d02c81a9d3fd1f41345b3e.jpg"
    ],
    show: 0,
    page: 0,
    pictureId: 'b4677807-ce87-445e-88c0-640e28f9096b',
    array: [],
    dex: 0,
    // array: ["昆虫库", "添加库", "意见箱"],
    // dex1: 0
    wxheight: wx.getStorageSync('windowHeight'),
    wxwight: wx.getStorageSync('windowWidth'),
    look: false
  },

  onLoad: function (options) {},

  // 本地选取图片
  connect: function (e) {
    this.setData({
      loading: false
    })
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: res.tempFilePaths,
          cropper: true,
          show: 1,
        })
        that.cropper()
        console.log("11111111", res.tempFilePaths)
      }
    })
  },

  // selected1: function (e) {
  //   // console.log(e.currentTarget.dataset.dex)
  //   this.setData({
  //     index: e.currentTarget.dataset.index
  //   })
  // },

  search: function (e) {
    // 调用ws接口
    let that = this;
    const tempFilePaths = this.data.tempFilePaths
    let socketOpen = false
    let socketMsgQueue = []
    wx.connectSocket({ //请求socket
      url: `${ws}/status`,
      success: res => {
        console.log("连接成功", res)
        wx.uploadFile({
          url: `${baseUrl}/picture/pull`,
          name: 'file',
          filePath: tempFilePaths,
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            console.log("图片发送成功", res.data)
            that.setData({
              pictureId: res.data,
              loading: true
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '',
              content: '查询失败,请重试',
              duration: '2000'
            })
            console.log("失败原因", res)
          }
        })
      }
    })
    wx.onSocketOpen(function (res) { //监听socket
      console.log(res)
      socketOpen = true
      for (let i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      //-----页面内使用长链接接口发送和接收数据时也是如下方法：
      let streamconfig = {
        hm: "fsdg"
      }
      //发送数据
      wx.sendSocketMessage({ //
        data: JSON.stringify(streamconfig),
        success: res => {
          console.log('发送数据')
          console.log(res)
        }
      })
      //接收数据
      wx.onSocketMessage(res => {
        console.log("返回数据：", res)
        console.log("返回结果：", res.data)
        if (res.data == '{"status":"success"}') {
          console.log("cccccccccccc")
          that.text()
        } else if (res.data == '{"status":"fail"}') {
          that.setData({
            loading: false
          })
          wx.showToast({
            icon: 'none',
            title: '识别失败',
          })
        }
      })
    })
    setTimeout(function (e) {
      that.setData({
        stop: true
      })
    },20000)
  },

  reSearch: function () {
    this.setData({
      page: 0
    })
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

  lookPicture1: function(e){
    this.setData({
      look: true
    })
  },

  lookPicture3: function(e){
    this.setData({
      look: false
    })
  },

  // 查看图片分析
  lookPicture2: function(e){
    let picture = this.data.lookPicture
    let picBox = []
    picBox.push(picture)
    console.log("look")
    wx.previewImage({
      current: picture, // 当前显示图片的http链接
      urls: picBox// 需要预览的图片http链接列表
      })
  },

  // 长按保存图片
  seaveImg: function (e) {
    let index = e.currentTarget.dataset.index;
    let imgArr = this.data.imgUrls;
    console.log(imgArr[index])
    wx.saveImageToPhotosAlbum({
      filePath: imgArr[index],
      success(res) {
        console.log(res)
        wx.showToast({
          title: '保存成功',
        })
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  },

  text: function (e) {
    let that = this
    labelsDo({
      pictureId: that.data.pictureId
    }).then(res => {
      console.log("解析的数据", res)
      console.log("messages:", res.messages)
      // 暂存全部昆虫信息
      that.setData({
        messages: res.messages,
        lookPicture: res.picture.pictureUrl
      })

      wx.hideLoading()
      // 将对象改为数组
      let arr = []
      arr.push(res.messages[0].labels)
      console.log(res.messages[0].samples[0].picUrl)

      // 取出导航
      let array = []
      for (let i = 0; i < res.messages.length; i++) {
        array.push(res.messages[i].labels.pestName)
      }
      console.log("array", array)

      // 将样本图片取出，做成轮播图
      if (res.messages[0].samples == null) {
        let probability = res.messages[0].probability * 100
        probability = probability.toFixed(2)

        // 储存数据
        that.setData({
          page: 1,
          message: res.messages[0],
          labels: arr,
          probability: probability,
          loading: false,
          objimg: 0,
          array: array
        })
      } else {
        // let img = []
        // let obj = res.messages[0].samples

        that.getoutimg()
        // 相似度保留两位数字
        let probability = res.messages[0].probability * 100
        probability = probability.toFixed(2)

        // for (let i = 0; i < obj.length; i++) {
        //   console.log(obj[i].picUrl)
        //   img.push(obj[i].picUrl)
        // }

        // 储存数据
        that.setData({
          page: 1,
          message: res.messages[0],
          labels: arr,
          // imgUrls: img,
          probability: probability,
          loading: false,
          array: array
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
  },

  selected: function (e) {
    // console.log(e.currentTarget.dataset.dex)
    let dex = e.currentTarget.dataset.dex
    let messages = this.data.messages
    let labels = []
    labels.push(messages[dex].labels)
    let probability = messages[dex].probability * 100
    probability = probability.toFixed(2)
    this.setData({
      dex: dex,
      labels: labels,
      probability: probability
    })
    if (dex == this.data.dex) {
      this.getoutimg()
    }
  },

  // 取出图片制作轮播图
  getoutimg: function (e) {
    console.log(dex)
    let dex = this.data.dex
    let imgs = this.data.messages[dex].samples
    console.log(imgs)
    let imgUrls = []

    for (let i = 0; i < imgs.length; i++) {
      imgUrls.push(imgs[i].picUrl)
    }

    this.setData({
      imgUrls: imgUrls
    })
  },

  ////////  cancel ///////////////////
  fnCancel: function () {
    console.log('cancel')
    //todo something
    this.setData({
      cropper: false
    })
  },

  ////////// do crop ////////////////////
  fnSubmit: function () {
    let that = this
    console.log('submit')
    //do crop
    cropper.fnCrop({

      //剪裁成功的回调
      success: function (res) {
        console.log(res)
        //生成文件的临时路径
        console.log(res.tempFilePath);
        that.setData({
          cropper: false,
          tempFilePaths: res.tempFilePath
        })
        // wx.previewImage({
        //   urls: [res.tempFilePath],
        // })
      },
      //剪裁失败的回调
      fail: function (res) {
        console.log(res);
      },

      //剪裁结束的回调
      complete: function () {
        //complete
      }
    });
  },

  // cropper
  cropper: function (e) {
    const img = this.data.tempFilePaths[0]
    cropper = this.selectComponent('#cropper');
    cropper.fnInit({
      imagePath: img, //*必填
      debug: true, //可选。是否启用调试，默认值为false。true：打印过程日志；false：关闭过程日志
      outputFileType: 'jpg', //可选。目标文件的类型。默认值为jpg，jpg：输出jpg格式图片；png：输出png格式图片
      quality: 1, //可选。图片的质量。默认值为1，即最高质量。目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
      aspectRatio: 1.25, //可选。裁剪的宽高比，默认null，即不限制剪裁宽高比。aspectRatio需大于0
      minBoxWidthRatio: 0.2, //可选。最小剪裁尺寸与原图尺寸的比率，默认0.15，即宽度最小剪裁到原图的0.15宽。
      minBoxHeightRatio: 0.2, //可选。同minBoxWidthRatio，当设置aspectRatio时，minBoxHeight值设置无效。minBoxHeight值由minBoxWidth 和 aspectRatio自动计算得到。
      initialBoxWidthRatio: 0.6, //可选。剪裁框初始大小比率。默认值0.6，即剪裁框默认宽度为图片宽度的0.6倍。
      initialBoxHeightRatio: 0.6 //可选。同initialBoxWidthRatio，当设置aspectRatio时，initialBoxHeightRatio值设置无效。initialBoxHeightRatio值由initialBoxWidthRatio 和 aspectRatio自动计算得到。
    });
  },

  onShareAppMessage: function (options) {
   
  },
})