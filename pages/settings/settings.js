import { getDictLibs, getDifficultyLevel } from '../../utils/util.js'

const app = getApp();

Page({
  data: {
    dictName: 'CET-4',
    difficultyLevel: '中等',
    showActionsheet: false,
    groups: [
        { text: '示例菜单', value: 1 },
        { text: '示例菜单', value: 2 },
        { text: '负向菜单', type: 'warn', value: 3 }
    ],
    isSelectDictLib: false,
  },
  onLoad() {

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
      app.globalData.dict.name = name;
      if (this.data.dictName !== name) {
        app.globalData.isNeedReload = true;
      }
      this.setData({dictName: name})
      //TODO: get dict index from cache
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