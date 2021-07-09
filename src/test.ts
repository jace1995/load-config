import { assert } from 'chai'
import {
  loadConfigRequired,
  loadPropertyRequired,
  loadConfigOptional,
  loadPropertyOptional,
} from '.'

describe('config', () => {
  describe('load .env file', () => {
    it('default .env path', () => {
      const config = loadConfigRequired(['TEST'] as const)
      assert.equal(config.TEST, '1')
    })
    it('custom .env path', () => {
      const config = loadConfigRequired(['TEST'] as const, 'test.env')
      assert.equal(config.TEST, '2')
    })
  })

  describe('required config', () => {
    it('exists', () => {
      const config = loadConfigRequired(['P1', 'P2'] as const)
      assert.equal(config.P1, 'test property 1')
      assert.equal(config.P2, 'test property 2')
    })
    it('not exists', () => {
      assert.throws(() => loadConfigRequired(['P2', 'P3'] as const))
    })
  })

  describe('required property', () => {
    it('exists', () => {
      assert.equal(
        loadPropertyRequired('P1'),
        'test property 1'
      )
    })
    it('not exists', () => {
      assert.throws(() => loadPropertyRequired('P3'))
    })
  })

  describe('optional config', () => {
    it('exists', () => {
      const config = loadConfigOptional(['P2', 'P3'] as const)
      assert.equal(config.P2, 'test property 2')
    })
    it('not exists', () => {
      const config = loadConfigOptional(['P2', 'P3'] as const)
      assert.equal(config.P3, undefined)
    })
  })

  describe('optional property', () => {
    it('exists', () => {
      assert.equal(
        loadPropertyOptional('P2'),
        'test property 2'
      )
    })
    it('not exists', () => {
      assert.equal(
        loadPropertyOptional('P3'),
        undefined
      )
    })
  })
})
