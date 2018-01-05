import Type from './Type'


function resolveYamlBoolean(data) {
  if (data === null) {
    return false
  }

  const max = data.length

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
    (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'))
}


function constructYamlBoolean(data) {
  return data === 'true' ||
    data === 'True' ||
    data === 'TRUE'
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]'
}

export default new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false' },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE' },
    camelcase: function (object) { return object ? 'True' : 'False' }
  },
  defaultStyle: 'lowercase'
})
