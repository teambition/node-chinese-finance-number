'use strict'
// const CHINESE_NUMBERS = {
const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
const IUNIT = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '万', '拾', '佰', '仟']
const DUNIT = ['元', '角', '分']
const DONE = '整'

module.exports = function (number) {
  if (!Number.isFinite(number)) throw new Error(`${number} is not a valid number`)
  let arr = Math.abs(number).toFixed(DUNIT.length - 1).split('.')
  let t = arr[0]
  let d = arr[1]
  let lastNonZeroPos = t.length
  let result = []
  for (let pos = t.length; pos > 0; pos--) {
    let n = Number(t[t.length - pos])
    if (n > 0) {
      if (lastNonZeroPos - pos > 1) result.push(NUMBER[0])
      result.push(NUMBER[n] + IUNIT[pos - 1])
    }
    if (pos > 4 && pos % 4 === 1 && n === 0 && lastNonZeroPos - pos < 4) result.push(IUNIT[pos - 1])
    if (n > 0) lastNonZeroPos = pos
  }
  if (!result.length) result.push(NUMBER[0])
  result.push(DUNIT[0])

  let floatResult = []
  lastNonZeroPos = -1
  for (let pos = d.length; pos > 0; pos--) {
    let n = Number(d[pos - 1])
    if (n > 0) {
      floatResult.unshift(NUMBER[n] + DUNIT[pos])
      if (lastNonZeroPos > 0 && lastNonZeroPos - pos > 1) floatResult.unshift(NUMBER[0])
      lastNonZeroPos = pos
    } else if (n === 0 && pos === DUNIT.length - 1) {
      floatResult.unshift(DONE)
    }
  }
  if (floatResult[0] !== DONE && t === '0') result = []
  if (result.length > 0 && lastNonZeroPos > 1) floatResult.unshift(NUMBER[0])

  result = result.concat(floatResult)
  return result.join('')
}
