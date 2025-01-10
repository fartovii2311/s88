// [ ❀ INSTAGRAM DL (IMAGEN/VIDEO) ]
import axios from 'axios';
import qs from 'qs';
import * as cheerio from 'cheerio';

let handler = async (m, { args, command, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat,'❀ Ingresa un link de Instagram',m,rcanal);
  }

  await m.react('🕓'); 

  try {
    let scraper = await instagramdl(args[0]);

    if (scraper.videoUrl) {
      let vid = await axios.get(scraper.videoUrl, { responseType: 'arraybuffer' });
      await conn.sendMessage(m.chat, { video: Buffer.from(vid.data),listo, });
    } else if (scraper.imageUrl) {
      let img = await axios.get(scraper.imageUrl, { responseType: 'arraybuffer' });
      await conn.sendMessage(m.chat, { image: Buffer.from(img.data), listo, });
    } else {
      return m.reply('❀ Sin resultados encontrados');
    }

    await m.react('✅');

  } catch (error) {
    console.error('Error en descarga de Instagram:', error);
    await m.react('❌');
  }
};

handler.corazones = 2;
handler.command = ['ig', 'igdl', 'instagram'];
handler.tags = ['dl'];
handler.help = ['ig *<link>*'];

export default handler;

let instagramdl = async (url) => {
  let data = qs.stringify({
    'url': url,
    'v': '3',
    'lang': 'en'
  });

  let config = {
    method: 'POST',
    url: 'https://api.downloadgram.org/media',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept-language': 'id-ID',
      'referer': 'https://downloadgram.org/',
      'origin': 'https://downloadgram.org',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'priority': 'u=0',
      'te': 'trailers'
    },
    data: data
  };

  try {
    let res = await axios.request(config);
    let $ = cheerio.load(res.data);
    let mediaInfo = {};

    if ($('video').length) {
      mediaInfo.videoUrl = $('video source').attr('src');
    } else if ($('img').length) {
      mediaInfo.imageUrl = $('img').attr('src');
    }

    for (let key in mediaInfo) {
      if (mediaInfo.hasOwnProperty(key)) {
        mediaInfo[key] = mediaInfo[key].replace(/\\\\"/g, '').replace(/\\"/g, '');
      }
    }

    return mediaInfo;
  } catch (error) {
    return { error: 'Error: ' + error.message };
  }
};
