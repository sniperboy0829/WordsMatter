import { getDictLibs, getDifficultyLevel } from '../../utils/util.js'

const app = getApp();

Page({
  data: {
    dictName: 'CET-4',
    difficultyLevel: '中等',
    showActionsheet: false,
    groups: [
        { text: '', value: 1 },
        { text: '', value: 2 }
    ],
    isSelectDictLib: false,
  },
  onLoad() {
    const leves = getDifficultyLevel();
    let l = '一般';
    for (const i of leves) {
      if (i.id === app.globalData.difficultyLevel) {
        l = i.name;
        break;
      }
    }
    this.setData({dictName: app.globalData.dict.name, difficultyLevel: l});
  },
  tapDifficultyLevel() {
    const leves = getDifficultyLevel();
    const g = leves.map((item) => { return {text: item.name, value: item.id}}); 
    this.setData({groups:g, isSelectDictLib: false, showActionsheet: true});
  },
  tapDictLib() {
    const libs = getDictLibs();
    const g = libs.map((item) => { return {text: item.name, value: item.id}}); 
    this.setData({groups:g, isSelectDictLib: true, showActionsheet: true});
  },
  close: function () {
    this.setData({
        showActionsheet: false
    })
  },
  actionTap(e) {
    console.log(e);
    const v = e.detail.value;
    const name = this.data.groups[e.detail.index].text;
    if (this.data.isSelectDictLib) {
      app.globalData.dict.id = v;
      app.globalData.currentDictID = v;
      app.globalData.dict.name = name;
      if (this.data.dictName !== name) {
        //read dict index from cache
        const dict = wx.getStorageSync(v);
        if (!dict) {
          const libs = getDictLibs();
          for (const item of libs) {
            if (item.id === v) {
              app.globalData.dict = {id: item.id, name: item.name, length: item.length, index: 0, right: [], wrong: []};
              break;
            }
          }
        } else {
          app.globalData.dict = dict;
        }
        app.globalData.isNeedReload = true;
      }
      this.setData({dictName: name})
      //save to storage
      wx.setStorageSync('currentDictID', app.globalData.currentDictID);
    } else {
      app.globalData.difficultyLevel = v;
      if (this.data.difficultyLevel !== name) {
        app.globalData.isNeedReload = true;
      }
      this.setData({difficultyLevel: name})
    }
    this.close();
  }
})