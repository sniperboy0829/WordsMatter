// index.js
import { getDict, CET4 } from '../../utils/dicts.js'
import { getRandomIndexes } from '../../utils/util.js'

// 获取应用实例
const app = getApp()

Page({
  data: {
    characters: [{id: String, name: String, mutable: Boolean}],
    words: [{id: String, name: String, trans: String, usphone: String, ukphone: String}],
    examIndex: 0
  },

  onTagTap(event) {
    console.log('tag 组件点击');
  },

  handleTap() {
    console.log("view tapped");
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    const json = getDict(CET4);
    const data = JSON.parse(json)
    let arr = []
    for (let i = 0; i < data.length; i++) {
      const item = data[i]; 
      const tmp = {id: `${i}`, name: item.name, trans: item.trans, usphone: item.usphone, ukphone: item.ukphone}
      arr.push(tmp);
    }
    this.setData({words: arr})
    const word = arr[this.data.examIndex]
    const randomIndexes = getRandomIndexes(word.name.length, 2)
    let cArr = []
    for (let i = 0; i < word.name.length; i++) {
      const c = {id: `${i}`, name: word.name[i], mutable: randomIndexes.indexOf(i) !== -1}
      cArr.push(c)
    }
    this.setData({characters: cArr})
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
