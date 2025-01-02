import fetch from 'node-fetch';

const limit = 300;

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m,rcanal)
      .then(() => m.react('✖️'));
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m,rcanal)
      .then(() => m.react('✖️'));
  }

  let urls = m.quoted.text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/gi);
  if (!urls) return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(() => m.react('✖️'));
  if (urls.length < text) return conn.reply(m.chat, `Resultado no Encontrado.`, m).then(() => m.react('✖️'));

  let user = global.db.data.users[m.sender];
  await m.react('🕓');

  try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${urls[0]}`);
    let json = await api.json();

    if (!json.success) {
      return m.reply(`Error al obtener el video. Intenta de nuevo más tarde.`).then(() => m.react('✖️'));
    }

    let { quality, title, download_url } = json.result;

    let size = 0;

    await conn.sendMessage(m.chat,{
    video: { url: download_url },
    fileName: `${title}.mp4`,
    mimetype: "video/mp4",
    caption: `*Título:* ${title}\n*Calidad:* ${quality}`,
  },
  { quoted: m } // Mensaje citado como referencia
);

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
};

handler.help = ['Video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/;
handler.command = new RegExp;

export default handler;
