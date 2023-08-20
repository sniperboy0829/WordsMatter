import { getDictLibs, getDifficultyLevel } from '../../utils/util.js'

Page({
  data: {
    showActionsheet: false,
    groups: [
        { text: '示例菜单', value: 1 },
        { text: '示例菜单', value: 2 },
        { text: '负向菜单', type: 'warn', value: 3 }
    ]
  },
  onLoad() {

  },
  tapDifficultyLevel() {
    const leves = getDifficultyLevel();
    const g = leves.map((item) => { return {text: item.name, value: item.id}}); 
    this.setData({groups:g ,showActionsheet: true});
  },
  tapDictLib() {
    const libs = getDictLibs();
    const g = libs.map((item) => { return {text: item.name, value: item.id}}); 
    this.setData({groups:g ,showActionsheet: true});
  },
  close: function () {
    this.setData({
        showActionsheet: false
    })
  },
  btnClick(e) {
      console.log(e);
      const v = e.detail.value;
      console.log(`value:${v}`);
      this.close();
  }
})