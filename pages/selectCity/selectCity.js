const app = getApp()
Page({
  
  data: {
    hotCity:['北京','上海','深圳','广州','武汉','重庆'],
    longitude:"",
    latitude:""
  },

  onLoad: function (options) {

  },

  getLocation:function(){
    wx.getLocation({
      success:res=>{
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'http://iwenwiki.com:3002/api/lbs/location',
          data:{
            latitude: latitude,
            longitude: longitude
          },
          success:res=>{
            console.log(res.data.result.ad_info.city)
             var cityName = res.data.result.ad_info.city.slice(0,2);
            
            app.globalData.cityName = cityName
            wx.setStorageSync('cityName', cityName)
            console.log("fffffffffffffff",app);
            wx.switchTab({
              url:'../../pages/list/list',
            })
          }
        })
      }
    })
  },

  selectCity:function(e){
    var cityName = e.currentTarget.dataset.name;
    app.globalData.cityName = cityName;
    wx.setStorageSync('cityName', cityName);
    wx.switchTab({
      url: '../list/list',
    })
  },
  
  onShareAppMessage: function () {

  }
})