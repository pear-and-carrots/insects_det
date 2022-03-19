import {
  selectVague
} from '../../api/user.js'
const baseUrl = getApp().globalData.baseUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    city: '',
    array: ['昆虫名字', '昆虫的属', '昆虫的科', '昆虫的目'],
    id: 5,
    pestName: '',
    genusName: '',
    sectionName: '',
    orderName: '',
    list: 1,
    recommendList:[
      {
        params: 'pestName',
        pestid: 'C21701065010',
        backgroundColor: 'red',
        color: '#fff',
        name: "星天牛"
      },{
        params: 'pestName',
        pestid: 'C15408105005',
        backgroundColor: '#ce5923',
        color: '#fff',
        name: "麻皮蝽"
      },{
        params: 'pestName',
        pestid: 'C22301070005',
        backgroundColor: 'yellow',
        name: "黄刺蛾"
      },{
        params: 'pestName',
        pestid: 'C22359050005',
        name: "丝带凤蝶"
      },{
        params: 'pestName',
        pestid: 'C22342015005',
        name: "杨扇舟蛾"
      },
    ]
  },

  onLoad: function (options) {

  },

  bindpicker: function (e) {
    // let id = 
    this.setData({
      id: e.detail.value
    })
  },

  searchInput: function (e) {
    console.log(e)
    this.setData({
      value: e.detail.value,
      params: e.currentTarget.dataset.params
    })
    this.search()
  },

  search: function (e) {
    console.log(e)
    let that = this
    let value = this.data.value
    let params = this.data.params
    let newObject = {
      [params]: value
    };
    console.log(newObject)
    wx.request({
      url: `${baseUrl}/sample/selectVague.do`,
      data: {
        [params]: value
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data,
        })
      }
    })
  },

  // 进入昆虫详情页
  getIntoListDeatil: function (e) {
    console.log(e.currentTarget.dataset.pestid)
    let pestId = e.currentTarget.dataset.pestid
    if(e.currentTarget.dataset.id){
      this.setData({
        id: e.currentTarget.dataset.id,
        name: e.currentTarget.dataset.name
      })
    }
    wx.navigateTo({
      url: '../listDetail/listDetail?pestId=' + pestId + "&authority=0",
    })
  }
})