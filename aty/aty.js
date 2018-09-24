import aty, {
  exec, type, typeInstant, activateApp, code, keystroke, delay,
} from 'aty'

const f = `
(async () => {
  await idioCore({`

const expandProp = (prop) => {
  const t = typeof prop == 'string'
    ? type`${prop}${250}${350}`
    : select(prop)
  return `
    ${t}
    ${delay`500`}
    ${code`76`}
    ${type`: {${250}${350}`}
    ${code`76`}
    ${suggestAndWait()}
  `
}

const select = (i = 1) => {
  const s = `
  ${code`125`}
  ${delay`200`}
  `.repeat(i)
  return s
}

const suggestAndWait = (t = 1000) => `
  ${code`49${'control'}`}
  ${delay`${t}`}
`

const cancelHint = () => {
  return `
  ${delay`500`}
  ${code`53`}
  `
}

const finishProp = (t) => {
  return `
  ${type`: ${250}${350}`}
  ${type`${t}${250}${350}`}
  ${type`,${250}${350}`}
  `
}

const completeProp = (t) => {
  return `
    ${finishProp(t)}
    ${code`125`}
    ${type`,${250}${350}`}
  `
}

const doSelect = (i) => {
  return `
  ${select(i)}
  ${delay`750`}
  ${code`36`}
  `
}

run()

async function run() {
  const a = aty`
  ${activateApp`Code`}
  ${typeInstant`import idioCore from '@idio/core'
`}
  ${type`${f}${250}${350}${true}`}
  ${code`36`}
  ${cancelHint()}
  ${suggestAndWait()}
  ${expandProp('l')}
  ${doSelect()}
  ${completeProp('true')}
  ${code`76`}
  ${cancelHint()}
  ${code`49${'control'}`}
  ${delay`1000`}
  ${expandProp(2)}
  ${doSelect()}
  ${completeProp('true')}
  ${code`76`}
  ${cancelHint()}
  ${code`49${'control'}`}
  ${delay`1000`}
  ${expandProp('st')}
  ${doSelect(4)}
  ${finishProp('true')}
  ${code`76`}
  ${cancelHint()}
  ${code`49${'control'}`}
  ${delay`1000`}
  ${doSelect(3)}
  ${finishProp('\'example/files\'')}
  ${code`76`}
  ${cancelHint()}
  ${code`49${'control'}`}
  ${delay`1000`}
  ${doSelect(2)}
  ${completeProp('\'/files\'')}
  ${cancelHint()}
  ${code`125${'command'}`}
  ${type`)()${250}${350}`}
  `

  await exec(a)
}

// ${typeInstant`/* recorded with appshot */`}

// ${keystroke`${'option'}${'shift'}f`}
//   ${delay`2000`}
//   ${keystroke`${'command'}a`}
//   ${delay`1000`}
//   ${code`51`}`