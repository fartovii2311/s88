import axios from 'axios';
import cheerio from 'cheerio';

async function getAppInfoAndDownloadLink(apkPageUrl) {
  try {
    const response = await axios.get(apkPageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    const title = $('a.icon').attr('title');
    const imageUrl = $('a.icon img').attr('data-original');
    const downloadPagePath = $('.jump-downloading-btn').attr('href');

    if (!downloadPagePath) {
      throw new Error('No se encontró el enlace de la página de descarga.');
    }

    const downloadPageUrl = `https://apkpure.net${downloadPagePath}`;
    const downloadLink = await getFinalDownloadLink(downloadPageUrl);

    return { title, imageUrl, downloadLink };
  } catch (error) {
    console.error('Error al obtener la información:', error);
    return null;
  }
}

async function getFinalDownloadLink(downloadPageUrl) {
  try {
    const response = await axios.get(downloadPageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const downloadLink = $('a[rel="nofollow"][title]').attr('href');

    if (!downloadLink) {
      throw new Error('No se encontró el enlace final de descarga.');
    }

    return downloadLink.startsWith('http') ? downloadLink : `https://apkpure.net${downloadLink}`;
  } catch (error) {
    console.error('Error al obtener el enlace final de descarga:', error);
    return null;
  }
}

export async function getAppDetails(apkPageUrl) {
  const appInfo = await getAppInfoAndDownloadLink(apkPageUrl);

  if (appInfo) {
    return {
      title: appInfo.title,
      imageUrl: appInfo.imageUrl,
      downloadLink: appInfo.downloadLink
    };
  } else {
    return null;
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.reply(m.chat, 'Por favor, proporciona la URL del APK.', m);
    return;
  }

  try {
    const appDetails = await getAppDetails(text);
    if (!appDetails || !appDetails.downloadLink) {
      await conn.reply(m.chat, 'No se pudo obtener la información del APK. Asegúrate de que la URL sea correcta.', m);
      return;
    }

    await conn.sendMessage(m.chat, {
      document: { url: appDetails.downloadLink },
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${appDetails.title}.apk`,
      caption: `Descarga de ${appDetails.title}`
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Hubo un error al obtener o enviar el archivo. Intenta nuevamente más tarde.', m);
  }
};

handler.help = ['apk2 <url>'];
handler.tags = ['descarga'];
handler.command = ['apk2', 'apkdescarga2'];

export default handler;
