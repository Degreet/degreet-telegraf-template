const authMiddleware = require('./middleware/auth.middleware')
const db = require('./core/db')

const { Telegraf, Stage, session } = require('telegraf')
const TelegrafI18n = require('telegraf-i18n')
const sender = require('telegraf-sender')
const config = require('config')
const path = require('path')

const token = config.get('botToken')
const bot = new Telegraf(token)

void (async () => {
  // connect db (mongoose)
  const mongoUri = config.get('mongoUri')
  await db.connect(mongoUri)

  // init scenes
  const stage = new Stage([])

  // setup i18n (multi-lang)
  const i18n = new TelegrafI18n({
    defaultLanguage: 'ru',
    allowMissing: false,
    directory: path.resolve(__dirname, 'locales'),
  })

  // setup middlewares
  bot.use(sender)
  bot.use(session())
  bot.use(i18n.middleware())
  bot.use(authMiddleware)

  // setup scenes
  bot.use(stage.middleware())

  // setup composers (routes)
  bot.use(
    require('./composers/start.composer'),
    require('./composers/admin.composer'),
  )

  // catch bot errors
  bot.catch((err) => {
    console.error('bot error', err)
  })

  // start bot with log
  bot.launch().then(() => {
    console.log(`started on @${bot.options.username}`)
  })
})()