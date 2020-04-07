import fetch from "../../utils/fetch";

// pages/login/login.js
Page({
  //   页面的初始数据
  data: {

  },
  wxLogin(e) {
    console.log(e);
    // 如果用户拒绝了则return
    if (e.detail.errMsg === "getUserInfo:fail auth deny") return

    // 否则获取用户信息并进行微信授权登录
    const {
      avatarUrl: avatar,
      nickName: nickname
    } = e.detail.userInfo

    // 获取登录的临时code
    wx.login({
      success: async ({
        code
      }) => {
        console.log(code);
        // 如果成功获得code则发送请求进行登录
        if (code) {
          let res = await fetch({
            url: "user/wxlogin",
            method: "POST",
            data: {
              code,
              nickname,
              avatar
            }
          })
          console.log(res);
          // 弹出消息
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })

          if (res.data.status === 0) {
            // 保存到本地
            wx.setStorageSync('token', res.data.token)

            // 跳转到首页
            wx.reLaunch({
              url: '/pages/home/home',
            })
          }
        }
      },
      fail: err => {
        console.log('...获取code失败了...')
      }
    })
  },

  // 跳转至手机号登录页面
  toPhoneLogin() {
    wx.navigateTo({
      url: '/pages/phone-login/phone-login'
    })
  }
})