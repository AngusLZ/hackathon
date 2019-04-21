export const optionZhexian = {
  xAxis: {
    type: 'category',
    data: ['大一上', '大一下','大二上','大二下'],
    axisLabel:{interval: 0}
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [91, 50, 69, 77],
    type: 'line'
  }],
  grid:{
    left:35
  }
}
