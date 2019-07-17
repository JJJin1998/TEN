//index.js
const app = getApp()
var api = require('../../utils/baiduai.js');
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;

Page({
  data: {
    
    motto: 'OCR',
    result: [],
    images: {},
    img: '',
    base64img: ''

  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },    

  onShareAppMessage: function () {
    return {
      title: '疯狂动物城',
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
  },
  clear: function (event) {
    console.info(event);
    wx.clearStorage();
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  uploads: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //console.log( res )
        if (res.tempFiles[0].size > 4096 * 1024) {
          wx.showToast({
            title: '图片文件过大哦',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          that.setData({
            img: res.tempFilePaths[0]
          })
        }
        wx.showLoading({
          title: "动物识别中...",
          mask: true
        })
        //根据上传的图片读取图片的base64
        var fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: res.tempFilePaths[0].toString(),
          encoding: 'base64',
          success(res) {
            //获取到图片的base64 进行请求接口
            //api.ocrGeneralRequestByImage(res.data,{
            api.animalRequestByImage(res.data, {
              success(res) {
                console.info(typeof (res.error_code) == "undefined");
                if (typeof (res.error_code) != "undefined") {
                  wx.hideLoading();
                  wx.showModal({
                    showCancel: false,
                    title: '错误码:' + res.error_code,
                    content: '错误信息:' + res.error_msg
                  })
                } else {
                  if (res.result.length > 0) {
                    wx.hideLoading();
                    let dataList = res.result;
                    console.log(dataList);
                    console.log(dataList[0].name);
                    //如果需要处理可以在这里操作哦
                    that.setData({
                      result: dataList,
                      //Details:that.data.Details

                    })
                    //绘制图表
                    var windowWidth = 320;
                    try {
                      var res = wx.getSystemInfoSync();
                      windowWidth = res.windowWidth;
                    } catch (e) {
                      console.error('getSystemInfoSync failed!');
                    }

                    pieChart = new wxCharts({
                      animation: true,
                      canvasId: 'pieCanvas',
                      type: 'pie',
                      series: [{
                        name: dataList[0].name,
                        data: dataList[0].score*100,
                      }, {
                          name: dataList[1].name,
                          data: dataList[1].score*100,
                      }, {
                          name: dataList[2].name,
                          data: dataList[2].score *100,
                      }, {
                          name: dataList[3].name,
                          data: dataList[3].score * 100,
                      }, {
                          name: dataList[4].name,
                          data: dataList[4].score * 100,
                      }],
                      width: windowWidth-30,
                      height: 300,
                      dataLabel: true,
                    });




                    console.log(that.data.result);
                  } else {
                    wx.hideLoading();
                    wx.showModal({
                      showCancel: false,
                      title: '温馨提示',
                      content: '貌似没有识别出结果'
                    })
                  }
                }
              }
            })
          }
        })
      },
    })
  },
  openDetails: function (e) {
    var detailsdata = JSON.stringify(this.data.result);
    var picture = JSON.stringify(this.data.img);
    console.log(this.data.result);
    detailsdata = encodeURIComponent(detailsdata);
    picture = encodeURIComponent(picture);
    wx.navigateTo({
      url: '/pages/details/details?detailsData=' + detailsdata + '&picture='+ picture,
    })
  },

onLoad: function (options) {
    
},
  seephoto: function (e) {
    wx.navigateTo({
      url: '../chooseLib/chooseLib'
    })
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
  }









})
