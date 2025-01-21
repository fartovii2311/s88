import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender]; 

  if (!m.quoted) {
    return conn.reply(m.chat, `⚠️ Debes etiquetar el mensaje que contenga el resultado de YouTube Play.`, m, rcanal);
  }

  if (!m.quoted.text.includes("🎬 *‌乂 Y O U T U B E  -  P L A Y 乂* 🎬")) {
    return conn.reply(m.chat, `⚠️ El mensaje etiquetado no contiene un resultado de YouTube Play.`, m, rcanal);
  }

  const urls = m.quoted.text.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/gi);

  if (!urls || urls.length < 1) {
    return conn.reply(m.chat, `⚠️ No se encontraron enlaces válidos en el mensaje etiquetado.`, m, rcanal);
  }

  await m.react('🕓'); 

  const videoUrl = urls[0];
  const apiUrl = `https://api.siputzx.my.id/api/dl/youtube/mp3?url=${videoUrl}`;

  let downloadUrl = null;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === true) {
      downloadUrl = data.data;  // Ahora usamos la URL proporcionada en `data`

      if (downloadUrl) {
        const fileResponse = await fetch(downloadUrl);
        
        // Verificar si la respuesta es correcta antes de procesarla
        if (fileResponse.ok) {
          const buffer = await fileResponse.buffer();
          
          // Enviar solo el audio
          await conn.sendMessage(
            m.chat,
            {
              audio: buffer,
              mimetype: 'audio/mp4',  // Usamos 'audio/mp4' por compatibilidad con los archivos de YouTube
              ptt: true,  // Para enviar como mensaje de voz
            },
            { quoted: m }
          );

          await m.react('✅');
        } else {
          console.log("Error en la descarga del archivo.");
          await m.react('✖️');
        }
      }
    }
  } catch (error) {
    console.log(error);
    await m.react('✖️');
  }
};

handler.help = ['Audio'];
handler.tags = ['dl'];
handler.customPrefix = /^(AUDIO|audio|Audio)$/i;
handler.command = new RegExp;

export default handler;
