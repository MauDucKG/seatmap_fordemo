export const LayoutDefault = (cols, rows) => {
  const top = [...Array(cols).keys()].map(number => ({
    w: 1, h: 1, x: number, y: 0, i: 'idwtop' + number.toString(), static: true
  }))
  const left = [...Array(rows).keys()].filter(number => number !== 0).map(number => ({
    w: 1, h: 1, x: 0, y: number, i: 'idhleft' + number.toString(), static: true
  }))
  const bottom = [...Array(cols).keys()].filter(number => number !== 0).map(number => ({
    w: 1, h: 1, x: number, y: Number(rows) - 1, i: 'idwbottom' + number.toString(), static: true
  }))
  const right = [...Array(rows).keys()].filter(number => number !== 0 && number !== Number(rows) - 1).map(number => ({
    w: 1, h: 1, x: Number(cols) - 1, y: number, i: 'idhright' + number.toString(), static: true
  }))
  return top.concat(left, bottom, right);
}