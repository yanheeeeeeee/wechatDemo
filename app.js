//app.js
App({
  onLaunch: function () {
    // 小程序一打开将token取出来存入全局变量中
    this.globalData.token = wx.getStorageSync('token')||''
    // 如果有token则直接跳转去首页
    if(this.globalData.token){
      wx.reLaunch({
        url: '/pages/home/home'
      })
    }
  },
  globalData: {
    token: null
  }
})