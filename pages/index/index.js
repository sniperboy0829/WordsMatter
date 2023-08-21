// index.js
import { getRandomIndexes, getDict } from '../../utils/util.js'

// 获取应用实例
const app = getApp()

Page({
  data: {
    characters: [{id: String, name: String, mutable: Boolean, fill: String}],
    missChars: [{name: String}],
    //result: 0-init, 1-wrong, 2-right
    words: [{id: String, name: String, trans: String, usphone: String, ukphone: String, result: Number}],
    wIndex: 0
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
    //check word if condition meets
    const f = chars.filter(item => item.fill === "")
    if (f.length === 0) {
      this.checkWord();
    }
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

  onShow() {
    wx.setNavigationBarTitle({title: app.globalData.dict.name});
    const json = getDict(app.globalData.dict.id);
    const data = JSON.parse(json)
    let arr = []
    for (let i = 0; i < data.length; i++) {
      const item = data[i]; 
      const tmp = {id: `${i}`, name: item.name, trans: item.trans, usphone: item.usphone, ukphone: item.ukphone,result: 0};
      arr.push(tmp);
    }
    const word = arr[app.globalData.dict.index];
    const randomIndexes = getRandomIndexes(word.name.length)
    let cArr = []
    for (let i = 0; i < word.name.length; i++) {
      const name = word.name[i]
      const m = randomIndexes.indexOf(i) !== -1
      const c = {id: `${i}`, name: name, mutable: m, fill: m ? "" : name}
      cArr.push(c)
    }

    let mArr = [];
    for (let i = 0; i < randomIndexes.length; i++) {
      const o = randomIndexes[i];
      const name = word.name[o];
      const m = {"name": name}
      mArr.push(m);
    }
    this.setData({words: arr, wIndex: app.globalData.dict.index, characters: cArr, missChars: mArr});
  },

  checkWord() {
    let t = this.data.words[this.data.wIndex];
    let target = JSON.parse(JSON.stringify(t));
    const names = this.data.characters.map(item => item.fill);
    const nameStr = names.join("");
    let result = 1;
    if (target.name === nameStr) {
      result = 2;
    }
    target.result = result;
    this.setData({[`words[${this.data.wIndex}]`]: target});
  },
  next() {
    if (this.data.wIndex === this.data.words.length - 1) {
      wx.showModal({
        title: '恭喜',
        content: '您已完成所有单词，挑战下一个词库吧🎉',
        showCancel: false
      });
      return
    }
    const nextIndex = ++this.data.wIndex;
    app.globalData.dict.index = nextIndex;
    this.setData({wIndex: nextIndex});
    this.generateCharacters(nextIndex);
  },

  generateCharacters(index) {
    const word = this.data.words[index];
    const randomIndexes = getRandomIndexes(word.name.length)
    let cArr = []
    for (let i = 0; i < word.name.length; i++) {
      const name = word.name[i]
      const m = randomIndexes.indexOf(i) !== -1
      const c = {id: `${i}`, name: name, mutable: m, fill: m ? "" : name}
      cArr.push(c)
    }
    let mArr = [];
    for (let i = 0; i < randomIndexes.length; i++) {
      const o = randomIndexes[i];
      const name = word.name[o];
      const m = {"name": name}
      mArr.push(m);
    }
    this.setData({characters: cArr,missChars: mArr});
  }
})
