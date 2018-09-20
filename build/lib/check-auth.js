module.exports=() => async (ctx, next) => {
  if (ctx.session && ctx.session.user) {
    return await next()
  }
  throw new Error('User not authorized')
}

//# sourceMappingURL=check-auth.js.map