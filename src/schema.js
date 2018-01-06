import Type from './Type'
import intType from './types/int'
import floatType from './types/float'
import boolType from './types/bool'
import nullType from './types/null'


function compileList(schema, name, result) {
  const exclude = []

  schema.include.forEach(function (includedSchema) {
    result = compileList(includedSchema, name, result)
  })

  schema[name].forEach(function (currentType) {
    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex)
      }
    })

    result.push(currentType)
  })

  return result.filter(function (type, index) {
    return exclude.indexOf(index) === -1
  })
}

function compileMap(...args) {
  let result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {}
  }, index, length

  function collectType(type) {
    result[type.kind][type.tag] = result['fallback'][type.tag] = type
  }

  length = args.length

  for (index = 0; index < length; index += 1) {
    args[index].forEach(collectType)
  }
  return result
}

function Schema(definition) {
  this.include = definition.include || []
  this.implicit = definition.implicit || []
  this.explicit = definition.explicit || []

  this.implicit.forEach(function (type) {
    if (type.loadKind && type.loadKind !== 'scalar') {
      throw new Error('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.')
    }
  })

  this.compiledImplicit = compileList(this, 'implicit', [])
  this.compiledExplicit = compileList(this, 'explicit', [])
  this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit)
}


export default new Schema({
  explicit: [
    new Type('tag:yaml.org,2002:str', {
      kind: 'scalar',
      construct: data => data !== null ? data : ''
    }),
    new Type('tag:yaml.org,2002:seq', {
      kind: 'sequence',
      construct: data => data !== null ? data : []
    }),
    new Type('tag:yaml.org,2002:map', {
      kind: 'mapping',
      construct: data => data !== null ? data : {}
    })
  ],
  implicit: [
    nullType,
    boolType,
    intType,
    floatType
  ]
})
