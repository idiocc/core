import { createElement as h } from '/node_modules/preact/dist/preact.mjs'
import { render } from '/node_modules/@idio/preact-fixture/src/index.js'
import Component from './Component.jsx'

render(h(Component), document.body)