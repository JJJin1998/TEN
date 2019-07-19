let accessToken = '******'//自己获取的动物识别accessToken
let animalUrl = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal';//动物识别接口
//动物识别接口 
let animalRequestByImage = (base64Img, callback) => {
  //拼接接口body参数
  let params = {
    top_num: 5,
    image: base64Img,
    baike_num: 5
  }
  //发送接口请求
  wx.request({
    url: animalUrl + '?access_token=' + accessToken,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)


      //处理加在这里

    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
/*//EasyDL接口 图片数据 返回结果条数 根据物体 分类 文本 请修改第二个参数哦
let easyDLRequest = (base64Img,topNum,callback)=>{
  //拼接接口body参数
  let params = {
     top_num:topNum,
     image:base64Img
  }
  //发送接口请求
  wx.request({
    url: easydlUrl + '?access_token=' + accessToken,
    data:params,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success:function(res){
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}*/
/*//OCR通用识别接口 图片base64 只是简单示例 别的参数如何封装建议自己学习一下JavaScript
let ocrGeneralRequestByImage = (base64Img,callback) => {
  //拼接接口body参数
  let params = {
    detect_direction:true,
    image: base64Img
  }
  //发送接口请求
  wx.request({
    url: ocrGenerallUrl + '?access_token=' + accessToken,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res.data)
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}*/
//暴露出去的接口
module.exports = {
  //easyDLRequest: easyDLRequest,
  // ocrGeneralRequestByImage: ocrGeneralRequestByImage,
  animalRequestByImage: animalRequestByImage
}
