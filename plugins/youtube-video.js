import fetch from 'node-fetch';

const limit = 300;

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m)
      .then(() => m.react('✖️'));
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m)
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

    let { quality, title, download_url } = json.result;

    let size = parseFloat(json.data.metadata.size.split('MB')[0]);

    if (size >= limit) {
      return m.reply(`El archivo pesa más de ${limit} MB, se canceló la Descarga.`).then(() => m.react('✖️'));
    }

    // Send the video
    await conn.sendMessage(m.chat, { video: { url: download_url }, fileName: `${json.data.filename}.mp4`, mimetype: "video/mp4" }, { quoted: m });
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
