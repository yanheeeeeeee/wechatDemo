//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady: function () {
    console.log('onReady')
    // Do something when page ready.
  },
  onShow: function () {
    console.log('onShow')
    // Do something when page show.
  },
  onHide: function () {
    console.log('onHide')
    // Do something when page hide.
  },
  onUnload: function () {
    console.log('onUnload')
    // Do something when page close.
  }
})