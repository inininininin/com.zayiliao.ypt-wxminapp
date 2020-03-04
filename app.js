//app.js
App({
  
  globalData: {
    loginHospitalId: '',
    loginHpitalName: '',
    userInfo: null,
    userInfoDetail: [],
    entity: [],
    url: 'https://ypt.njshangka.com',
    version: '2003041740-30bf493',
    cookie: '',
    withoutLogin:'',
  },
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    const vm = this
    wx.getSystemInfo({
      success: function (res) {
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        vm.globalData.statusBarHeight = res.statusBarHeight
        vm.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        vm.globalData.statusBarHeight = 0
        vm.globalData.titleBarHeight = 0
      }
    })
    wx.request({
      url: vm.globalData.url+'/oss/alive/config.json',
      success(res){
        vm.globalData.entity=res.data
      }
    })
  },
  cover(_cover){
    var that=this
    if(_cover&&_cover.slice(0,1)!='h'){
      _cover=that.globalData.url+_cover
    }
    return _cover

  },
  historyUrl(){
    var pages = getCurrentPages()               //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url ='..'+ currentPage.route.split('pages')[1] 
    return url
  },
})