import { downloadContentFromMessage } from '@whiskeysockets/baileys';

let handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) {
  if (m.message?.viewOnceMessage) {
    const msg = m.message.viewOnceMessage.message;
    const type = Object.keys(msg)[0];

    if (!type || !['imageMessage', 'videoMessage'].includes(type)) {
      await conn.reply(m.chat, `🚩 *No se permite enviar contenido oculto* en este grupo, pero no pude recuperar este archivo.`, m,rcanal);
      return false;
    }

    const media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.from([]);
    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    if (type === 'imageMessage') {
      await conn.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: `🚩 *En este grupo no se permite ocultar contenido*. @${m.sender.split('@')[0]}, aquí está la imagen enviada como "ver una vez".`,
          mentions: [m.sender],
        },
        { quoted: m }
      );
    } else if (type === 'videoMessage') {
      await conn.sendMessage(
        m.chat,
        {
          video: buffer,
          caption: `🚩 *En este grupo no se permite ocultar contenido*. @${m.sender.split('@')[0]}, aquí está el video enviado como "ver una vez".`,
          mentions: [m.sender],
        },
        { quoted: m }
      );
    }

    if (isBotAdmin) {
      await conn.sendMessage(m.chat, { delete: m.key });
    } else {
      await conn.reply(
        m.chat,
        `🚩 *Mensaje detectado como "ver una vez"*. No puedo eliminarlo porque no soy administrador.`,
        m,rcanal
      );
    }

    return false;
  }

  return true;
};

export default handler;
