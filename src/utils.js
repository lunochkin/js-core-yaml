
export function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null)
}

export function repeat(str, count) {
  let result = ''

  for (let cycle = 0; cycle < count; cycle += 1) {
    result += str
  }

  return result
}

export function isNegativeZero(num) {
  return (num === 0) && (Number.NEGATIVE_INFINITY === 1 / num)
}
