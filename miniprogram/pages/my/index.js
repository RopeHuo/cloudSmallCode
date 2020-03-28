// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgInfo: "",
    code: 654321,
    goodsId: 123456,
    userName: "ropeHuo"
  },
  getCode() {
    wx.cloud.callFunction({
      name: "getcode",
      data: {
        info:`c=${this.data.code}&g=${this.data.goodsId}&s=${this.data.userName}`
      }
    }).then(res => {
      console.log(res)
      let qrImg = "data:image/png;base64," + wx.arrayBufferToBase64(res.result.buffer)
      this.setData({
        imgInfo: qrImg
      })
    })
  },
  getCodeInfo() {
    // 获取小程序码信息参考一下文章
    // https://blog.csdn.net/brightming/article/details/81953571
    // https://blog.csdn.net/weixin_42143687/article/details/81568492
    wx.scanCode({
      success: (res) => {
        var path = res.path;
        console.log(path)
        //微信开发者工具 在开发者工具里出现乱码需要decodeURIComponent转义,真机不需要,可以直接使用
        //分割字符串获取query
        path = path.split("?");
        var scene = path[1];
        // 正则去除开头无用的scene=
        var reg = new RegExp("scene=", "g");
        var scene = scene.replace(reg, "");
        //手机和开放者工具不一样的地方就在这几步了
        //在手机上省略这一步,开发者工具需要解密，（等待测试）
        var scene = decodeURIComponent(scene);
        var sceneArr = scene.split("&");
        var list = {};
        for (var i = 0; i < sceneArr.length; i++) {
          var b = sceneArr[i].split("=");
          list[b[0]] = b[1];
        }
        console.log(list);

      }
    });
  },
  saveImg(img) {
    var imgSrc = this.data.imgInfo; //base64编码
    var save = wx.getFileSystemManager();
    var number = Math.random();
    save.writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
      data: imgSrc.slice(22),
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: function(res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function(err) {
            console.log(err)
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onGotUserInfo: function(e) {

  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})