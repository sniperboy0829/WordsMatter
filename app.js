// app.js
import { getDictLibs } from './utils/util.js';

App({
  onLaunch() {
    const dict = wx.getStorageSync('dict') || {id: 'cet4', name: 'CET-4', index: 0};
    this.globalData.dict = dict;
    const stat = wx.getStorageSync('statistics');
    if (!stat) {
      console.log(`statistics is not exist`);
      const libs = getDictLibs();
      let sArray = [];
      for (const item of libs) {
        sArray.push({id: item.id, name: item.name, length: item.length, right: [], wrong: []});
      }
      this.globalData.statistics = sArray;
    } else {
      this.globalData.statistics = stat;
    }
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
    dict: {},
    difficultyLevel: 1,
    statistics: {},
    isNeedReload: false,
  }
})
