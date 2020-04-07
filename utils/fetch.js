/**
 * 对发送请求的方法进行封装
 * 
 * obj={url,method,data,tipname}
 */

const app = getApp()
 const baseUrl = "http://localhost:3000/api/"

 const fetch=({url,method ="GET",data,tip="正在加载中..."})=>{
      // console.log(url,method,data,tipName);
      app.globalData.token = wx.getStorageSync('token')
      wx.showLoading({
        title: tip,
      })
      return new Promise((resolve,reject)=>{
        // 发送异步请求
        wx.request({
          url: `${baseUrl}${url}`,
          method,
          data,
          header: {Authorization:app.globalData.token},
          success:res=>{
            resolve(res)
          },
          fail:err=>{
            reject(err)
          },
          complete:()=>{
            wx.hideLoading()
          }
        })
      })
 }

 export default fetch