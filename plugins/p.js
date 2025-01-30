import axios from 'axios';
import cheerio from 'cheerio';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
  'Referer': 'https://apkpure.net/',
  'Accept-Language': 'es-ES,es;q=0.9',
  'Connection': 'keep-alive',
};

async function getAppInfoAndDownloadLink(apkPageUrl) {
  try {
    console.log(`🔍 Obteniendo información de: ${apkPageUrl}`);

    const response = await axios.get(apkPageUrl, { headers });

    if (response.status !== 200) {
      throw new Error(`❌ Error HTTP: ${response.status}`);
    }

    const $ = cheerio.load(response.data);

    const title = $('a.icon').attr('title') || 'Título no encontrado';
    const imageUrl = $('a.icon img').attr('data-original') || 'Imagen no encontrada';
    const downloadPagePath = $('.jump-downloading-btn').attr('href');

    if (!downloadPagePath) {
      throw new Error('⚠️ No se encontró el enlace de la página de descarga.');
    }

    const downloadPageUrl = `https://apkpure.net${downloadPagePath}`;
    const downloadLink = await getFinalDownloadLink(downloadPageUrl);

    return { title, imageUrl, downloadLink };
  } catch (error) {
    console.error('❌ Error al obtener la información:', error.message);
    return null;
  }
}

async function getFinalDownloadLink(downloadPageUrl) {
  try {
    console.log(`🔍 Obteniendo enlace de descarga de: ${downloadPageUrl}`);

    const response = await axios.get(downloadPageUrl, { headers });

    if (response.status !== 200) {
      throw new Error(`❌ Error HTTP: ${response.status}`);
    }

    const $ = cheerio.load(response.data);
    const downloadLink = $('a[rel="nofollow"][title]').attr('href');

    if (!downloadLink) {
      throw new Error('⚠️ No se encontró el enlace final de descarga.');
    }

    return downloadLink.startsWith('http') ? downloadLink : `https://apkpure.net${downloadLink}`;
  } catch (error) {
    console.error('❌ Error al obtener el enlace final de descarga:', error.message);
    return null;
  }
}

async function getAppDetails(apkPageUrl) {
  const appInfo = await getAppInfoAndDownloadLink(apkPageUrl);

  if (appInfo) {
    console.log('✅ Información obtenida correctamente:', appInfo);
    return appInfo;
  } else {
    console.error('❌ No se pudo obtener la información del APK.');
    return null;
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) {
    return await conn.reply(m.chat, '❌ Debes proporcionar una URL de APKPure.\nEjemplo: *!apk2 <url>*', m);
  }

  const appDetails = await getAppDetails(text);

  if (!appDetails || !appDetails.downloadLink) {
    return await conn.reply(m.chat, '❌ No se pudo obtener la información o el enlace de descarga.', m);
  }

  const { title, imageUrl, downloadLink } = appDetails;

  try {
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `✅ *${title}*\n\n🔗 [Descargar APK](${downloadLink})`,
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '❌ Hubo un error al enviar la información.', m);
  }
};

handler.help = ['apk2 <url>'];
handler.tags = ['descarga'];
handler.command = ['apk2', 'apkdescarga2'];

export default handler;
