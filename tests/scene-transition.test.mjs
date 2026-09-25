import test from 'node:test'
import assert from 'node:assert/strict'
import { transitionScene } from '../lib/scene-transition.ts'

const initial = () => ({ requested: 'menu', displayed: 'menu', phase: 'idle', version: 0 })
const advance = state => transitionScene(state, { type: 'advance', version: state.version })

test('changes the visible scene only once the covering phase ends', () => {
  const cover = transitionScene(initial(), { type: 'request', view: 'section' })
  assert.equal(cover.displayed, 'menu')
  assert.equal(cover.phase, 'cover')
  const reveal = advance(cover)
  assert.equal(reveal.displayed, 'section')
  assert.equal(reveal.phase, 'reveal')
  assert.equal(advance(reveal).phase, 'idle')
})

test('animation completion and fallback cannot advance the same phase twice', () => {
  const cover = transitionScene(initial(), { type: 'request', view: 'section' })
  const reveal = advance(cover)
  assert.strictEqual(transitionScene(reveal, { type: 'advance', version: cover.version }), reveal)
})

test('the latest request wins when reversing during cover', () => {
  const cover = transitionScene(initial(), { type: 'request', view: 'section' })
  const reversed = transitionScene(cover, { type: 'request', view: 'menu' })
  assert.strictEqual(transitionScene(reversed, { type: 'advance', version: cover.version }), reversed)
  assert.equal(advance(advance(reversed)).displayed, 'menu')
})

test('return from a section follows the same cover and reveal sequence', () => {
  const section = advance(advance(transitionScene(initial(), { type: 'request', view: 'section' })))
  const back = transitionScene(section, { type: 'request', view: 'menu' })
  assert.equal(back.displayed, 'section')
  const finished = advance(advance(back))
  assert.equal(finished.displayed, 'menu')
  assert.equal(finished.phase, 'idle')
})

test('repeated requests do not restart the transition', () => {
  const cover = transitionScene(initial(), { type: 'request', view: 'section' })
  assert.strictEqual(transitionScene(cover, { type: 'request', view: 'section' }), cover)
  const idle = initial()
  assert.strictEqual(advance(idle), idle)
})
