import uCharts from '../../utils/u-charts.min.js';

const app = getApp();
var uChartsInstance = {};
Page({
  data: {
    cWidth: 750,
    cHeight: 500
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
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
            series: [
              {
                data: [{"name":"正确","value":50},{"name":"错误","value":30},{"name":"剩余","value":20}]
              }
            ]
          };
      this.drawCharts('ohQtgFeJGawEwaqrbQYZiaMxHWzTiTkZ', res);
    }, 500);
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
          name: "70%",
          fontSize: 20,
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