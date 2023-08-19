// index.js
import { getDict, CET4 } from '../../utils/dicts.js'
import { getRandomIndexes } from '../../utils/util.js'

// 获取应用实例
const app = getApp()

Page({
  data: {
    characters: [{id: String, name: String, mutable: Boolean, fill: String}],
    words: [{id: String, name: String, trans: String, usphone: String, ukphone: String}],
    wIndex: 0,
    missChars: [{name: String}]
  },

  onTagTap(event) {
    console.log(`page tap, event name: ${event.target.dataset.name}`);
    const d = event.target.dataset;
    let chars = JSON.parse(JSON.stringify(this.data.characters));
    for (let item of chars) {
      if (item.mutable && item.fill === "") {
        item.fill = d.name;
        break;
      }
    }
    let tempChars = JSON.parse(JSON.stringify(this.data.missChars));
    let deleteIndex = tempChars.findIndex(item => item.name === d.name);
    if (deleteIndex !== -1) {
      tempChars.splice(deleteIndex, 1);
    }
    this.setData({characters: chars, missChars: tempChars});
  },

  handleTap(event) {
    console.log("view tapped");
    const d = event.target.dataset;
    if (!d.mutable || d.fill === "") {
      return;
    }
    let chars = JSON.parse(JSON.stringify(this.data.characters));
    for (let item of chars) {
      if (item.id === d.id) {
        item.fill = "";
        break;
      }
    }
    let tempChars = JSON.parse(JSON.stringify(this.data.missChars));
    tempChars.push({name: d.fill});
    this.setData({characters: chars, missChars: tempChars});
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
    const word = arr[this.data.wIndex]
    const n = Math.floor(word.name.length * 0.8);
    const randomIndexes = getRandomIndexes(word.name.length, n)
    let cArr = []
    for (let i = 0; i < word.name.length; i++) {
      const name = word.name[i]
      const m = randomIndexes.indexOf(i) !== -1
      const c = {id: `${i}`, name: name, mutable: m, fill: m ? "" : name}
      cArr.push(c)
    }
    this.setData({characters: cArr})
    let mArr = [];
    for (let i = 0; i < randomIndexes.length; i++) {
      const o = randomIndexes[i];
      const name = word.name[o];
      const m = {"name": name}
      mArr.push(m);
    }
    this.setData({missChars: mArr});

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
