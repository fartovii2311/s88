import fetch from 'node-fetch';

let limit = 200;

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat,'✰ Etiqueta el mensaje que contenga el resultado de YouTube Play.',m,rcanal).then(() => m.react('✖'));
  }

  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat,'✰ Etiqueta el mensaje que contenga el resultado de YouTube Play.', m,rcanal).then(() => m.react('✖'));
  }

  let urls = m.quoted.text.match(
    /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/gi
  );

  await m.react('🕓');

  try {
    let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${urls[0]}`);
    let json = await api.json();

    let { type, quality, title, thumbnail, download_url } = json.result;

    let audioBuffer = await fetch(download_url).then(res => res.buffer());

    await conn.sendFile(m.chat, audioBuffer, `${title}.mp3`, null, m,rcanal,fake, false, { mimetype: 'audio/mpeg' });

    await m.react('✅');
  } catch (err) {
    console.error(err);
  }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)/i;
handler.command = new RegExp;

export default handler;
