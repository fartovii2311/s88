/* 
- Código Creado y modificado por DarkCore
- Welcome con imagen Card
*/
import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let chat = global.db.data.chats[m.chat];
  let wel = 'ＷＥＬＣＯＭＥ － ＵＳＥＲ';
  let bye = 'L Y N X － ＵＳＥＲ';
  let web = '';
  let webb = '';
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    // Enviar mensaje de bienvenida
    await conn.sendMessage(m.chat, {
      text: bienvenida,
      mentions: [m.messageStubParameters[0] + '@s.whatsapp.net']
    }, { quoted: m });
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Adiós...`;

    // Enviar mensaje cuando alguien sale
    await conn.sendMessage(m.chat, {
      text: bye,
      mentions: [m.messageStubParameters[0] + '@s.whatsapp.net']
    }, { quoted: m });
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Se eliminó* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Adiós...`;

    // Enviar mensaje cuando alguien es eliminado
    await conn.sendMessage(m.chat, {
      text: kick,
      mentions: [m.messageStubParameters[0] + '@s.whatsapp.net']
    }, { quoted: m });
  }
}
