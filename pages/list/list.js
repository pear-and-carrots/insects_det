import {
  selectVague,
  Menu,
  selectMenuId
} from '../../api/user.js'
const TOP_DISTANCE = 1000;
const baseUrl = getApp().globalData.baseUrl
Page({
  data: {
    noramalData: [{
        "Cover": "../../images/management.png",
        "CoverHeight": 467,
        "CoverWidth": 350
      },
      {
        "Cover": "../../images/tjtp.png",
        "CoverHeight": 871,
        "CoverWidth": 672
      }
    ],
    fixList: [],
    location: '地区',
    showBackTop: false,
    tipList: [{
        id: 0,
        text: "在松褐天牛幼虫期,树干喷洒虫线清乳油80倍液,喷药量为2～3l/株。"
      },
      {
        id: 1,
        text: "对疫区尚未出现病害症状的松树施药,树干打孔注入虫线清1:1乳剂400ml/m3或林冠层喷洒绿色威雷300～400倍液,750～1200 ml/hm2,预防病害发生。"
      }, {
        id: 2,
        text: "松材线虫通过松褐天牛补充营养时产生的伤口进入木质部,寄生在树脂道中并进行大量繁殖。一般在5月底至6月初开始发病,7～8月份病死树数量达到高峰。"
      }, {
        id: 3,
        text: "产地检疫时,在幼虫期调查林木是否有网幕,蛹期调查化蛹场所是否有越冬或越夏的蛹。调运检疫时,检查应检物表面是否有成虫、卵、幼虫和蛹。"
      },
    ],
    list: [],
    // list: [{
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "<p>在林业发展进程中，要想提升工作的基本质量，就要将林区建设工作和质量防控机制结合在一起，有效从規划监管体系出发，结合广东省平远县地区特点，落实生物学特征以及发展规律研究机制，发挥技术手段的优势，确保能减少病虫害问题造成的影响。本文简要分析了林业病虫害防治的意义，并集中讨论了具体的防治措施，仅供参考。</p><p><br></p><p>1林业病虫害防治的意义</p><p><br></p><p>对于林业监管工作而言，病虫害防治机制具有重要的意义和价值，相关部门要搭建更加系统化的监督维护模式，</p><p><br></p><p>（作者单位：514629广东省平远县泗水农业服务中心）</p>",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }, {
    //   "title": "昆虫标题啊是标题啊",
    //   "author": "林更新",
    //   "dec": "资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗资讯内容啊是内容啊你敢相信吗",
    //   "look": 500,
    //   "collect": 20,
    //   "detailImg": "../../images/K7.jpg",
    //   "authorImg": "../../images/K7.jpg"
    // }],
    choose: false,
    animationData: {},
    stopBtn: true, //动画未执行完之前禁用按钮
    showId: 1,
    page: 1
  },
  //以本地数据为例，实际开发中数据整理以及加载更多等实现逻辑可根据实际需求进行实现   
  onLoad: function (options) {
    var that = this;
    this.Menu()
  },

  // 获取菜单
  Menu: function () {
    Menu({}).then(res => {
      console.log(res)
      this.setData({
        fixList: res,
        menuId: res[0].menuId,
        showId: res[0].id
      })
      this.selectMenuId()
    }).catch(error => {
      console.log("error", error)
    })
  },

  // 获取相关栏目文章
  selectMenuId: function () {
    wx.showLoading()
    console.log(this.data.menuId)
    selectMenuId({
      menuId: this.data.menuId,
      page: this.data.page,
      pageSize: 10
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (this.data.list.length == 0) {
        this.setData({
          list: res.list
        })
      } else if (this.data.list.length != 0 && res.list.length != 0) {
        let list = this.data.list
        list.push(res.list)
        this.setData({
          list: list
        })
      } else if (this.data.list.length != 0 && res.list.length == 0) {
        this.setData({
          noneMore: true
        })
      }
    }).catch(error => {
      console.log("error", error)
    })
  },

  //侧标菜单栏
  chooseFix: function (e) {
    this.setData({
      showId: e.currentTarget.dataset.id,
      page: 1,
      menuId: e.currentTarget.dataset.menuid,
      list: []
    })
    this.selectMenuId()
  },

  //一键回到顶部
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    this.setData({
      showBackTop: scrollTop >= TOP_DISTANCE
    })
  },

  close: function () {
    console.log("sssssssssss")
  },

  onShow: function () {
    if (wx.getStorageSync('cityName') == 0) {
      this.setData({
        location: "地区"
      })
    } else {
      this.setData({
        location: wx.getStorageSync('cityName')
      })
    }
  },

  // 导航
  showContent: function (e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      duration: 500, // 动画持续时间
      timingFunction: 'linear' // 定义动画效果，当前是匀速
    })
    that.animation = animation
    animation.height("0").opacity(0).step()
    let length = this.data.fixList.length
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      choose: true,
      width: 170,
      height: 110 * length,
    })
    // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
    setTimeout(function () {
      animation.height("60rpx").opacity(1).step({
        duration: 500
      })
      that.setData({
        animationData: animation.export(),
      })
    }, 50)
    //在动画时间禁用按钮
    setTimeout(function () {
      that.setData({
        stopBtn: false
      })
    }, 500)
  },

  // 隐藏
  hideContent: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.height(0).opacity(0).step({
      duration: 500
    })
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.height("60rpx").step();
      that.setData({
        animationData: animation.export(),
        choose: false,
        width: 100,
        height: 80
      })
    }, 500)
    //收回动画开始禁用按钮
    that.setData({
      stopBtn: true,
    })
  },

  bindList: function (e) {
    wx.navigateTo({
      url: '../news/news?articleId=' + e.currentTarget.dataset.articleid,
    })
  },

  onReachBottom: function () {
    console.log("到底了")
    let page = this.data.page + 1
    this.setData({
      page: page
    })
    this.selectMenuId()
  },

  onPullDownRefresh: function () {
    console.log("上拉刷新")
  },

  onShareAppMessage: function (options) {

  },
})