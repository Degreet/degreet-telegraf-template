const User = require('../models/User')

module.exports = async function authMiddleware(ctx, next) {
  try {
    const userId = ctx.from && ctx.from.id
    if (!userId) return

    let user = await User.findOne({ userId })
    if (!user) user = new User({ userId })

    user.firstName = ctx.from.first_name
    user.lastName = ctx.from.last_name
    user.username = ctx.from.username
    user.lastPing = Date.now()

    ctx.user = user
    await user.save()

    return next()
  } catch (e) {
    console.error(e)
  }
}