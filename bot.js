import { Telegraf } from 'telegraf'
// import { Markup } from 'telegraf'
import { message } from 'telegraf/filters'
import { create } from './notion.js'
import { Loader } from './loader.js'

const bot = new Telegraf('6196115906:AAFnrFaDxakhJNtL3kLxvZwOMyMSkROwVbo', {
    handlerTimeout: Infinity,
    polling: {
        autoStart: true
    }
})

bot.command('start', ctx => {
    ctx.reply('Hello message')
})

bot.action('notion', (ctx) => {
    return ctx.answerCbQuery('Option 2 selected!')
})

bot.on(message('text'), async ctx => {
    console.log('ctx.message is:', ctx.message)
    if (ctx.message.text) {
        // ~ допилить лоадер
        const data = ctx.message.text
        const rows = data.split('@')
        const header = rows[0]
        const body = rows[1]
        try {
            const notionResponse = await create(header, body)
            console.log(notionResponse)
            // ctx.reply(`Задача создана на ${notionResponse.url}`)
            ctx.replyWithHTML(`
            <b>Задача создана, открыть в <a href='${notionResponse.url}'>Notion</a></b>
            
            `)

        } catch (e) {
            console.log('Error while proccessing notion creation: ', e.message)
        }       
    }
})

bot.launch()

