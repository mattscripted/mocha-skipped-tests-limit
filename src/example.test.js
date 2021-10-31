const expect = require('expect.js')

describe('example', () => {
  it('includes a passing test', () => {
    expect(true).to.equal(true)
  })

  it('includes a failing test', () => {
    expect(true).to.equal(false)
  })

  it.skip('skips a test', () => {
    expect(true).to.equal(true)
  })

  // Uncomment to trigger the limit
  // it.skip('skips another test', () => {
  //   expect(true).to.equal(true)
  // })
})
