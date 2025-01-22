 // *[ ❀ FACEBOOK DL ]*
import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `🔔 Envíame el enlace del video de Facebook para descargarlo.`,
      m,rcanal
    );
  }

  let res;
  try {
    await m.react('🚀');
    res = await igdl(args[0]); 
  } catch (e) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ El enlace no es válido o no pertenece a Facebook. Por favor verifica.`,
      m
    );
  }

  // Verificar si se obtuvieron datos
  let result = res.data;
  if (!result || result.length === 0) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ No se encontraron videos en el enlace proporcionado.`,
      m
    );
  }

  let data;
  try {
    data =
      result.find((i) => i.resolution === '720p (HD)') ||
      result.find((i) => i.resolution === '360p (SD)');
  } catch (e) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ No se pudieron procesar los datos del video.`,
      m
    );
  }

  if (!data) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ No se encontró un video descargable en el enlace.`,
      m
    );
  }

  let video = data.url;
  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption: `🚀 tu video de Facebook.\n> ⏤͟͟͞͞𝐋𝐲𝐧𝐱-𝐀𝐈ꗄ➺`,
        fileName: 'facebook_video.mp4',
        mimetype: 'video/mp4',
      },
      { quoted: m }
    );
    await m.react('✅');
  } catch (e) {
    await m.react('❌');
    return conn.reply(
      m.chat,
      `❗ Ocurrió un error al descargar o enviar el video.`,
      m
    );
  }
};

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook','fb']
handler.Monedas = 1
handler.register = true
export default handler;
