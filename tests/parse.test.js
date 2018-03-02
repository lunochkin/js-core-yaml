const {load, dump} = require('js-yaml')
const parse = require('../src/parse').default


const check = input => {
  const yaml = dump(input)
  const parseResult = parse(yaml)
  const loadResult = load(yaml)

  return expect(parseResult).toEqual(loadResult)
}

const testCheck = (title, input) => test(title, () => check(input))


testCheck('basic', {test: 'pro', second: 'asd'})

testCheck('simple array', ['one', 'two', 'three'])

testCheck('array of objects', [
  {one: 'one', second: 'sec'},
  {two: 'two', third: 'asda'}
])

testCheck('long text', {
  long: 'Okinawa is a beautiful sub-tropical island south of the main island of Japan. These are some things you can do in Okinawa:'
})

testCheck('nested', {
  key: {
    second: {
      a: 'asd'
    }
  }
})
