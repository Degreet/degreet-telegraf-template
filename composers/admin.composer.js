const User = require('../models/User')

const { Composer } = require('telegraf')
const composer = new Composer()

// validate for admin
composer.use((ctx, next) => ctx.user && ctx.user.admin && next())

composer.command('stats', async (ctx) => {
  try {
    const users = await User.countDocuments()
    await ctx.msg.send(ctx.i18n.t('stats', { users }))
  } catch (e) {
    console.error(e)
  }
})

module.exports = composer