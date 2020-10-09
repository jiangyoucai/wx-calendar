# wx-calendar

a calendar for wechat mini programs

# 使用

1.复制文件

    复制plugin/components/calendar文件夹到项目中

2.引入组件

    pages/index/index.json文件里，增加
    
    {
    "usingComponents": {
    "calendar": "your path/calendar"
    }

3.使用组件

    pages/index/index.wxml文件里，增加
    
    <calendar option="{{option}}" bind:setDate="setDate" bind:setDay="setDay"/>

4.配置文件

    pages/index/index.js文件里，增加

    option: {
        mulit: false,
        mark: '今',
        disable: 'left',
        // show: 'fee',
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
    }
    
# 配置

1.多选/单选

    mulit: true // 多选
    mulit: fase // 单选

2.标记今天
  
    mark: "replace your text" // 标记

3.禁用日期

    disable: left // 禁用左侧，比今天小的日期
    disable: right // 禁用右侧，比今天大的日期

4.设置模式

    show: undifined // 日历模式
    show: total     // 库存模式
    show: fee       // 价格模式
    show: customize // 自定义模式

5.库存数据

    仅当show: total时，有效
    若无库存，不显示
    若库存为0，显示售罄
    若库存>99，显示充足

6.价格数据

    仅当show: fee时，有效
    若无价格，不显示
    若库存为0，显示售罄
    若库存>9999，显示9999+

7.自定义数据
    
    仅当show: customize时，有效
    若无数据，不显示

8.为空选中

    empty: true // 可以选中
    empty: false // 不可选中
    仅当show: customize时，有效

# 方法

1.切换年月

    setDay
    
2.选中日期

    setDate
   
# 截图

![普通日历](http://cdn.tiantour.com/screenshot/normal.png)

![库存日历](http://cdn.tiantour.com/screenshot/total.png)

![价格日历](http://cdn.tiantour.com/screenshot/fee.png)

![自定义日历](http://cdn.tiantour.com/screenshot/customize.png)