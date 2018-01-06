const {dump} = require('js-yaml')
const stringify = require('../src/stringify').default


const check = input => {
  const stringifyResult = stringify(input)
  const dumpResult = dump(input)
  return expect(stringifyResult).toBe(dumpResult)
}

const testCheck = (title, input) => test(title, () => check(input))


testCheck('basic', {
  "id": 1
})

testCheck('nested objects', {
  "hints": {
    "dog": "no thats the object"
  }
})

testCheck('array', {
  "tags": [
    "subject",
    "levcheck",
    "pos"
  ]
})

testCheck('several props', {
  "prop1": "value1",
  "prop2": "value2"
})

testCheck('complex array', {
  nodes: [
    {tpl: 'chat-msg', text: 'one'},
    {tpl: 'chat-msg', text: 'two'}
  ]
})

testCheck('complex', {
  "_id": "5a02a1e8e60ebe77135cc1c4",
  "prompt": "Find the subject",
  "text": "The fox jumped over the dog",
  "matches": [
    "fox"
  ],
  "tags": [
    "subject",
    "levcheck",
    "pos"
  ],
  "points": 1,
  "hint": "think who is the verb <b>jump</b> relating to?",
  "hints": {
    "dog": "No thats the object"
  },
  "notes": [
    "find-the-verb"
  ],
  "cname": "cname-03902831389834458"
})
