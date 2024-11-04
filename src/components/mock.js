export const TREEDATA = [
  {
    id: 0,
    label: '海盐二期',
    children: [{
      id: 1,
      label: '1#配电房'
    },
    {
      id: 2,
      label: '2#配电房',

    },
    {
      id: 3,
      label: '3#配电房',

    },
    {
      id: 4,
      label: '4#配电房',

    },
    {
      id: 5,
      label: '5#配电房',

    },
    {
      id: 6,
      label: '6#配电房',

    },
    {
      id: 7,
      label: '7#配电房',

    },
    {
      id: 8,
      label: '8#配电房',

    }]
  },
]
// 修改柱子的颜色 宽度
export const ECHARTSBARWIDTH = 20
export const ECHARTSBARCOLOR = ["#f78b8b", "#f67777", "#f9a3a3"]
export const ECHARTSCOLOR = {
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: ECHARTSBARCOLOR[0],
    },
    {
      offset: 0.5,
      color: ECHARTSBARCOLOR[0],
    },
    {
      offset: 0.5,
      color:  ECHARTSBARCOLOR[1],
    },
    {
      offset: 1,
      color: ECHARTSBARCOLOR[1],
    },
  ],
}
function getRandomIntIn(min, max) {
  return (Math.random() * (max - min + 1) + min).toFixed(2);
}
export const TABLELIST =
{
  node: '海盐二期',
  id: 0,
  powerAll: getRandomIntIn(30, 100),
  powerNone: getRandomIntIn(30, 100),
  average: getRandomIntIn(0, 0.9),
  assessment: getRandomIntIn(0, 0.9),
  basic: getRandomIntIn(30, 100),
  hour: getRandomIntIn(30, 100),
  coefficient: getRandomIntIn(0, 0.9),
  power: getRandomIntIn(100, 200),
  children: []
}