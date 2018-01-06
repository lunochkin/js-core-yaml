const typeOf = value => {
  const type = typeof value
  if (type === 'object' && Array.isArray(value)) {
    return 'array'
  }
  if (type === 'object' && value === null) {
    return 'null'
  }
  return type
}

const stringify = data => {
  let indentLevel = ''

  const handlers = {
    undefined: () => 'undefined',
    null: () => 'null',
    number: x => x,
    boolean: x => x ? 'true' : 'false',
    string: x => x,
    array: x => {
      let output = ''

      if (x.length === 0) {
        output += '[]'
        return output
      }

      indentLevel = indentLevel.replace(/$/, '  ')
      x.forEach(y => {
        const handler = handlers[typeOf(y)]

        if (!handler) {
          throw new Error('unknown type: ' + typeOf(y))
        }

        output += '\n' + indentLevel + '- ' + handler(y, true)
      })
      indentLevel = indentLevel.replace(/  /, '')
      return output
    },
    object: (x, isArrayItem = false, root = false) => {
      let output = ''

      if (Object.keys(x).length === 0) {
        output += '{}'
        return output
      }

      if (!root) {
        indentLevel = indentLevel.replace(/$/, '  ')
      }

      Object.keys(x).forEach((k, index) => {
        const val = x[k]
        const handler = handlers[typeOf(val)]

        if (typeof val === 'undefined') {
          return
        }

        if (!handler) {
          throw new Error('unknown type: ' + typeOf(val))
        }

        const disableNewLine = index === 0 && (isArrayItem || root)
        if (!disableNewLine) {
          output += '\n'
        }
        if (index > 0 || !isArrayItem) {
          output += indentLevel
        }
        const res = handler(val)
        output += k + ':'
        if (String(res).indexOf('\n') === -1) {
          output += ' '
        }
        output += res
      })
      indentLevel = indentLevel.replace(/  /, '')

      return output
    },
    function: () => '[object Function]'
  }

  return handlers[typeOf(data)](data, false, true) + '\n'
}

export default stringify
