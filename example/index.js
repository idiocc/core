const { join } = require('path')
require('alamode')()

const p = join(__dirname, '..', process.argv[2])
require(p)
