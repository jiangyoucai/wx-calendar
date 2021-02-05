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
    // list, 默认周日开始，周六结束
    week: ['日', '一', '二', '三', '四', '五', '六'],
    // int, 默认月初是周几
    min: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(),
    // int, 默认月末是几号
    max: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    // map, 默认当前年, 月, 日
    current: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate()
    },
    // map, 默认选中日期，开始日期，结束日期
    select: {
      date: {
        year: 0,
        month: 0,
        date: 0
      },
      start: {
        year: 0,
        month: 0,
        date: 0
      },
      end: {
        year: 0,
        month: 0,
        date: 0
      }
    },
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
          year: this.data.year--,
          month: 12,
        })
      }
      // more than
      if (month > 12) {
        this.setData({
          year: this.data.year++,
          month: 1,
        })
      }
      this.setDay();
    },
    setDay() {
      // 计算，月初对应的星期
      const min = new Date(this.data.year, this.data.month - 1).getDay()
      // 计算，月未对应的数字
      const max = new Date(this.data.year, this.data.month, 0).getDate()
      this.setData({
        min: min,
        max: max,
      })
      this.triggerEvent('setDay', {
        year: this.data.year,
        month: this.data.month,
        min: 1,
        max: max,
      })
    },
    setDate(e) {
      const index = e.target.dataset.index
      if (this.data.option.mulit) {
        // 多选
        // 1. 首次选中
        // 设置start
        // 2. 第N次选中
        // 当选中日期<start，则start向左移动
        // 当选中日期>start，则end向右移动

        // 开始日期
        const start = new Date(this.data.start.year, this.data.start.month - 1, this.data.start.date).getTime()

        if (start < 0) {
          // 首次选中
          this.data.select.start = {
            year: this.data.year,
            month: this.data.month,
            date: index,
            format: this.data.year +
              "-" +
              this.setZero(this.data.month) +
              "-" +
              this.setZero(index),
          }
        } else {
          // 第N次选中
          // 选中日期
          const now = new Date(
            this.data.year,
            this.data.month,
            index
          ).getTime();
          // 判断大小
          if (now > start) {
            // end，向右移动
            this.data.select.end = {
              year: this.data.year,
              month: this.data.month,
              date: index,
              format: this.data.year +
                "-" +
                this.setZero(this.data.month) +
                "-" +
                this.setZero(index),
            }
          } else {
            // start，向左移动
            this.data.select.start = {
              year: this.data.year,
              month: this.data.month,
              date: index,
              format: this.data.year +
                "-" +
                this.setZero(this.data.month) +
                "-" +
                this.setZero(index),
            }
          }
        }
      } else {
        // 单选
        this.data.select.date = {
          year: this.data.year,
          month: this.data.month,
          date: index,
          format: this.data.year +
            "-" +
            this.setZero(this.data.month) +
            "-" +
            this.setZero(index),
        }
      }
      this.setData({
        select: this.data.select
      })
      this.triggerEvent('setDate', this.data.select)
    },
    setZero(index) {
      return index.toString().padStart("2", "0");
    },
  }
})