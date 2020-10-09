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
        '2020-9-27': 99,
        '2020-9-28': 9,
        '2020-9-29': 1024,
        '2020-9-30': 0,
        '2020-10-27': 99,
        '2020-10-28': 9,
        '2020-10-29': 1024,
        '2020-10-7': 0,
        '2020-10-8': 9,
        '2020-10-9': 10204,
      },
      fee: {
        '2020-9-27': 99,
        '2020-9-28': 9,
        '2020-9-29': 1024,
        '2020-9-30': 0,
        '2020-10-27': 99,
        '2020-10-28': 9,
        '2020-10-29': 10204,
        '2020-10-7': 0,
        '2020-10-8': 9,
        '2020-10-9': 1024,
      },
      customize: {
        '2020-9-27': '休',
        '2020-9-28': '班',
        '2020-9-29': '休',
        '2020-10-7': '休',
        '2020-10-8': '初八',
        '2020-10-9': '初九',
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