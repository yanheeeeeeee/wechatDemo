import fetch from "../../utils/fetch"

// pages/phone-login/phone-login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipName: "获取验证码",
    phone: "",
    vcode: "",
    timer: null,
    count: 0,
    isCountDown: false
  },

  // 监听输入事件
  changeValue(e) {
    // 通过监听输入事件, 将事件源中的value赋值给事件源data-name对应的数据
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
    // console.log(`手机号:${this.data.phone} ,验证码:${this.data.vcode}`);

  },

  // 获取短信验证码事件
  async getVcode() {
    // 验证手机号格式
    var reg = /^1[3456789][0-9]{9}$/
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号不合法',
        icon: "none"
      })
      return
    }

    // 格式正确则开始倒计时
    // 确认是否在倒计时
    if (this.data.isCountDown) return

    // 倒计时
    this.setData({
      isCountDown: true
    })
    this.data.count = 60
    this.setData({
      tipName: this.data.count
    })
    this.data.timer = setInterval(() => {
      this.data.count--;
      this.setData({
        tipName: this.data.count
      })
      if (this.data.count === 0) {
        clearInterval(this.data.timer)
        this.setData({
          tipName: "获取验证码"
        })
        this.setData({
          isCountDown: false
        })
      }
    }, 1000);

    // 发送请求获取验证码
    let res = await fetch({
      url: "user/vcode",
      data: {
        phone: this.data.phone
      },
    })

    console.log(res);
    if (res.data.status === 0) {
      wx.showToast({
        title: `${res.data.vcode}`,
        icon: "none"
      })
    }
  },

  // 登录事件
  async phoneLogin() {
    let res = await fetch({
      url: "user/login",
      method: "POST",
      data: {
        phone: this.data.phone,
        vcode: this.data.vcode
      }
    })

    console.log(res);

    // 显示登录提示
    wx.showToast({
      title: res.data.message,
      icon: 'none'
    })

    // 登录成功则
    if (res.data.status === 0) {
      // 保存到本地
      wx.setStorageSync('token', res.data.token)

      // 跳转到首页
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})