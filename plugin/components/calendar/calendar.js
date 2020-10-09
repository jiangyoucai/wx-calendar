// plugin/components/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option: {
      type: Object,
      value: {
        // bool, 默认undefined，可选true, false
        mulit: undefined,
        // str, 默认undefined, 可选汉字/英文
        mark: undefined,
        // str, 默认undefined，可选left, right
        disable: undefined,
        // str, 默认undefined, 可选total, fee, customize
        show: undefined,
        // bool, 默认undefined，可选true, false
        empty: false,
        // object, 默认undefined
        total: undefined,
        // object, 默认undefined
        fee: undefined,
        // object, 默认undefined
        customize: undefined
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // map, 默认year, month
    left: {
      year: "<<",
      month: "<",
    },
     // map, 默认year, month
    right: {
      year: ">>",
      month: ">"
    },
    // int, 默认当前年
    year: new Date().getFullYear(),
    // int, 默认当前月
    month: new Date().getMonth() + 1,
    // int, 默认当前日
    date: new Date().getDate(),
    // list, 默认周日开始，周六结束
    week: ['日', '一', '二', '三', '四', '五', '六'],
    // int, 默认月初是周几
    min: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(),
    // init, 默认月末是几号
    max: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    // map, 默认当前年, 月, 日
    current: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate()
    },
    // map, 默认选中日期，开始日期，结束日期
    select: {
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      start: '',
      end: '',
    },
    // map, 默认开始日期年, 月, 日
    start: {
      year: 0,
      month: 0,
      date: 0
    },
    // map, 默认开始日期年, 月, 日
    end: {
      year: 0,
      month: 0,
      date: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setYear(e) {
      const index = e.target.dataset.index
      const year = this.data.year + parseInt(index)
      this.setData({
        year: year
      })
      this.setDay();
    },
    setMonth(e) {
      const index = e.target.dataset.index
      const month = this.data.month + parseInt(index)
      this.setData({
        month: month
      })
      // less than
      if (month < 1) {
        this.setData({
          year: this.data.year - 1,
          month: 12,
        })
      }
      // more than
      if (month > 12) {
        this.setData({
          year: this.data.year + 1,
          month: 1,
        })
      }
      this.setDay();
    },
    setDate(e) {
      const index = e.target.dataset.index
      switch (this.data.option.mulit) {
        case false:
          // 单选
          this.setData({
            select: {
              date: this.data.year + '-' + this.data.month + '-' + index,
            }
          })
          console.log(this.data.select)
          break;
        case true:
          // 多选
          if (this.data.start.date !== 0) {
            // start.date !== 0
            if (this.data.end.date !== 0) {
              // end.date !== 0
              const select = new Date(this.data.year, this.data.month - 1, index).getTime()
              const end = new Date(this.data.end.year, this.data.end.month - 1, this.data.end.date).getTime()
              if (select >= end) {
                // 选择日期 >= 结束日期
                // 设置，结束日期后移
                this.setData({
                  end: {
                    year: this.data.year,
                    month: this.data.month,
                    date: index,
                  },
                })
              } else {
                // 选择日期 < 结束日期
                // 设置，开始日期前移
                this.setData({
                  start: {
                    year: this.data.year,
                    month: this.data.month,
                    date: index,
                  }
                })
              }
            } else {
              // end.date === 0
              const select = new Date(this.data.year, this.data.month - 1, index).getTime()
              const start = new Date(this.data.start.year, this.data.start.month - 1, this.data.start.date).getTime()
              if (select >= start) {
                // 选择日期 >= 开始日期
                // 设置，结束日期
                this.setData({
                  end: {
                    year: this.data.year,
                    month: this.data.month,
                    date: index,
                  },
                })
              } else {
                // 选择日期 < 开始日期
                // 设置，结束日期
                // 替换，开始日期
                this.setData({
                  end: this.data.start,
                  start: {
                    year: this.data.year,
                    month: this.data.month,
                    date: index,
                  },
                })
              }
            }
          } else {
            // start date === 0
            this.setData({
              start: {
                year: this.data.year,
                month: this.data.month,
                date: index,
              },
            })
          }
          this.setData({
            select: {
              start: this.data.start.year + '-' + this.data.start.month + '-' + this.data.start.date,
              end: this.data.end.year + '-' + this.data.end.month + '-' + this.data.end.date
            }
          })
          console.log(this.data.select)
          break;
      }
      this.triggerEvent('setDate', this.data.select)
    },
    setDay() {
      // 计算，月初对应的星期
      const min = new Date(this.data.year, this.data.month - 1).getDay()
      // 计算，月未对应的数字
      const max = new Date(this.data.year, this.data.month, 0).getDate()
      this.setData({
        min: min,
        max: max,
        date: ''
      })
      this.triggerEvent('setDay', {
        year: this.data.year,
        month: this.data.month,
        min: 1,
        max: max,
      })
    },
  }
})