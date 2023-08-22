Component({
  properties: {
    name: String,
    hidden: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onTap(event) {
      // 点击事件
      const i = this.id;
      this.triggerEvent('tagtap', event);
    } 
  }
})