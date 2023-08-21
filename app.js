// app.js
App({
  onLaunch() {
    const dict = wx.getStorageSync('dict') || {id: 'cet4', name: 'CET-4', index: 0};
    this.globalData.dict = dict;
    const level = wx.getStorageSync('difficultyLevel') || 1;
    this.globalData.difficultyLevel = level;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    dict: {id: 'cet4', name: 'CET-4', index: 0},
    difficultyLevel: 1,
  }
})
