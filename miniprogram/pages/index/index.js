var plugin = requirePlugin("hello-plugin");
Page({
  data: {
    items: [],
    currentItem: 0,
    option: {
      mulit: false,
      mark: '今',
      disable: 'left',
      show: undefined,
      empty: false,
      total: {
        '2021-01-27': 99,
        '2021-01-28': 9,
        '2021-01-29': 1024,
        '2021-01-30': 0,
        '2021-02-27': 99,
        '2021-02-28': 9,
        '2021-12-29': 1024,
        '2021-02-07': 3,
        '2021-02-08': 9,
        '2021-02-09': 1020,
      },
      fee: {
        '2021-01-27': 99,
        '2021-01-28': 9,
        '2021-01-29': 1024,
        '2021-01-30': 0,
        '2021-02-27': 99,
        '2021-02-28': 102400,
        '2021-12-29': 1024,
        '2021-02-07': 3,
        '2021-02-08': 9,
        '2021-02-09': 1024,
      },
      customize: {
        '2021-02-03': '休',
        '2021-02-28': '班',
        '2021-03-29': '休',
        '2021-02-07': '休',
        '2021-10-08': '初八',
        '2021-10-09': '初九',
      }
    }
  },
  onLoad: function () {
    plugin.sayHello();
    var world = plugin.answer;
    console.log(world);
  },
  setDate: function (e) {
    console.log(1, e)
  },
  setDay: function (e) {
    console.log(2, e)
  }
});