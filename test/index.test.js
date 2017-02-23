'use strict'
/* global describe, it */
const assert = require('assert')
const toChineseNumber = require('../')

const testCases = {
  '1': '壹元整',
  '20': '贰拾元整',
  '300': '叁佰元整',
  '405': '肆佰零伍元整',
  '100000': '壹拾万元整',
  '101060': '壹拾万零壹仟零陆拾元整',
  '100020.04': '壹拾万零贰拾元零肆分',
  '100007.1': '壹拾万零柒元壹角整',
  '0.01': '壹分',
  '0.1': '壹角整',
  '0.98': '玖角捌分',
  '0': '零元整',
  '200000000.00': '贰亿元整'
}

describe('Chinese Financial Numberal Test', function () {
  it('String should not convert', function () {
    assert.throws(() => {
      toChineseNumber('string')
    })
  })

  for (let key in testCases) {
    let number = Number(key)
    let result = testCases[key]
    it(`${key} => ${result}`, function () {
      assert.strictEqual(toChineseNumber(number), result)
    })
  }
})
