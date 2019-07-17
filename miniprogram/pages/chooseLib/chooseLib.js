// pages/chooseLib/chooseLib.js
const app = getApp()
var downrec = require("../../utils/downrec")
Page({

  data: {
    photoVideoList:[],
    position: {},
    addVlue: false,
    nowAge: "",
    contentValue: true,
    loadingValue: false,
    boLoadingValue: false,
    pubtime: "",
    showVideo: false,
    modalValue: true,
    toastValue: true,
    currentId: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.photolist)
    var rever = JSON.parse(JSON.stringify(app.photolist));
    rever = rever.reverse()
    console.log(rever)
    this.setData({
      photoVideoList: rever
    })
    this.refreshPhoto()

    console.log(this.data.photoVideoList)

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
    this.refreshPhoto()
    this.onLoad()

  },

  refreshPhoto: function(e){
    const openid = app.globalData.openid
    const db = wx.cloud.database()

    // 查询当前用户所有的 counters

    db.collection('animal').where({
      _openid: openid
    }).get({
      success: res => {
        var download = res.data
        console.log('[数据库] [查询记录] 成功: ', res)
        console.log(download)
        app.photolist = download

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    console.log(app.photolist)

  },

  // 跳转到photoDetail页
  toPhotoDetail: function (e) {
    //getApp().doToPhotoDetail(e)
    var photodata = JSON.stringify(e.currentTarget.dataset);
    console.log(e.currentTarget.dataset);
    photodata = encodeURIComponent(photodata);
    wx.navigateTo({
      url: '/pages/photodetail/photodetail?photoData=' + photodata 
    })
  },
  // 选项弹窗
  selectBox: function (e) {
    var that = this
    console.log(e.currentTarget)
    console.log(e.currentTarget.offsetLeft, e.currentTarget.offsetTop)

    wx.showActionSheet({
      itemList: ['删除'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          that.deletePhotoOrVideo(e)
          console.log("关闭删除")
          that.refreshPhoto(e)
          that.onLoad()
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  deletePhotoOrVideo: function (e) {
    var _this = this
      var id = e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index
      console.log("id", e.currentTarget.dataset.id)
      console.log("index", index)
      const db = wx.cloud.database()
      db.collection('animal').doc(id).remove({
         success: res => {
           wx.showToast({
             title: '删除成功',
           })
           /*this.setData({
             counterId: '',
             count: null,
           })*/
         },
         fail: err => {
           wx.showToast({
             icon: 'none',
             title: '删除失败',
           })
           console.error('[数据库] [删除记录] 失败：', err)
         }
       })

    
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
    return {
      title: 'AI动物识别小程序',
      path: '/pages/index/index',
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 500
          });
        }
      },
      fail: function (res) {
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: '分享取消',
            icon: 'loading',
            duration: 500
          })
        }
      }
    }

  }
})