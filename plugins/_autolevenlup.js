import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

export function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    
    if (!chat.autolevelup) return !0

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

    if (before !== user.level) {
        const message = `
🌟 *¡Felicidades! Has subido de nivel* 🌟

🔥 *Nuevo Nivel:* ${user.level}
💥 *Nivel Anterior:* ${before}
🎯 *Rango Actual:* ${user.role}
🕰️ *Fecha:* ${new Date().toLocaleString('id-ID')}
        
✨ ¡Sigue así! ¡Tu esfuerzo te llevará lejos! ✨
        `.trim();

        conn.reply(m.chat, message, m);
    }
}
