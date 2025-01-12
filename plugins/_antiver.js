let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  let media, msg, type;

  // Verificación de 'antiver' y 'isBanned'
  const { antiver, isBanned } = global.db.data.chats[m.chat];
  console.log('Antiver:', antiver, 'Baneado:', isBanned);
  if (!antiver || isBanned) return;

  // Solo ejecuta para mensajes de tipo viewOnce
  console.log('Tipo de mensaje:', m.mtype);
  if (!(m.mtype == 'viewOnceMessageV2' || m.mtype == 'viewOnceMessageV2Extension')) return;

  msg = m.mtype == 'viewOnceMessageV2' ? m.message.viewOnceMessageV2.message : m.message.viewOnceMessageV2Extension.message;
  type = Object.keys(msg)[0];
  console.log('Mensaje recibido:', msg);
  console.log('Tipo de contenido:', type);

  // Descarga el contenido dependiendo del tipo de mensaje
  try {
    if (m.mtype == 'viewOnceMessageV2') {
      media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio');
    } else {
      media = await downloadContentFromMessage(msg[type], 'audio');
    }
  } catch (err) {
    console.log('Error al descargar el contenido:', err);
    return;
  }

  // Crear el buffer de archivo descargado
  let buffer = Buffer.from([]);
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  console.log('Tamaño del buffer:', buffer.length);
  if (buffer.length === 0) {
    console.log('No se pudo descargar el archivo');
    return;
  }

  // Formatear el tamaño del archivo
  const fileSize = formatFileSize(msg[type].fileLength);

  // Descripción del mensaje
  const description = `
    ✅️ *ANTI VER UNA VEZ* ✅️\n\n💭 *No ocultes* ${type === 'imageMessage' ? '`Imagen` 📷' : type === 'videoMessage' ? '`Vídeo` 🎥' : type === 'audioMessage' ? '`Mensaje de voz` 🎤' : 'este mensaje'}\n- ✨️ *Usuario:* *@${m.sender.split('@')[0]}*
    ${msg[type].caption ? `- *Texto:* ${msg[type].caption}` : ''}`.trim();

  // Enviar el archivo dependiendo del tipo
  if (/image|video/.test(type)) {
    return await conn.sendFile(m.chat, buffer, type == 'imageMessage' ? 'error.jpg' : 'error.mp4', description, m, false, { mentions: [m.sender] });
  }

  if (/audio/.test(type)) {
    await conn.reply(m.chat, description, m, { mentions: [m.sender] });
    await conn.sendMessage(m.chat, { audio: buffer, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
  }
};

export default handler;

// Función para formatear el tamaño del archivo
function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'TY', 'EY'];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i];
}
