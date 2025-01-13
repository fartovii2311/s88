import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `Por favor, proporciona un enlace de MediaFire válido.\nEjemplo: ${usedPrefix}${command} https://www.mediafire.com/file/abcd1234/example.zip/file`,
      m
    );
  }
  let url = args[0];
  if (!url.includes('mediafire.com')) {
    return conn.reply(
      m.chat,
      `El enlace proporcionado no parece ser de MediaFire.`,
      m
    );
  }

  try {
    const { name, size, date, mime, link } = await mediafireDl(url);

    // Aviso de descarga
    await conn.reply(
      m.chat,
      `📥 *Descargando archivo...*\n\n*Nombre:* ${name}\n*Tamaño:* ${size}`,
      m
    );

    // Descargar el archivo
    const response = await axios.get(link, { responseType: 'arraybuffer' });
    const fileBuffer = response.data;

    await conn.sendMessage(
      m.chat,
      { document: fileBuffer, fileName: name, mimetype: mime },
      { quoted: m }
    );

  } catch (error) {
    console.error(error);
    return conn.reply(
      m.chat,
      `❌ Ocurrió un error al intentar procesar el enlace. Por favor, verifica que sea un enlace válido.`,
      m
    );
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
