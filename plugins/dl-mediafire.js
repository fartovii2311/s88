import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Por favor, proporciona un enlace de MediaFire válido.\n\nEjemplo:\n\n> ${usedPrefix}${command} <enlace aquí>`, m,rcanal);
  }
  
  await m.react('🕓');
  
  let url = args[0];
  if (!url.includes('mediafire.com')) {
    return conn.reply(m.chat,`El enlace proporcionado no parece ser de MediaFire.`,m,rcanal);
  }

  try {
    const { name, size, date, mime, link } = await mediafireDl(url);
    
    let text = '`乂  M E D I A F I R E\n\n`'
     text += `» *Título:* ${name}\n`
     text += `» *Tamaño:* ${size}\n`
     text += `» *Nime:* ${mime}\n\n`
     text += `> ${namebot}`

    await conn.reply(m.chat,text,m,rcanal);

    const response = await axios.get(link, { responseType: 'arraybuffer' });
    const fileBuffer = response.data;

    await conn.sendMessage(
      m.chat,
      { document: fileBuffer, fileName: name, mimetype: mime },
      { quoted: m }
    );
   await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
  }
};

async function mediafireDl(url) {
  const res = await axios.get(
    `https://www-mediafire-com.translate.goog/${url.replace(
      'https://www.mediafire.com/',
      ''
    )}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`
  );
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div')
    .attr('title')
    .replaceAll(' ', '')
    .replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton')
    .text()
    .replace('Download', '')
    .replace('(', '')
    .replace(')', '')
    .replace('\n', '')
    .replace('\n', '')
    .replace('                         ', '')
    .replaceAll(' ', '');
  let mime = '';
  let rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return { name, size, date, mime, link };
}
handler.help = ['mediafire *<url>*'];
handler.tags = ['dl'];
handler.command = ['mediafire'];

export default handler;
