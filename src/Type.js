const TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'defaultStyle',
  'styleAliases'
]

const YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
]

function compileStyleAliases(map) {
  let result = {}

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style
      })
    })
  }

  return result
}

function Type(tag, options) {
  options = options || {}

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new Error('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.')
    }
  })

  // TODO: Add tag format check.
  this.tag = tag
  this.kind = options['kind'] || null
  this.resolve = options['resolve'] || function () { return true }
  this.construct = options['construct'] || function (data) { return data }
  this.instanceOf = options['instanceOf'] || null
  this.predicate = options['predicate'] || null
  this.represent = options['represent'] || null
  this.defaultStyle = options['defaultStyle'] || null
  this.styleAliases = compileStyleAliases(options['styleAliases'] || null)

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new Error('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.')
  }
}


export default Type
