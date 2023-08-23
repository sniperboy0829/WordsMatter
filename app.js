// app.js
import { getDictLibs } from './utils/util.js';

App({
  onLaunch() {
    wx.setInnerAudioOption({obeyMuteSwitch: false});
    const currentDictID = wx.getStorageSync('currentDictID') || 'cet4';
    this.globalData.currentDictID = currentDictID;
    const dict = wx.getStorageSync(currentDictID);
    if (!dict) {
      this.globalData.dict = {id: 'cet4', name: 'CET-4', length: 2607, index: 0, right: [], wrong: []};
      const libs = getDictLibs();
      for (const item of libs) {
        if (item.id === currentDictID) {
          this.globalData.dict = {id: item.id, name: item.name, length: item.length, index: 0, right: [], wrong: []};
          break;
        }
      }
    } else {
      this.globalData.dict = dict;
    }
    const level = wx.getStorageSync('difficultyLevel') || 1;
    this.globalData.difficultyLevel = level;
  },
  globalData: {
    currentDictID: 'cet-4',
    dict: {},
    difficultyLevel: 1,
    // statistics: {},
    isNeedReload: false,
  }
})
