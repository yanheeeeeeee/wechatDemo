// pages/home/home.js
const app = getApp()
import fetch from "../../utils/fetch.js"
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    courseList: [],
    videos: [], // 热门视频
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

    // 点击搜索框跳转至搜索页面
    toSearchPage(){
      wx.navigateTo({
        url: '../search_page/search_page',
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取轮播图
    let res = await fetch({url:"home/swipers"})
    console.log(res);
    this.setData({swiperList:res.data.message})

    // 获取推荐课程
    let res2 = await fetch({url:"home/course"})
    console.log(res2);
    this.setData({courseList:res2.data.message})
    
    
  // 获取推荐课程数据
    const res3 = await fetch({url: 'home/video'})
    this.setData({
      videos: res3.data.message
    })
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