import idioCore from '@idio/core'

(async () => {
  await idioCore({
    static: {
      use: true,

    },
    logger: {
      use: true,
    },
    compress: {
      use: true,
    },
  })
})()