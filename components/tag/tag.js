Component({
  properties: {
    value: String,
    hidden: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onTap() {
      // 点击事件
      this.triggerEvent('tagtap');
      this.setData({hidden: true})
    } 
  }
})