const request = (options) => {
  return new Promise((resolve, reject) => {
    const {
      url,
      data,
      method
    } = options 
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      ...options, 
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let result = res.data
        if (result.status === 0) {
          resolve(result.data)
        } else {
          reject(result.data)
        }
        wx.hideLoading()
      },
      fail: function (error) {
        reject(error)
        wx.hideLoading()
        wx.showToast({
          icon:'none',
          title: '操作失败！',
        })
      }
    })
  })
}
export default request