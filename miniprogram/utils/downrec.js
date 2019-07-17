const app = getApp()
//var newdownload = []
data:{
  infor:[]
}
module.exports={getPhoto : getPhoto}
function getPhoto() {
  //var _this = this
  const openid = app.globalData.openid
  const db = wx.cloud.database()
 
  // 查询当前用户所有的 counters

  db.collection('animal').where({
    _openid: openid
  }).get({success: res => {
      download = res.data
      console.log('[数据库] [查询记录] 成功: ', res)
      console.log(download)
      data.app.setData({photolist:download})
      
  }, 
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        }
  })
 
  
}