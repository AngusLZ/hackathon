export const optionLeida = {
  tooltip: {},
  legend: {},
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: '#4da1ff',
        backgroundColor: 'white',
        borderRadius: 1,
        padding: [-20, -20]
      }
    },
    indicator: [
      { name: '计算机学科导论', max: 100},
      { name: '认知实习', max: 100},
      { name: '高等数学B(上)', max: 100},
      { name: '高级语言程序设计', max: 100},
      { name: '高级语言程序设计实践', max: 100},
      { name: '线性代数', max: 100}
      ]
  },
  series: [{
    name: '成绩',
    type: 'radar',
    radius:'80%',
    // areaStyle: {normal: {}},
    data : [
      {
        value : [43, 10, 28, 35, 50, 99],
      }

    ]
  }]
};
