var app = getApp()
import Poster from './../../miniprogram_dist/poster/poster';
Page({
  data: {
    imgUrls:'',
    description:'',
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 200,
    swiperHeight: null,
    posterConfig: {
      width: 750,
      height: 1334,
      backgroundColor: '#fff',
      debug: false,
      blocks: [
        {
          width: 690,
          height: 808,
          x: 30,
          y: 183,
          borderWidth: 2,
          borderColor: '#f0c2a0',
          borderRadius: 20,
        },
        {
          width: 634,
          height: 74,
          x: 59,
          y: 770,
          backgroundColor: '#fff',
          opacity: 0.5,
          zIndex: 100,
        },
      ],
      texts: [
        {
          x: 113,
          y: 61,
          baseLine: 'middle',
          text: '1',
          fontSize: 32,
          color: '#8d8d8d',
        },
        /* {
           x: 30,
           y: 113,
           baseLine: 'top',
           text: '1',
           fontSize: 38,
           color: '#080808',
         },
         {
           x: 92,
           y: 810,
           fontSize: 38,
           baseLine: 'middle',
           text: '标题',
           width: 570,
           lineNum: 1,
           color: '#8d8d8d',
           zIndex: 200,
         },
         {
           x: 59,
           y: 895,
           baseLine: 'middle',
           text: [
             {
               text: '1',
               fontSize: 28,
               color: '#ec1731',
             },
             {
               text: '1',
               fontSize: 36,
               color: '#ec1731',
               marginLeft: 30,
             }
           ]
         },
         {
           x: 522,
           y: 895,
           baseLine: 'middle',
           text: '1',
           fontSize: 28,
           color: '#929292',
         },
         {
           x: 59,
           y: 945,
           baseLine: 'middle',
           text: [
             {
               text: '1',
               fontSize: 28,
               color: '#929292',
             },
             {
               text: '1',
               fontSize: 28,
               color: '#929292',
               marginLeft: 50,
             },
             {
               text: '1',
               fontSize: 28,
               color: '#929292',
               marginLeft: 50,
             },
           ]
         },
         {
           x: 360,
           y: 1065,
           baseLine: 'top',
           text: '长按识别小程序码',
           fontSize: 38,
           color: '#080808',
         },
         {
           x: 360,
           y: 1123,
           baseLine: 'top',
           text: '1',
           fontSize: 28,
           color: '#929292',
         },*/
      ],
      images: [
        {
          width: 62,
          height: 62,
          x: 30,
          y: 30,
          borderRadius: 62,
          //tempFilePaths: '',
          url: "../../images/code-func-sum.png",
        },
        /* {
           width: 634,
           height: 634,
           x: 59,
           y: 210,
           url: '',
         },
         {
           width: 220,
           height: 220,
           x: 92,
           y: 1020,
           url: '',
         },
         {
           width: 750,
           height: 90,
           x: 0,
           y: 1244,
           url: '',
         }*/
      ]

    }

  },
  onLoad: function (options) {

    var that = this
    console.log(options);
    var mylist = JSON.parse(decodeURIComponent(options.photoData));
    console.log(mylist);
    var mydes = JSON.stringify(mylist.des);
    console.log(mydes);
    //mydes = alert(mydes.split('。')[1]);
    that.setData({
      imgUrls: mylist.pic,
      description: mylist.des
    })
    this.getSwiperHeight()
  },
  getSwiperHeight: function () {
    var _this = this
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        _this.setData({
          swiperHeight: windowHeight
        })
        console.log('windowWidth: ' + windowWidth)
        console.log('windowHeight: ' + windowHeight)

      }
    })
  },
  onPosterSuccess(e) {
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.error(err);
  },
  // 跳转到photo-detail页
  back: function () {
    wx.navigateBack({
      url: '../chooseLib'
    })
  },
})
