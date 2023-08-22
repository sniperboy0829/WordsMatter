import uCharts from '../../utils/u-charts.min.js';

const app = getApp();
var uChartsInstance = {};
Page({
  data: {
    cWidth: 750,
    cHeight: 500,
    rightRate: 0,
  },
  onShow() {
    wx.setNavigationBarTitle({title: app.globalData.dict.name});
    //这里的第一个 750 对应 css .charts 的 width
    const cWidth = 750 / 750 * wx.getSystemInfoSync().windowWidth;
    //这里的 500 对应 css .charts 的 height
    const cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
    this.setData({ cWidth, cHeight });
    this.getServerData();
  },
  getServerData() {
    let rCount = 0, wCount = 0, remainingCount = 0;
    const s = app.globalData.dict;
    rCount = s.right.length;
    wCount = Math.min(s.wrong.length, s.length - rCount);
    remainingCount = Math.max(0, s.length - rCount - wCount);
    const rate = Math.round(rCount / (rCount + wCount) * 100) || 0;
    this.setData({rightRate: rate}); 
        
    let res = {
      series: [
        {
          data: [{"name":"正确","value":rCount},{"name":"错误","value":wCount},{"name":"剩余","value":remainingCount}]
        }
      ]
    };
    this.drawCharts('ohQtgFeJGawEwaqrbQYZiaMxHWzTiTkZ', res);
  },
  drawCharts(id,data){
    const ctx = wx.createCanvasContext(id, this);
    uChartsInstance[id] = new uCharts({
        type: "ring",
        context: ctx,
        width: this.data.cWidth,
        height: this.data.cHeight,
        series: data.series,
        animation: true,
        rotate: false,
        rotateLock: false,
        background: "#FFFFFF",
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [5,5,5,5],
        dataLabel: true,
        enableScroll: false,
        legend: {
          show: true,
          position: "bottom",
          lineHeight: 25
        },
        title: {
          name: "正确率",
          fontSize: 15,
          color: "#666666"
        },
        subtitle: {
          name: `${this.data.rightRate}%`,
          fontSize: 15,
          color: "#7cb5ec"
        },
        extra: {
          ring: {
            ringWidth: 60,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      });
  },
  tap(e){
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  }
})