var app = getApp();
var api = require('../../utils/baiduai.js');
Page({
  data: {
    openid: '',
    area: [],
    list: [],
    picture:'',
    picpath:''
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this
    console.log(options);
    var mylist = JSON.parse(decodeURIComponent(options.detailsData));
    var mypicture = JSON.parse(decodeURIComponent(options.picture));
    console.log(mylist);
    that.setData({
      list: mylist,
      picture : mypicture
    })

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
   
    //var myarea = [0,0];
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(res);
        //that.loadCity(latitude, longitude);
        //myarea = [latitude,longitude];
        that.data.area[0] = latitude;
        that.data.area[1] = longitude;
        that.setData({
          area: that.data.area
        })
      }
    })

    let filePath = this.data.picture;
    let suffix = /\.[^\.]+$/.exec(filePath)[0];
    //var details = {};
    wx.cloud.uploadFile({     //这一段是上传到云数据中的
      cloudPath: new Date().getTime() + suffix,
      filePath: that.data.picture,    //这个就是图片的存储路径
      success: res => {
        console.log('[上传图片]成功:', res)
        that.setData({
          picpath: res.fileID,
        })
        console.log(that.data.picpath)
      },
      fail: err => {
        console.log('[上传图片]失败:')
        console.log(error)
      },


    })
  },
  
  onloadinfor: function (e) {

    const db = wx.cloud.database();
    const collections = db.collection('animal');
    var mytime = new Date();
    var that = this;
    collections.add({
      data: {
        animals: {
          name: that.data.list[0].name,
          pic: that.data.picpath,
          des: that.data.list[0].baike_info.description
        },
        time: mytime,
        area: that.data.area
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

   
  },

  scroll: function (e) {
    //console.log(e)
  },

  

})