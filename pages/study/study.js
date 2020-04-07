// pages/study/study.js
import fetch from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:false, //是否为空【是否有学习记录】
    studyProgresses:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 获取学习进度数据
    this.getStudyProgressData()
  },
    
  async getStudyProgressData(){
    let res = await fetch({url: 'study/progress'})
    console.log(res);
    res.data.message.forEach(item => {
      if(item.study_progress<=33){
        item.color = "#ff0000"
      }else  if(item.study_progress>33 && item.study_progress<=66){
        item.color = "#ff783b"
      }else{
        item.color = "#b4d66e"
      }
    });
    this.setData({
      isEmpty: res.data.message.length  === 0,
      studyProgresses: res.data.message
    })
  }
})