const { Composer } = require('telegraf')
const composer = new Composer()

composer.command('start', async (ctx) => {
  try {
    await ctx.msg.send(ctx.i18n.t('hello'))
  } catch (e) {
    console.error(e)
  }
})

module.exports = composer