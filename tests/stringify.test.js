const stringify = require('../src/stringify').default


test('1', () => {
  const o = {
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
    "hint": "think, who is the verb <b>jump</b> relating to?",
    "hints": {
      "dog": "No, that's the object"
    },
    "notes": [
      "find-the-verb"
    ],
    "cname": "cname-03902831389834458"
  }


  const result = stringify(o)

  console.log(result)

  expect(true).toBe(true)
})
