*/ import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

export async function before(m, { conn }) {
  if (!global.db || !global.db.data) return true;
  if (!global.db.data.users || !global.db.data.chats) return true;

  const user = global.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];

  if (!chat.autolevelup) return true;

  const before = user.level || 0;

  while (canLevelUp(user.level, user.exp, global.multiplier)) {
    user.level++;
  }

  if (before !== user.level) {
    const fechaActual = new Date().toLocaleString('id-ID');
    const mensaje = `
🤍 *SUBISTE DE NIVEL* 🤍

☁️ *Nuevo Nivel:* ${user.level}
☁️ *Nivel Anterior:* ${before}
☁️ *Rango:* ${user.role || 'Sin rango'}
☁️ *Fecha:* ${fechaActual}`.trim();

    try {
      await conn.reply(m.chat, mensaje, m);
    } catch (err) {
      console.error('Error enviando mensaje de nivel:', err);
    }
  }
}
