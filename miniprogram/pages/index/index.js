// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  gotoComment:function(e){
    var moveid = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: `../comment/index?moveid=${moveid}`,
    })
  },
  getInfo:function(){
    wx.showLoading({
      title: '正在加载'
    }),
    wx.cloud.callFunction({
      name: "movelist",
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      })
      wx.hideLoading()//隐藏上面的加载中
    })
  },
  onLoad: function (options) {
    this.getInfo()
    var scene = decodeURIComponent(options.scene)
    wx.showToast({
      title: JSON.stringify(scene),
      duration:10000
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
    this.getInfo()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})